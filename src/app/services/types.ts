export interface User {
  fullName: string
  email: string
  passwordHash: string
  avatarUrl?: string
}

export interface Teammate {
  _id?: string
  name: string
  age: string
  address: string
  position: string
  viewsCount?: number
  imageUser?: string
  user?: User | null
}

export type Team = Teammate[]

export type RegisteredUser = {
  _id: string
  fullName: string
  email: string
  password: string
  token: string
}

export type RegisterValues = Omit<RegisteredUser, "_id" | "token">
export type LoginValues = Omit<RegisteredUser, "_id" | "token" | "fullName">
