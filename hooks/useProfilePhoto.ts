import { create } from "zustand"

interface ProfilePhotoProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  url?: string
  onReplace: (url: string) => void
  imageStore: string[]
  addImg: (url: string) => void
  clearImgStore: () => void
}

export const useProfilePhoto = create<ProfilePhotoProps>((set) => ({
  isOpen: false,
  imageStore: [],
  onOpen: () => set({ isOpen: true, url: undefined }),
  onClose: () => set({ isOpen: false, url: undefined }),
  onReplace: (url: string) => set({ isOpen: true, url }),
  addImg: (url: string) =>
    set((state) => ({ imageStore: [...state.imageStore, url] })),
  clearImgStore: () => set({ imageStore: [], url: undefined }),
}))
