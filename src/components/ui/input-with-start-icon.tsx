import { ComponentProps } from "react";

import { Input } from "./input";

import { cn } from "@/util/cn";

export function InputWithStartIcon({
  className,
  children,
  ...props
}: ComponentProps<typeof Input>) {
  return (
    <div className="relative">
      <Input className={cn("peer ps-9", className)} {...props} />
      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
        {children}
      </div>
    </div>
  );
}
