"use client"

import type * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "tel") {
      // Only allow numbers
      const numericValue = e.target.value.replace(/[^0-9]/g, "")
      // Limit to 10 characters
      e.target.value = numericValue.slice(0, 10)
    }

    // Call original onChange if provided
    if (props.onChange) {
      props.onChange(e)
    }
  }

  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-9 rounded-md border bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] file:h-7 file:text-sm file:font-medium focus-visible:ring-[3px] aria-invalid:ring-[3px] md:text-sm file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
      onChange={handleChange}
    />
  )
}

export { Input }
