import { type ComponentProps } from "react"

import { cn } from "@/lib/utils"

function Field({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="field" className={cn("grid gap-2", className)} {...props} />
}

function FieldLabel({ className, ...props }: ComponentProps<"label">) {
  return (
    <label
      data-slot="field-label"
      className={cn("text-sm leading-none font-medium", className)}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="field-group" className={cn("grid gap-6", className)} {...props} />
}

function FieldSeparator({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="field-separator" className={cn("relative text-center text-xs", className)} {...props}>
      <span
        data-slot="field-separator-content"
        className="text-muted-foreground relative z-10 inline-block bg-background px-2"
      >
        {children}
      </span>
      <div className="absolute inset-0 top-1/2 -z-0 h-px -translate-y-1/2 bg-border" />
    </div>
  )
}

export { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator }
