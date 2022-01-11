import { User } from '@prisma/client'

// Created at AuthGuard
export type TUserProp = {
  id: User['id']
  email: User['email']
  role: User['role']
}
