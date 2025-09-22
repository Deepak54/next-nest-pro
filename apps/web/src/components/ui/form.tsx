"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { Controller, FormProvider, useFormContext } from "react-hook-form"
import { cn } from "@/lib/utils"

const Form = FormProvider

function FormField({
  name,
  control,
  render,
}: {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (props: any) => React.ReactNode
}) {
  const methods = useFormContext()
  const ctrl = control ?? methods.control
  return <Controller name={name} control={ctrl} render={render} />
}

function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2", className)} {...props} />
}

function FormLabel({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-sm font-medium", className)} {...props} />
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  return <Slot {...props} />
}

function FormDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-[0.8rem] text-muted-foreground", className)} {...props} />
}

function FormMessage({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const { formState } = useFormContext()
  const msg = typeof children !== "undefined" ? children : (formState.errors as Record<string, any>)?.root?.message
  if (!msg) return null
  return (
    <p className={cn("text-sm font-medium text-destructive", className)} {...props}>
      {String(msg)}
    </p>
  )
}

export { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage }
