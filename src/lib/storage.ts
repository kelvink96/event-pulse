import {storage} from "@/lib/appwrite.ts";
import {ID} from "appwrite"
import {EventPulseEvent} from "@/types/events.ts";

export async function uploadFile(file: File) {
  return await storage.createFile(import.meta.env.VITE_APPWRITE_EVENTS_BUCEKT_IMAGES_ID, ID.unique(), file);
}

export async function deleteFileById(fileId: string) {
    return await storage.deleteFile(import.meta.env.VITE_APPWRITE_EVENTS_BUCEKT_IMAGES_ID, fileId);
}

export function getFilePreviewImageById(fileId: EventPulseEvent["$id"]) {
  return storage.getFilePreview(import.meta.env.VITE_APPWRITE_EVENTS_BUCEKT_IMAGES_ID, fileId)
}
