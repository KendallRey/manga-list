import { SUPABASE } from "../constant/supabase";
import { createClient } from "../server";
import { type TransformOptions } from "@supabase/storage-js";

/**
 * Generates a signed URL for accessing a private file in Supabase storage.
 * This function is meant to be used on the server-side to securely generate URLs.
 *
 * @param {string | null} [url] - The relative file path in the Supabase storage bucket for which the signed URL should be generated.
 * @param {number} [expiresIn] - Optional. The expiration time (in seconds) for the signed URL. Defaults to the configured bucket expiration time if not provided.
 *
 * @returns {Promise<{ signedUrl: string | null; error?: any } | null>} - Returns the signed URL and any potential errors, or null if the `url` is not provided.
 *
 * @example
 * ```ts
 * const signedUrlData = await getSignedUrlServer('path/to/file.jpg', 3600);
 * if (signedUrlData?.signedUrl) {
 *   console.log('Signed URL:', signedUrlData.signedUrl);
 * }
 * ```
 */
export const getSignedUrlServer = async (url?: string | null, expiresIn?: number, transform?: TransformOptions) => {
  const client = createClient();
  const { NAME, EXPIRES_IN } = SUPABASE.BUCKET;

  const data = url
    ? await client.storage.from(NAME).createSignedUrl(url, expiresIn ?? EXPIRES_IN, { transform })
    : null;

  return data;
};
