import * as React from "react"

import { cn } from "@/lib/utils"

export type ImageCardProps = React.HTMLAttributes<HTMLDivElement> & {
  imageSrc: string
  imageAlt: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  description?: React.ReactNode
  imageClassName?: string
  contentClassName?: string
}

const ImageCard = React.forwardRef<HTMLDivElement, ImageCardProps>(
  (
    {
      className,
      contentClassName,
      description,
      imageAlt,
      imageClassName,
      imageSrc,
      subtitle,
      title,
      ...props
    },
    ref,
  ) => (
    <div ref={ref} className={cn("alka-image-tile", className)} {...props}>
      <img
        alt={imageAlt}
        className={cn("alka-image-tile-image", imageClassName)}
        loading="lazy"
        src={imageSrc}
      />
      <div aria-hidden="true" className="alka-image-tile-vignette" />
      <div aria-hidden="true" className="alka-image-tile-glass-border" />
      <div className={cn("alka-image-tile-content", contentClassName)}>
        <div aria-hidden="true" className="alka-image-tile-content-blur" />
        <div className="alka-image-tile-copy">
          {subtitle ? <p className="alka-image-tile-subtitle">{subtitle}</p> : null}
          <h3 className="alka-image-tile-title">{title}</h3>
          {description ? (
            <p className="alka-image-tile-description">{description}</p>
          ) : null}
        </div>
      </div>
    </div>
  ),
)
ImageCard.displayName = "ImageCard"

export { ImageCard }
