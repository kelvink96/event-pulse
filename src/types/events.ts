export interface EventPulseEvent {
    $id: string
    name: string
    location: string
    date: string
    imageFileId?: string
    imageHeight?: number
    imageWidth?: number
}

export interface EventPulseImage {
    height: number
    file: File
    width: number
}

export interface EventPulseImagePreview {
    url?: string
    alt: string
    height?: number
    width?: number
}
