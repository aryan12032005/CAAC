import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path: string | undefined | null): string {
  if (!path) return "";
  
  let trimmed = path.trim();
  
  // Auto-convert Google Drive file links to direct image URLs
  if (trimmed.includes("drive.google.com/file/d/")) {
    const match = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      trimmed = `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
  } else if (trimmed.includes("drive.google.com/open?id=")) {
    const match = trimmed.match(/id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      trimmed = `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:")) {
    return trimmed;
  }
  const baseUrl = import.meta.env.VITE_API_URL || "";
  const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return `${cleanBase}${cleanPath}`;
}

