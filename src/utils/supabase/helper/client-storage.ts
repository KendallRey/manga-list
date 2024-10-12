import { SUPABASE } from "../constant/supabase";
import { createClient } from "../client";
import { type TransformOptions } from "@supabase/storage-js";

export const getSignedUrlClient = async (url?: string | null, expiresIn?: number, transform?: TransformOptions) => {
  const client = createClient();
  const { NAME, EXPIRES_IN } = SUPABASE.BUCKET_MANGA;

  const data = url
    ? await client.storage.from(NAME).createSignedUrl(url, expiresIn ?? EXPIRES_IN, { transform })
    : null;

  return data;
};
