"use client"
import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Theme, Categories, EmojiStyle } from "emoji-picker-react"

const EmojiPicker = dynamic(
  () => {
    return import("emoji-picker-react")
  },
  { ssr: false },
)

type IconPickerProps = {
  onChange: (icon: string) => void
  children: React.ReactNode
  asChild?: boolean
}
const IconPicker = ({ onChange, children, asChild }: IconPickerProps) => {
  const { resolvedTheme } = useTheme()
  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap
  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  }
  const theme = themeMap[currentTheme]
  const categories = [
    {
      name: "Smiles & Emotions",
      category: Categories.SMILEYS_PEOPLE,
    },
    {
      name: "Animals & Nature",
      category: Categories.ANIMALS_NATURE,
    },
    {
      name: "Food & Drink",
      category: Categories.FOOD_DRINK,
    },
    {
      name: "Travel & Places",
      category: Categories.TRAVEL_PLACES,
    },
    {
      name: "Activities",
      category: Categories.ACTIVITIES,
    },
    {
      name: "Objects",
      category: Categories.OBJECTS,
    },
  ]

  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent className="z-[99999] w-full border-none p-0 shadow-none">
        <EmojiPicker
          height={350}
          theme={theme}
          emojiStyle={EmojiStyle.GOOGLE}
          onEmojiClick={(data) => onChange(data.emoji)}
          searchDisabled
          skinTonesDisabled
          categories={categories}
        />
      </PopoverContent>
    </Popover>
  )
}
export default IconPicker
