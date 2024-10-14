import { SUPABASE } from "../constant/supabase";

type ISupabaseImageLoader = {
  src: string;
  width: number;
  quality?: number;
};

export default function supabaseImageLoader({ src, width, quality }: ISupabaseImageLoader) {
  return `${SUPABASE.BUCKET_MANGA.PUBLIC_LOADER_URL}/${src}?width=${width}&quality=${quality || 75}`;
}
