export interface RegistrationUser {
  invitation_code: string;
  first_name: string;
  last_name: string;
  name: string;
  username: string;
  email: string;
  phone_number: number;
  phone_number_prefix: string;
  password: string;
  password_confirmation: string;
}
