export interface UserForm {
  name: string
  email: string
  age: number | null
}

export interface User {
  id?: string
  name: string
  email: string
  age?: number
  accessToken?: string
}
