"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type SelectContextValue = {
  value: string;
  onValueChange: (value: string) => void;
};

const SelectContext = React.createContext<SelectContextValue | null>(null);

function useSelect() {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error("Select components must be used within Select");
  return context;
}

export function Select({
  value,
  onValueChange,
  children,
}: {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <SelectContext.Provider value={{ value, onValueChange }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  useSelect();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <Button
        type="button"
        id={id}
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className={cn("w-full justify-between", className)}
        onClick={() => setOpen(!open)}
      >
        {children}
      </Button>
    </div>
  );
}

export function SelectValue({
  placeholder,
}: {
  children?: React.ReactNode;
  placeholder?: string;
}) {
  const { value } = useSelect();
  return <span>{value ?? placeholder ?? ""}</span>;
}

export function SelectContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { onValueChange } = useSelect();
  return (
    <div className="absolute z-50 mt-1 w-full rounded-md border border-border bg-background shadow-md">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{ onValueChange?: (v: string) => void }>, {
            onValueChange,
          });
        }
        return child;
      })}
    </div>
  );
}

export function SelectItem({
  value,
  children,
  onValueChange,
}: {
  value: string;
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      className="w-full justify-start"
      onClick={() => onValueChange?.(value)}
    >
      {children}
    </Button>
  );
}
