"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const CommandContext = React.createContext<{
  query: string;
  setQuery: (q: string) => void;
} | null>(null);

function useCommandContext() {
  const ctx = React.useContext(CommandContext);
  if (!ctx) throw new Error("Command components must be used within <Command>");
  return ctx;
}

export const Command = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(function Command({ className, children, ...props }, ref) {
  const [query, setQuery] = React.useState("");
  return (
    <CommandContext.Provider value={{ query, setQuery }}>
      <div
        ref={ref}
        className={cn("bg-background text-foreground", className)}
        {...props}
      >
        {children}
      </div>
    </CommandContext.Provider>
  );
});

export const CommandInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input">
>(function CommandInput({ className, onChange, ...props }, ref) {
  const { setQuery } = useCommandContext();
  return (
    <input
      ref={ref}
      className={cn(
        "w-full px-3 py-2 text-sm outline-none border rounded-md",
        className
      )}
      onChange={(e) => {
        setQuery(e.target.value);
        onChange?.(e);
      }}
      {...props}
    />
  );
});

export const CommandList = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(function CommandList({ className, children, ...props }, ref) {
  return (
    <div ref={ref} className={cn("mt-2", className)} {...props}>
      {children}
    </div>
  );
});

export const CommandGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(function CommandGroup({ className, children, ...props }, ref) {
  return (
    <div ref={ref} className={cn("space-y-1", className)} {...props}>
      {children}
    </div>
  );
});

export const CommandEmpty = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(function CommandEmpty({ className, children, ...props }, ref) {
  const { query } = useCommandContext();
  return query ? (
    <div
      ref={ref}
      className={cn("px-3 py-2 text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </div>
  ) : null;
});

export const CommandItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    value: string;
    onSelectValue?: (value: string) => void;
  }
>(function CommandItem(
  { className, children, value, onSelectValue, ...props },
  ref
) {
  const { query } = useCommandContext();
  const isMatch = React.useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return true;
    return (
      value.toLowerCase().includes(needle) ||
      String(children).toLowerCase().includes(needle)
    );
  }, [query, value, children]);

  if (!isMatch) return null;
  return (
    <div
      ref={ref}
      className={cn(
        "px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-md text-left w-full",
        className
      )}
      onClick={() => onSelectValue?.(value)}
      {...props}
    >
      {children}
    </div>
  );
});
