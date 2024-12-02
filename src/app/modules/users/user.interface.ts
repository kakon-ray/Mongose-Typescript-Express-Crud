export type TUser = {
  id: string
  password: string
  needsPasswordChange: boolean
  role: 'student' | 'user' | 'faculty'
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
}

export type NewUser = {
  password: string
  role: string
  id: string
}
