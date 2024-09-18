export const SUPABASE = {
  BUCKET: {
    NAME: process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME || "bucket",
    EXPIRES_IN: Number(process.env.NEXT_PUBLIC_SUPABASE_BUCKET_SIGNED_URL_EXPIRES_IN) || 3600,
  },
};
