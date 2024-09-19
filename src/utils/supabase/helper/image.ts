import { SUPABASE } from "../constant/supabase";

export const toBucketPublicUrl = (fullPath: string | null, width?: number, quality?: number) => {
  if (!fullPath) return;
  const { WIDTH, QUALITY } = SUPABASE.BUCKET.IMAGE;
  return `${SUPABASE.BUCKET.PUBLIC_LOADER_URL}/${fullPath}?width=${width || WIDTH}&quality=${quality || QUALITY}`;
};

export const toBucketPublicBlurUrl = (fullPath?: string | null) => {
  if (!fullPath) return;
  return `${SUPABASE.BUCKET.PUBLIC_LOADER_URL}/${fullPath}?width=${120}&quality=${20}`;
};
