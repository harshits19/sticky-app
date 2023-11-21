import { create } from "zustand"

interface ProfilePhotoProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  url?: string
  onReplace: (url: string) => void
}

export const useProfilePhoto = create<ProfilePhotoProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true, url: undefined }),
  onClose: () => set({ isOpen: false, url: undefined }),
  onReplace: (url: string) => set({ isOpen: true, url }),
}))
