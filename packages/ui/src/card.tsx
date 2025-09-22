import * as React from "react";
import { cn } from "./lib/cn";

export function Card(p: React.HTMLAttributes<HTMLDivElement>) { return <div {...p} className={cn("rounded-xl border bg-card text-card-foreground shadow", p.className)} /> }
export function CardHeader(p: React.HTMLAttributes<HTMLDivElement>) { return <div {...p} className={cn("flex flex-col space-y-1.5 p-6", p.className)} /> }
export function CardTitle(p: React.HTMLAttributes<HTMLHeadingElement>) { return <h3 {...p} className={cn("text-2xl font-semibold leading-none tracking-tight", p.className)} /> }
export function CardDescription(p: React.HTMLAttributes<HTMLParagraphElement>) { return <p {...p} className={cn("text-sm text-muted-foreground", p.className)} /> }
export function CardContent(p: React.HTMLAttributes<HTMLDivElement>) { return <div {...p} className={cn("p-6 pt-0", p.className)} /> }
export function CardFooter(p: React.HTMLAttributes<HTMLDivElement>) { return <div {...p} className={cn("flex items-center p-6 pt-0", p.className)} /> }
