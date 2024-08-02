
import type { User } from "@/views/company/types";
import { defineStore } from "pinia";

export const useCompanyStore = defineStore("companies", {
  state: () => ({
    isLoaded: false,
    me: {} as User,
  }),
  getters: {
    isAuthenticated: (state) => {
      return (): boolean => {
        return state.me.name != undefined;
      };
    },
    hasAccess: (state) => {
      return (shortKey: string): boolean => {

        return true;
      };
    },
  },
  actions: {
    async getMe() {
      const response = await UserApi.getMe();
      this.assignMe(response);
    },
    async assignMe(user: User) {
      console.log("User:", user);
      this.$patch(() => {
        this.me = extend(
          JSON.parse(localStorage.getItem("user") as string),
          user
        );

        if (user.phone_verified_at) {
          this.me.phone_verified_at = new Date(user.phone_verified_at);
        }
        if (user.phone_verification_sent_at) {
          this.me.phone_verification_sent_at = new Date(
            user.phone_verification_sent_at
          );
        }
        if (user.email_verified_at) {
          this.me.email_verified_at = new Date(user.email_verified_at);
        }

        this.isLoaded = true;
      });
    },
    async getActiveOrganization(): Promise<Organization | undefined> {
      if (Object.keys(this.activeOrganization).length !== 0) {
        return this.activeOrganization;
      }

      // If there is no active organization yet then figure out which to use.
      const organizationsStore = useOrganizationsStore();

      // Priority: Query Parameter > Local Storage > First organization in store.
      const router = useRouter();
      if (router && router.currentRoute.value.params["organization"]) {
        const id = router.currentRoute.value.params["organization"] as string;
        try {
          this.activeOrganization = (await organizationsStore.getById(id))
            .value as Organization;
        } catch (error) {
          // Organization no longer available. Ignore error.
        }
      }

      const savedOrganizationId = JSON.parse(
        localStorage.getItem("activeOrganization") as string
      );
      if (isEmpty(this.activeOrganization) && savedOrganizationId) {
        try {
          this.activeOrganization = (
            await organizationsStore.getById(savedOrganizationId)
          ).value as Organization;
        } catch (error) {
          // Organization no longer available. Ignore error.
        }
      }

      if (isEmpty(this.activeOrganization) && !organizationsStore.allLoaded) {
        const organizations = await organizationsStore.getAll();
        if (organizations.value.length != 0) {
          this.activeOrganization = organizations.value[0];
        }
      }

      // Make sure the latest active organization is saved to local storage.
      if (
        !isEmpty(this.activeOrganization) &&
        savedOrganizationId != this.activeOrganization.id
      ) {
        localStorage.setItem(
          "activeOrganization",
          JSON.stringify(this.activeOrganization.id)
        );
      }

      if (isEmpty(this.activeOrganization)) {
        return undefined;
      }

      const frontend = useFrontendStore();
      frontend.setTitleOrganization(this.activeOrganization.name);

      return this.activeOrganization;
    },
    async setActiveOrganization(organizationId: string) {
      const organizationsStore = useOrganizationsStore();
      const organization = (await organizationsStore.getById(organizationId))
        .value;

      if (organization && this.activeOrganization != organization) {
        this.activeOrganization = organization;
        localStorage.setItem(
          "activeOrganization",
          JSON.stringify(this.activeOrganization.id)
        );
      }

      const frontend = useFrontendStore();
      frontend.setTitleOrganization(this.activeOrganization.name);

      return this.activeOrganization;
    },
    async updateProfile(user: User) {
      user = deepClone(user);
      delete user.phone_number;
      delete user.phone_number_prefix;

      removeNullProperties(user);
      removeUnmodifiedProperties({
        newObject: user,
        oldObject: this.me,
      });

      if (Object.keys(user).length == 1) {
        return this.me;
      }

      const updatedUser = await UserApi.updateUser(user);

      if (updatedUser) {
        this.$patch(() => {
          updateObject(this.me, updatedUser);
        });
      }

      return this.me;
    },
    async updatePhone(phone_number: string, phone_number_prefix: string) {
      if (
        phone_number == this.me.phone_number &&
        phone_number_prefix == this.me.phone_number_prefix
      ) {
        return this.me;
      }

      const updatedUser = await UserApi.updatePhone(
        phone_number,
        phone_number_prefix
      );

      if (updatedUser) {
        this.$patch(() => {
          updateObject(this.me, updatedUser);
        });
      }

      return this.me;
    },
    async sendEmailVerificationToken(id?: string) {
      await UserApi.sendEmailVerificationToken(id);
    },
    async checkEmailVerificationToken(token: string, id?: string) {
      const user = await UserApi.checkEmailVerificationToken(token, id);
      this.assignMe(user);
    },
    async sendPhoneVerificationToken(id?: string) {
      await UserApi.sendPhoneVerificationToken(id);
    },
    async checkPhoneVerificationToken(token: string, id?: string) {
      const user = await UserApi.checkPhoneVerificationToken(token, id);
      this.assignMe(user);
    },
  },
});
