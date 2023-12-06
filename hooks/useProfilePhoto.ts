import { create } from "zustand"

interface ProfilePhotoProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  url?: string
  clearUrl: () => void
}

export const useProfilePhoto = create<ProfilePhotoProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true, url: undefined }),
  onClose: () => set({ isOpen: false, url: undefined }),
  clearUrl: () => set({ url: undefined }),
}))
