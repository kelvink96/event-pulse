import {storage} from "@/lib/appwrite.ts";
import {ID} from "appwrite"

export async function uploadFile(file: File) {
  return await storage.createFile(import.meta.env.VITE_APPWRITE_EVENTS_BUCEKT_IMAGES_ID, ID.unique(), file);
}

export function getFilePreviewImageById(fileId: string) {
  return storage.getFilePreview(import.meta.env.VITE_APPWRITE_EVENTS_BUCEKT_IMAGES_ID, fileId)
}
