"use client"

import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { GlassElementLayers } from "@/components/surfaces/liquid-glass-filter"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive> & {
    glass?: boolean
  }
>(({ className, glass = true, children, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "alka-command relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/10 p-2 text-popover-foreground",
      glass ? "alka-liquid-glass" : "border-transparent bg-transparent p-0 shadow-none",
      className
    )}
    {...props}
  >
    {glass ? <GlassElementLayers /> : null}
    {children}
  </CommandPrimitive>
))
Command.displayName = CommandPrimitive.displayName

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent
        glass={false}
        showCloseButton={false}
        className="max-w-xl gap-0 overflow-visible p-0"
      >
        <Command className="min-h-[22rem]">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, onValueChange, ...props }, ref) => {
  const inputRef = React.useRef<React.ElementRef<typeof CommandPrimitive.Input> | null>(null)

  const setInputRef = React.useCallback(
    (node: React.ElementRef<typeof CommandPrimitive.Input> | null) => {
      inputRef.current = node

      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    },
    [ref]
  )

  const resetListScroll = React.useCallback(() => {
    const list = inputRef.current
      ?.closest("[cmdk-root]")
      ?.querySelector<HTMLElement>("[cmdk-list]")

    if (!list) return

    requestAnimationFrame(() => {
      list.scrollTop = 0
      requestAnimationFrame(() => {
        list.scrollTop = 0
      })
    })
  }, [])

  return (
    <div
      className="mx-1 mb-2 mt-1 flex h-11 items-center border-b border-white/10 px-4"
      cmdk-input-wrapper=""
    >
      <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
      <CommandPrimitive.Input
        ref={setInputRef}
        className={cn(
          "flex h-11 w-full rounded-none bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onValueChange={(value) => {
          onValueChange?.(value)
          resetListScroll()
        }}
        {...props}
      />
    </div>
  )
})

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[18rem] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm text-muted-foreground"
    {...props}
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-0 text-foreground [&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:pb-2 [&_[cmdk-group-heading]]:pt-1 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-items]]:grid [&_[cmdk-group-items]]:gap-1 [&_[cmdk-group-items]]:px-1",
      className
    )}
    {...props}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("mx-1 my-2 h-px bg-white/10", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "alka-command-item relative flex min-h-11 cursor-pointer select-none items-center gap-2 rounded-full border border-transparent bg-transparent py-2.5 pl-4 pr-4 text-sm font-medium outline-none transition-[background-color,border-color,box-shadow,color] duration-300 ease-[var(--alka-ease-smooth)] data-[disabled=true]:pointer-events-none data-[selected=true]:shadow-none data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    )}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
