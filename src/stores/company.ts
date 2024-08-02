
import { userApi } from "@/views/company/api/companyApi";
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
      const response = await userApi.getMe();
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

      const updatedUser = await userApi.updateUser(user);

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

      const updatedUser = await userApi.updatePhone(
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
      await userApi.sendEmailVerificationToken(id);
    },
    async checkEmailVerificationToken(token: string, id?: string) {
      const user = await userApi.checkEmailVerificationToken(token, id);
      this.assignMe(user);
    },
    async sendPhoneVerificationToken(id?: string) {
      await userApi.sendPhoneVerificationToken(id);
    },
    async checkPhoneVerificationToken(token: string, id?: string) {
      const user = await userApi.checkPhoneVerificationToken(token, id);
      this.assignMe(user);
    },
  },
});
function deepClone(user: User): User {
  throw new Error("Function not implemented.");
}

function extend(arg0: any, user: User): { email?: string; accessToken: string; name?: string; first_name?: string; last_name?: string; username?: string; country_code: string; locale: string; phone_number?: string; phone_number_prefix?: string; phone_verified_at?: Date; phone_verification_sent_at?: Date; email_verified_at: Date; } {
  throw new Error("Function not implemented.");
}

function removeNullProperties(user: User) {
  throw new Error("Function not implemented.");
}

function removeUnmodifiedProperties(arg0: { newObject: User; oldObject: { email?: string; accessToken: string; name?: string; first_name?: string; last_name?: string; username?: string; country_code: string; locale: string; phone_number?: string; phone_number_prefix?: string; phone_verified_at?: Date; phone_verification_sent_at?: Date; email_verified_at: Date; }; }) {
  throw new Error("Function not implemented.");
}

function updateObject(me: { email?: string; accessToken: string; name?: string; first_name?: string; last_name?: string; username?: string; country_code: string; locale: string; phone_number?: string; phone_number_prefix?: string; phone_verified_at?: Date; phone_verification_sent_at?: Date; email_verified_at: Date; }, updatedUser: any) {
  throw new Error("Function not implemented.");
}

