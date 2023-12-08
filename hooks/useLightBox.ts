import { create } from "zustand"

interface LightBoxProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  url?: string
  addUrl: (url: string) => void
  clearUrl: () => void
}

export const useLightBox = create<LightBoxProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true, url: undefined }),
  onClose: () => set({ isOpen: false, url: undefined }),
  addUrl: (url: string) => set({ isOpen: true, url: url }),
  clearUrl: () => set({ url: undefined }),
}))
