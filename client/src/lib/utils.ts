import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function excerpt(text: string, maxLength: number): string {
  // Check if the text is longer than the maximum length
  if (text.length > maxLength) {
    // Return the shortened text with ellipsis
    return text.substring(0, maxLength) + ' ...';
  }
  // If text is shorter or equal to maxLength, return the original text
  return text;
}

export function formatReadableDate(isoTimestamp: string): string {
  const date = new Date(isoTimestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  };

  return date.toLocaleString('en-US', options);
}
