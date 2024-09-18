import { createClient } from "@/utils/supabase/client";

/**
 * Uploads an image file to Supabase Storage.
 *
 * @param {File} file - The image file to be uploaded.
 * @param {string} path - The path or folder in Supabase storage where the file will be stored.
 * @param {string} prefix - Prefix for the file name.
 * @returns {Promise<string | null>} - The public URL of the uploaded image or null if the upload fails.
 */

const STORAGE = {
  NAME: "manga_image",
  PATH: "images",
};

export const uploadMangaImageToStorage = async (
  file: File,
  prefix?: string,
  path?: string,
): Promise<IUploadFileToStorageResponse> => {
  const client = createClient();

  const uploadPath = `${path || STORAGE.PATH}/${prefix ? `${prefix}-` : ""}${file.name}`;

  const { data, error } = await client.storage
    .from(STORAGE.NAME) // Replace with your Supabase storage bucket name
    .upload(uploadPath, file, {
      cacheControl: "3600",
      upsert: false, // Set to true to overwrite existing files with the same name
    });

  if (error) {
    return {
      error: error,
    };
  }
  const uploadedFile = client.storage.from(STORAGE.NAME).getPublicUrl(uploadPath);

  return {
    data: {
      ...data,
      publicUrl: uploadedFile.data.publicUrl,
    },
  };
};
