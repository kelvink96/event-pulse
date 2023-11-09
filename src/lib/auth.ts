import {account} from "@/lib/appwrite.ts";
import {ID} from "appwrite"

export async function logIn(email: string) {
  return await account.createMagicURLSession(ID.unique(), email, `${window.location.origin}/session`)
}

export interface VerifySessionOptions {
  userId: string
  secret: string
}

export async function verifySession({userId, secret}: VerifySessionOptions) {
  return await account.updateMagicURLSession(userId, secret)
}

export async function getCurrentSession() {
  const session = await account.getSession('current')

  return {
    session
  }
}

export async function deleteCurrentSession() {
  await account.deleteSession('current')
}
