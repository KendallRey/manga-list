"use client";

import supabaseImageLoader from "@/utils/supabase/loader/loader";
import Image from "next/image";
import React from "react";
import { toBucketPublicBlurUrl } from "../../helper/image";

type ISupabasePublicImage = {
  path?: string | null;
  alt: string;
  w?: number;
  h?: number;
};

const SupabasePublicImage: React.FC<ISupabasePublicImage> = (props) => {
  const { path, alt, w, h } = props;

  if (!path)
    return (
      <Image
        src={"/images/404.jpg"}
        alt={alt}
        width={w ?? 400}
        height={h ?? 600}
        loading="lazy"
        style={{ objectFit: "contain" }}
      />
    );

  return (
    <Image
      loader={supabaseImageLoader}
      src={path || ""}
      alt={alt}
      width={w ?? 400}
      height={h ?? 600}
      loading="lazy"
      blurDataURL={toBucketPublicBlurUrl(path)}
      style={{ objectFit: "contain" }}
    />
  );
};

export default SupabasePublicImage;
