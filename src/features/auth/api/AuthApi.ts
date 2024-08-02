import type { User } from '@/features/user/interfaces/User'
import axios from 'axios'
import type { RegistrationUser } from '../interfaces/RegistrationUser'

function getBaseUrl() {
  return `/authentication`
}

export const AuthApi = {
  login: async function (email: string, password: string) {
    try {
      const response = await axios.post(getBaseUrl() + `/login`, {
        email,
        password,
      })

      return {
        email: email,
        accessToken: response.data.token,
      } as User
    } catch (error) {}
  },

  logout: async function () {
    try {
      await axios.get(getBaseUrl() + `/logout`, {})
    } catch (error) {}
  },

  register: async function (user: RegistrationUser) {
    try {
      const response = await axios.post(getBaseUrl() + `/register`, { ...user })

      return response.data.data
    } catch (error) {}
  },

  forgotPassword: async function (email: string) {
    try {
      await axios.post(getBaseUrl() + `/forgot-password`, { email: email })
    } catch (error) {}
  },

  resetPassword: async function (args: {
    token: string
    email: string
    password: string
    password_confirmation: string
  }) {
    const { token, email, password, password_confirmation } = args

    try {
      await axios.post(getBaseUrl() + `/reset-password`, {
        token,
        email,
        password,
        password_confirmation,
      })
    } catch (error) {}
  },
}
