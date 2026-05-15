"use client"

import * as React from "react"

type Direction = "ltr" | "rtl"

const DirectionContext = React.createContext<Direction>("ltr")

type DirectionProviderProps = React.HTMLAttributes<HTMLDivElement> & {
  dir?: Direction
}

function DirectionProvider({ dir = "ltr", children, ...props }: DirectionProviderProps) {
  return (
    <DirectionContext.Provider value={dir}>
      <div dir={dir} {...props}>
        {children}
      </div>
    </DirectionContext.Provider>
  )
}

function useDirection() {
  return React.useContext(DirectionContext)
}

export { DirectionProvider, useDirection }
export type { Direction }
