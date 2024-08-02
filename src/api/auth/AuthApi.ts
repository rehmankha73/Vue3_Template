import type { RegistrationUser } from "@/interfaces/auth/RegistrationUser";
import type { User } from "@/views/company/types";
import axios from "axios";

function getBaseUrl() {
  return `/authentication`;
}

export const AuthApi = {
  login: async function (email: string, password: string) {
    try {
      const response = await axios.post(
        getBaseUrl() + `/login`,
        { email, password },
        // { headers: localeHeader() }
      );

      return {
        email: email,
        accessToken: response.data.token,
      } as User;
    } catch (error) {
      // handleApiError(error);
    }
  },

  logout: async function () {
    try {
      await axios.get(getBaseUrl() + `/logout`, {
        // headers: authHeader(),
      });
    } catch (error) {
      // handleApiError(error);
    }
  },

  register: async function (user: RegistrationUser) {
    try {
      const response = await axios.post(
        getBaseUrl() + `/register`,
        { ...user },
        // { headers: localeHeader() }
      );

      return response.data.data;
    } catch (error) {
      // handleApiError(error);
    }
  },

  forgotPassword: async function (email: string) {
    try {
      await axios.post(
        getBaseUrl() + `/forgot-password`,
        { email: email },
        // { headers: localeHeader() }
      );
    } catch (error) {
      // handleApiError(error);
    }
  },

  resetPassword: async function (args: {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) {
    const { token, email, password, password_confirmation } = args;

    try {
      await axios.post(
        getBaseUrl() + `/reset-password`,
        {
          token,
          email,
          password,
          password_confirmation,
        },
        // { headers: localeHeader() }
      );
    } catch (error) {
      // handleApiError(error);
    }
  },
};
