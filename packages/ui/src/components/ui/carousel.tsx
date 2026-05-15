"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CarouselContextValue = {
  viewportRef: React.RefObject<HTMLDivElement | null>
  activeIndex: number
  itemCount: number
  scrollTo: (index: number) => void
  scrollByPage: (direction: -1 | 1) => void
  registerItem: () => () => void
  syncActiveIndex: () => void
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) throw new Error("Carousel components must be used inside <Carousel />")
  return context
}

const Carousel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const viewportRef = React.useRef<HTMLDivElement | null>(null)
    const [activeIndex, setActiveIndex] = React.useState(0)
    const [itemCount, setItemCount] = React.useState(0)

    const registerItem = React.useCallback(() => {
      setItemCount((count) => count + 1)
      return () => setItemCount((count) => Math.max(0, count - 1))
    }, [])

    const syncActiveIndex = React.useCallback(() => {
      const viewport = viewportRef.current
      if (!viewport) return

      const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2
      const items = Array.from(viewport.children) as HTMLElement[]
      let nearestIndex = 0
      let nearestDistance = Number.POSITIVE_INFINITY

      items.forEach((item, index) => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2
        const distance = Math.abs(itemCenter - viewportCenter)
        if (distance < nearestDistance) {
          nearestDistance = distance
          nearestIndex = index
        }
      })

      setActiveIndex(nearestIndex)
    }, [])

    const scrollTo = React.useCallback((index: number) => {
      const viewport = viewportRef.current
      const item = viewport?.children.item(index) as HTMLElement | null
      if (!viewport || !item) return
      const left = item.offsetLeft - (viewport.clientWidth - item.offsetWidth) / 2
      viewport.scrollTo({ left: Math.max(0, left), behavior: "smooth" })
      setActiveIndex(Math.min(Math.max(index, 0), Math.max(itemCount - 1, 0)))
    }, [itemCount])

    const scrollByPage = React.useCallback(
      (direction: -1 | 1) => {
        const nextIndex = Math.min(Math.max(activeIndex + direction, 0), Math.max(itemCount - 1, 0))
        scrollTo(nextIndex)
      },
      [activeIndex, itemCount, scrollTo],
    )

    return (
      <CarouselContext.Provider
        value={{ viewportRef, activeIndex, itemCount, scrollTo, scrollByPage, registerItem, syncActiveIndex }}
      >
        <div ref={ref} className={cn("relative", className)} {...props} />
      </CarouselContext.Provider>
    )
  },
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, onScroll, ...props }, ref) => {
    const { viewportRef, syncActiveIndex } = useCarousel()
    const scrollFrameRef = React.useRef<number | null>(null)

    return (
      <div
        ref={(node) => {
          viewportRef.current = node
          if (typeof ref === "function") ref(node)
          else if (ref) ref.current = node
        }}
        className={cn(
          "flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[6%] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          className,
        )}
        onScroll={(event) => {
          onScroll?.(event)
          if (scrollFrameRef.current) window.cancelAnimationFrame(scrollFrameRef.current)
          scrollFrameRef.current = window.requestAnimationFrame(syncActiveIndex)
        }}
        {...props}
      />
    )
  },
)
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { registerItem } = useCarousel()

    React.useEffect(() => registerItem(), [registerItem])

    return (
      <div
        ref={ref}
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-[88%] snap-center transition-transform duration-700 ease-[var(--alka-ease-smooth)] md:basis-[76%] lg:basis-[68%]",
          className,
        )}
        {...props}
      />
    )
  },
)
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", onClick, ...props }, ref) => {
    const { scrollByPage } = useCarousel()
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        aria-label="Previous slide"
        className={cn("!absolute left-3 top-1/2 z-10 -translate-y-1/2 bg-background/72 backdrop-blur-xl", className)}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) scrollByPage(-1)
        }}
        {...props}
      >
        <ChevronLeft className="size-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
    )
  },
)
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", onClick, ...props }, ref) => {
    const { scrollByPage } = useCarousel()
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        aria-label="Next slide"
        className={cn("!absolute right-3 top-1/2 z-10 -translate-y-1/2 bg-background/72 backdrop-blur-xl", className)}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) scrollByPage(1)
        }}
        {...props}
      >
        <ChevronRight className="size-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    )
  },
)
CarouselNext.displayName = "CarouselNext"

function CarouselDots({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { activeIndex, itemCount, scrollTo } = useCarousel()

  return (
    <div
      className={cn("alka-carousel-dots alka-pill-surface", className)}
      style={
        {
          ...style,
          "--alka-carousel-dot-offset": `${activeIndex * 2.1}rem`,
        } as React.CSSProperties
      }
      {...props}
    >
      {Array.from({ length: itemCount }).map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Go to slide ${index + 1}`}
          data-active={activeIndex === index}
          className="alka-carousel-dot"
          onClick={() => scrollTo(index)}
        />
      ))}
    </div>
  )
}

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots }
