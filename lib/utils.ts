import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleDateString("de-DE", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
