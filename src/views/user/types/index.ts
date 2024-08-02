export type User = {
  email?: string
  accessToken: string
  name?: string
  first_name?: string
  last_name?: string
  username?: string
  country_code: string
  locale: string
  phone_number?: string
  phone_number_prefix?: string
  phone_verified_at?: Date
  phone_verification_sent_at?: Date
  email_verified_at: Date
}
