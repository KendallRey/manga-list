import { createClient } from "@/utils/supabase/client";

/**
 * Uploads an image file to Supabase Storage.
 *
 * @param {File} file - The image file to be uploaded.
 * @param {string} path - The path or folder in Supabase storage where the file will be stored.
 * @returns {Promise<string | null>} - The public URL of the uploaded image or null if the upload fails.
 */
export const uploadImageToStorage = async (file: File, path: string): Promise<string | null> => {
  const client = createClient();
  const { data, error } = await client.storage
    .from('manga_image') // Replace with your Supabase storage bucket name
    .upload(`${path}/${file.name}`, file, {
      cacheControl: '3600',
      upsert: false, // Set to true to overwrite existing files with the same name
    });

  if (error) {
    console.error('Image upload failed:', error.message);
    return null;
  }
  const uploadedFile = client.storage
    .from('manga_image')
    .getPublicUrl(`${path}/${file.name}`);

  return uploadedFile.data.publicUrl;
};
