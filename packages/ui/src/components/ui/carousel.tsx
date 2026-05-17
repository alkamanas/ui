"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

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
    const programmaticScrollRef = React.useRef<number | null>(null)
    const programmaticScrollTimeoutRef = React.useRef<number | null>(null)

    const registerItem = React.useCallback(() => {
      setItemCount((count) => count + 1)
      return () => setItemCount((count) => Math.max(0, count - 1))
    }, [])

    const syncActiveIndex = React.useCallback(() => {
      if (programmaticScrollRef.current !== null) return

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
      const nextIndex = Math.min(Math.max(index, 0), Math.max(itemCount - 1, 0))

      if (programmaticScrollTimeoutRef.current) {
        window.clearTimeout(programmaticScrollTimeoutRef.current)
      }

      programmaticScrollRef.current = nextIndex
      const left = item.offsetLeft - (viewport.clientWidth - item.offsetWidth) / 2
      viewport.scrollTo({ left: Math.max(0, left), behavior: "smooth" })
      setActiveIndex(nextIndex)
      programmaticScrollTimeoutRef.current = window.setTimeout(() => {
        programmaticScrollRef.current = null
        programmaticScrollTimeoutRef.current = null
      }, 760)
    }, [itemCount])

    React.useEffect(() => {
      return () => {
        if (programmaticScrollTimeoutRef.current) {
          window.clearTimeout(programmaticScrollTimeoutRef.current)
        }
      }
    }, [])

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
  const [isPlaying, setIsPlaying] = React.useState(false)
  const previousIndexRef = React.useRef(activeIndex)
  const [direction, setDirection] = React.useState<"forward" | "backward">("forward")
  const goToSlide = React.useCallback(
    (index: number) => {
      if (index !== activeIndex) {
        setDirection(index > activeIndex ? "forward" : "backward")
      }

      scrollTo(index)
    },
    [activeIndex, scrollTo],
  )

  React.useEffect(() => {
    if (!isPlaying || itemCount <= 1) return

    const interval = window.setInterval(() => {
      goToSlide((activeIndex + 1) % itemCount)
    }, 4200)

    return () => window.clearInterval(interval)
  }, [activeIndex, goToSlide, isPlaying, itemCount])

  React.useEffect(() => {
    if (activeIndex === previousIndexRef.current) return

    setDirection(activeIndex > previousIndexRef.current ? "forward" : "backward")
    previousIndexRef.current = activeIndex
  }, [activeIndex])

  return (
    <div
      className={cn("alka-carousel-controls", className)}
      style={style}
      {...props}
    >
      <div className="alka-carousel-dots alka-pill-surface" data-direction={direction}>
        {Array.from({ length: itemCount }).map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            data-active={activeIndex === index}
            className="alka-carousel-dot"
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
      <button
        type="button"
        aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
        data-playing={isPlaying}
        className="alka-carousel-play alka-pill-surface"
        onClick={() => setIsPlaying((playing) => !playing)}
      >
        {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 fill-current" />}
      </button>
    </div>
  )
}

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots }
