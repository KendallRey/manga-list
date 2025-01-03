import { SUPABASE } from "../constant/supabase";

export const toBucketPublicMangaUrl = (fullPath: string | null, width?: number, quality?: number) => {
  if (!fullPath) return;
  const { WIDTH, QUALITY } = SUPABASE.BUCKET_MANGA.IMAGE;
  return `${SUPABASE.BUCKET_MANGA.PUBLIC_LOADER_URL}/${fullPath}?width=${width || WIDTH}&quality=${quality || QUALITY}`;
};

export const toBucketPublicProfileUrl = (fullPath: string | null, width?: number, quality?: number) => {
  if (!fullPath) return;
  const { WIDTH, QUALITY } = SUPABASE.BUCKET_PROFILE.IMAGE;
  return `${SUPABASE.BUCKET_PROFILE.PUBLIC_LOADER_URL}/${fullPath}?width=${width || WIDTH}&quality=${quality || QUALITY}`;
};

export const toBucketPublicBlurUrl = (fullPath?: string | null) => {
  if (!fullPath) return;
  return `${SUPABASE.BUCKET_MANGA.PUBLIC_LOADER_URL}/${fullPath}?width=${120}&quality=${20}`;
};
