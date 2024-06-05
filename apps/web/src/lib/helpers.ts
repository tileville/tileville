import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function walletInstalled() {
  return typeof mina !== "undefined";
}

export const formatAddress = (address: string | undefined) =>
  address ? address.slice(0, 5) + "..." + address.slice(-5) : "None";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
