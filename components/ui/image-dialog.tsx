"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ImageDialog = DialogPrimitive.Root

const ImageDialogTrigger = DialogPrimitive.Trigger

const ImageDialogPortal = DialogPrimitive.Portal

const ImageDialogClose = DialogPrimitive.Close

const ImageDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-backdrop/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
))
ImageDialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const ImageDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <ImageDialogPortal>
    <ImageDialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50  flex max-w-7xl translate-x-[-50%] translate-y-[-50%] items-center justify-center bg-transparent p-0 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        className,
      )}
      {...props}>
      {children}
      <DialogPrimitive.Close
        className="absolute -right-4 -top-4 cursor-pointer rounded-full bg-primary p-1.5 text-secondary opacity-80 transition-opacity hover:opacity-100 focus:outline-none"
        title="Close">
        <X className="h-5 w-5" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </ImageDialogPortal>
))
ImageDialogContent.displayName = DialogPrimitive.Content.displayName

const ImageDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...props}
  />
)
ImageDialogHeader.displayName = "ImageDialogHeader"

const ImageDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
)
ImageDialogFooter.displayName = "ImageDialogFooter"

const ImageDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
))
ImageDialogTitle.displayName = DialogPrimitive.Title.displayName

const ImageDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
ImageDialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  ImageDialog,
  ImageDialogPortal,
  ImageDialogOverlay,
  ImageDialogClose,
  ImageDialogTrigger,
  ImageDialogContent,
  ImageDialogHeader,
  ImageDialogFooter,
  ImageDialogTitle,
  ImageDialogDescription,
}
