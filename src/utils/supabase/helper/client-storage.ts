import { SUPABASE } from "../constant/supabase";
import { createClient } from "../client";

export const getSignedUrlClient = async (url?: string | null, expiresIn?: number) => {
  const client = createClient();
  const { NAME, EXPIRES_IN } = SUPABASE.BUCKET;

  const data = url ? await client.storage.from(NAME).createSignedUrl(url, expiresIn ?? EXPIRES_IN) : null;

  return data;
};
