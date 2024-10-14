import { removeSpecialChars } from "@/components/helper/string";
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
  MANGA_IMAGE: {
    NAME: "manga_image",
    PATH: "images",
  },
  PROFILE_IMAGE: {
    NAME: "profile",
    PATH: "images",
  },
};

export const uploadMangaImageToStorage = async (
  file: File,
  prefix?: string,
  path?: string,
): Promise<IUploadFileToStorageResponse> => {
  const client = createClient();

  const uploadPath = `${path || STORAGE.MANGA_IMAGE.PATH}/${prefix ? `${prefix}-` : ""}${removeSpecialChars(file.name)}`;

  const { data, error } = await client.storage
    .from(STORAGE.MANGA_IMAGE.NAME) // Replace with your Supabase storage bucket name
    .upload(uploadPath, file, {
      cacheControl: "3600",
      upsert: false, // Set to true to overwrite existing files with the same name
    });

  if (error) {
    return {
      error: error,
    };
  }
  const uploadedFile = client.storage.from(STORAGE.MANGA_IMAGE.NAME).getPublicUrl(uploadPath);

  return {
    data: {
      ...data,
      publicUrl: uploadedFile.data.publicUrl,
    },
  };
};

// const STORAGE = {
//   NAME: "manga_image",
//   PATH: "images",
// };

export const uploadProfileImageToStorage = async (
  file: File,
  prefix?: string,
  path?: string,
): Promise<IUploadFileToStorageResponse> => {
  const client = createClient();

  const uploadPath = `${path || STORAGE.PROFILE_IMAGE.PATH}/${prefix ? `${prefix}-` : ""}${removeSpecialChars(file.name)}`;

  const { data, error } = await client.storage
    .from(STORAGE.PROFILE_IMAGE.NAME) // Replace with your Supabase storage bucket name
    .upload(uploadPath, file, {
      cacheControl: "3600",
      upsert: false, // Set to true to overwrite existing files with the same name
    });

  if (error) {
    return {
      error: error,
    };
  }
  const uploadedFile = client.storage.from(STORAGE.PROFILE_IMAGE.NAME).getPublicUrl(uploadPath);

  return {
    data: {
      ...data,
      publicUrl: uploadedFile.data.publicUrl,
    },
  };
};
