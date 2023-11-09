import {account} from "@/lib/appwrite.ts";
import {ID} from "appwrite"

export async function logIn(email: string) {
  return await account.createMagicURLSession(ID.unique(), email, `${window.location.origin}/session`)
}

export async function verifySession(userId: string, secret: string) {
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
