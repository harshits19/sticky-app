export const HomeIcon = ({ className }: { className?: string }) => {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" className={className}>
      <title>Home</title>
      <path
        d="M2.25 12.8855V20.7497C2.25 21.8543 3.14543 22.7497 4.25 22.7497H8.25C8.52614 22.7497 8.75 22.5259 8.75 22.2497V17.6822V17.4997C8.75 15.1525 10.6528 13.2497 13 13.2497C15.3472 13.2497 17.25 15.1525 17.25 17.4997V17.6822V22.2497C17.25 22.5259 17.4739 22.7497 17.75 22.7497H21.75C22.8546 22.7497 23.75 21.8543 23.75 20.7497V12.8855C23.75 11.3765 23.0685 9.94815 21.8954 8.99883L16.1454 4.3454C14.3112 2.86095 11.6888 2.86095 9.85455 4.3454L4.10455 8.99883C2.93153 9.94815 2.25 11.3765 2.25 12.8855Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"></path>
    </svg>
  )
}

export const SearchIcon = ({ className }: { className?: string }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className}>
      <title>Search</title>
      <path
        clipRule="evenodd"
        d="M3.5 11.5C3.5 7.08172 7.08172 3.5 11.5 3.5C15.9183 3.5 19.5 7.08172 19.5 11.5C19.5 15.9183 15.9183 19.5 11.5 19.5C7.08172 19.5 3.5 15.9183 3.5 11.5ZM11.5 1C5.70101 1 1 5.70101 1 11.5C1 17.299 5.70101 22 11.5 22C13.949 22 16.2023 21.1615 17.9883 19.756L22.3661 24.1339C22.8543 24.622 23.6457 24.622 24.1339 24.1339C24.622 23.6457 24.622 22.8543 24.1339 22.3661L19.756 17.9883C21.1615 16.2023 22 13.949 22 11.5C22 5.70101 17.299 1 11.5 1Z"
        strokeWidth="2"
        fill="currentColor"
        fillRule="evenodd"></path>
    </svg>
  )
}

export const CreateIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
      fill="transparent">
      <title>Create</title>
      <path
        d="M22.75 13L22.75 13.15C22.75 16.5103 22.75 18.1905 22.096 19.4739C21.5208 20.6029 20.6029 21.5208 19.4739 22.096C18.1905 22.75 16.5103 22.75 13.15 22.75L12.85 22.75C9.48969 22.75 7.80953 22.75 6.52606 22.096C5.39708 21.5208 4.4792 20.6029 3.90396 19.4739C3.25 18.1905 3.25 16.5103 3.25 13.15L3.25 12.85C3.25 9.48968 3.25 7.80953 3.90396 6.52606C4.4792 5.39708 5.39708 4.4792 6.52606 3.90396C7.80953 3.25 9.48968 3.25 12.85 3.25L13 3.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"></path>
      <path
        d="M21.75 4.25L13.75 12.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"></path>
    </svg>
  )
}

export const HeartIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
      fill="transparent">
      <title>Notifications</title>
      <path
        d="M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z"
        stroke="currentColor"
        strokeWidth="2"></path>
    </svg>
  )
}

export const UserIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      className={className}
      fill="transparent"
      stroke="currentColor">
      <title>Profile</title>
      <circle
        cx="13"
        cy="7.25"
        r="4"
        strokeWidth="2"></circle>
      <path
        d="M6.26678 23.75H19.744C21.603 23.75 22.5 23.2186 22.5 22.0673C22.5 19.3712 18.8038 15.75 13 15.75C7.19625 15.75 3.5 19.3712 3.5 22.0673C3.5 23.2186 4.39704 23.75 6.26678 23.75Z"
        strokeWidth="2"></path>
    </svg>
  )
}

export const LikeIcon = ({
  className,
  title = "Like",
}: {
  className?: string
  title?: string
}) => {
  return (
    <svg
      width="20"
      height="19"
      viewBox="0 0 24 22"
      className={className}
      fill="transparent">
      <title>{title}</title>
      <path
        d="M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z"
        strokeWidth="2"></path>
    </svg>
  )
}

export const ReplyIcon = ({ className }: { className?: string }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className={className}>
      <title>Reply</title>
      <path
        d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"></path>
    </svg>
  )
}

export const RepostIcon = ({
  className,
  title = "Repost",
}: {
  className?: string
  title?: string
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor">
      <title>{title}</title>
      <path d="M19.998 9.497a1 1 0 0 0-1 1v4.228a3.274 3.274 0 0 1-3.27 3.27h-5.313l1.791-1.787a1 1 0 0 0-1.412-1.416L7.29 18.287a1.004 1.004 0 0 0-.294.707v.001c0 .023.012.042.013.065a.923.923 0 0 0 .281.643l3.502 3.504a1 1 0 0 0 1.414-1.414l-1.797-1.798h5.318a5.276 5.276 0 0 0 5.27-5.27v-4.228a1 1 0 0 0-1-1Zm-6.41-3.496-1.795 1.795a1 1 0 1 0 1.414 1.414l3.5-3.5a1.003 1.003 0 0 0 0-1.417l-3.5-3.5a1 1 0 0 0-1.414 1.414l1.794 1.794H8.27A5.277 5.277 0 0 0 3 9.271V13.5a1 1 0 0 0 2 0V9.271a3.275 3.275 0 0 1 3.271-3.27Z"></path>
    </svg>
  )
}

export const ShareIcon = ({ className }: { className?: string }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className={className}>
      <title>Share</title>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="22"
        x2="9.218"
        y1="3"
        y2="10.083"></line>
      <polygon
        fill="none"
        points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"></polygon>
    </svg>
  )
}
