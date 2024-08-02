import type { User } from '@/interfaces/User'
import axios from 'axios'

function getBaseUrl(id?: string) {
  return `/users/${id ? id : 'me'}`
}

export const userApi = {
  getMe: async function () {
    try {
      const response = await axios.get(getBaseUrl(), {
        // headers: '',
      })

      return response.data.data
    } catch (error) {}
  },

  updateUser: async function (user: User) {
    try {
      const response = await axios.put(
        getBaseUrl(),
        { ...user },
        {
          // headers: '',
        }
      )

      return response.data.data as User
    } catch (error) {}
  },

  updatePhone: async function (
    phone_number: string,
    phone_number_prefix: string
  ) {
    try {
      const response = await axios.put(
        `${getBaseUrl()}/phone`,
        {
          phone_number: phone_number,
          phone_number_prefix: phone_number_prefix,
        },
        {
          // headers: '',
        }
      )

      return response.data.data as User
    } catch (error) {}
  },

  sendEmailVerificationToken: async function (id?: string) {
    try {
      await axios.get(`${getBaseUrl(id)}/email/verification-token`, {
        // headers: '',
      })
    } catch (error) {}
  },

  checkEmailVerificationToken: async function (token: string, id?: string) {
    try {
      const response = await axios.post(
        `${getBaseUrl(id)}/email/confirm-verification-token`,
        { token: token },
        {
          // headers: '',
        }
      )

      return response.data.data
    } catch (error) {}
  },

  sendPhoneVerificationToken: async function (id?: string) {
    try {
      await axios.get(`${getBaseUrl(id)}/phone/verification-token`, {
        // headers: '',
      })
    } catch (error) {
      handleApiError(error)
    }
  },

  checkPhoneVerificationToken: async function (token: string, id?: string) {
    try {
      const response = await axios.post(
        `${getBaseUrl(id)}/phone/confirm-verification-token`,
        { token: token },
        {
          // headers: '',
        }
      )

      return response.data.data
    } catch (error) {}
  },
}
