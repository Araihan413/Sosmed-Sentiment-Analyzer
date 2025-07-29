import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function extractYouTubeVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
    const pathname = parsedUrl.pathname;
    const searchParams = parsedUrl.searchParams;

    // Format: https://www.youtube.com/watch?v=VIDEO_ID
    if ((hostname.includes('youtube.com') || hostname.includes('youtube-nocookie.com')) && pathname === '/watch') {
      return searchParams.get('v');
    }

    // Format: https://youtu.be/VIDEO_ID
    if (hostname === 'youtu.be') {
      return pathname.slice(1); // Buang "/"
    }

    // Format: https://www.youtube.com/embed/VIDEO_ID
    if (pathname.startsWith('/embed/')) {
      return pathname.split('/embed/')[1].split(/[?/]/)[0];
    }

    // Format: https://www.youtube.com/v/VIDEO_ID
    if (pathname.startsWith('/v/')) {
      return pathname.split('/v/')[1].split(/[?/]/)[0];
    }

    return null; // Tidak cocok format
  } catch (error) {
    return null; // URL tidak valid
  }
}

export function isSpam(comment: string): boolean {
  const spamKeywords = ['subscribe', 'sub4sub', 'giveaway', 'check my channel', 'visit my profile'];
  return spamKeywords.some(keyword => comment.toLowerCase().includes(keyword));
}

export function cleanHtmlTags(text: string): string {
  if (!text) return '';

  // Hilangkan tag <a> tapi simpan isinya
  const withoutATags = text.replace(/<a\b[^>]*>(.*?)<\/a>/gi, '$1');

  // Hapus semua tag HTML lain (seperti <br>, <i>, <div>, dsb)
  const withoutOtherTags = withoutATags.replace(/<\/?[^>]+(>|$)/g, '');

  // Hapus spasi berlebih
  return withoutOtherTags.trim();
}

export function persentase(angka: number, total: number): number {
  return Math.round((angka / total) * 100);
}