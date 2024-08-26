import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function excerpt(text: string, maxLength: number): string {
  // Check if the text is longer than the maximum length
  if (text.length > maxLength) {
    // Return the shortened text with ellipsis
    return text.substring(0, maxLength) + ' [...]';
  }
  // If text is shorter or equal to maxLength, return the original text
  return text;
}
