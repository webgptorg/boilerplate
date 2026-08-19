import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ label, className, id, ...props }: InputProps) {
  return (
    <label className="input-wrap" htmlFor={id}>
      {label ? <span className="input-label">{label}</span> : null}
      <input id={id} className={cn("input", className)} {...props} />
    </label>
  );
}
