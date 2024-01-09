"use client"

const ProgressCircle = ({ progress }: { progress: number }) => {
  const normalizedProgress = Math.min(Math.max(progress, 0), 100)
  const dashOffset = 400 - (250 * normalizedProgress) / 100

  return (
    <div
      className="relative h-6 w-6 antialiased"
      style={{ WebkitTextSizeAdjust: "100%" }}>
      <svg className="h-full w-full" viewBox="0 0 100 100">
        <circle
          className="stroke-current text-gray-300 dark:text-muted"
          strokeWidth="8"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        />
        <circle
          className="stroke-current text-foreground/80"
          strokeWidth="9"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          strokeDasharray="400"
          strokeDashoffset={dashOffset}
          style={{
            transition: "stroke-dashoffset 0.35s",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
      </svg>
    </div>
  )
}
export default ProgressCircle
