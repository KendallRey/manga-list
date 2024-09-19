"use client";

import supabaseImageLoader from "@/utils/supabase/loader/loader";
import Image from "next/image";
import React from "react";

type ISupabasePublicImage = {
  path?: string | null;
  alt: string;
  w?: number;
  h?: number;
};

const SupabasePublicImage: React.FC<ISupabasePublicImage> = async (props) => {
  const { path, alt, w, h } = props;

  return (
    <Image
      loader={supabaseImageLoader}
      src={path || ""}
      alt={alt}
      width={w ?? 400}
      height={h ?? 600}
      loading="lazy"
      style={{ objectFit: "contain" }}
    />
  );
};

export default SupabasePublicImage;
