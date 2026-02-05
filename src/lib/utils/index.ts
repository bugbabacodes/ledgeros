import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Decimal from "decimal.js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format money amount from paise/cents to display format
 * @param amount - Amount in smallest unit (paise for INR, cents for USD)
 * @param currency - Currency code (default: INR)
 * @returns Formatted currency string
 */
export function formatMoney(amount: number, currency: string = "INR"): string {
  const decimalAmount = new Decimal(amount).dividedBy(100);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
  }).format(decimalAmount.toNumber());
}

/**
 * Convert display amount (in rupees/dollars) to paise/cents for storage
 * @param amount - Amount in main currency unit
 * @returns Amount in smallest unit (paise/cents)
 */
export function toSmallestUnit(amount: number): number {
  return new Decimal(amount).times(100).toNumber();
}

/**
 * Generate a fingerprint for transaction deduplication
 * @param date - Transaction date (ISO format)
 * @param amount - Amount in paise/cents
 * @param description - Transaction description
 * @returns SHA256 hash string
 */
export function generateFingerprint(
  date: string,
  amount: number,
  description: string
): string {
  const normalizedDesc = description.trim().toLowerCase().replace(/\s+/g, " ");
  const data = `${date}_${amount}_${normalizedDesc}`;
  
  // Simple hash function since crypto-js might not be available in all contexts
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(16, "0");
}

/**
 * Format date to display format
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Format relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffMins > 0) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  return "Just now";
}
