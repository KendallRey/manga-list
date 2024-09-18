import { getSignedUrlServer } from "@/utils/supabase/helper/server-storage";
import Image from "next/image";
import React from "react";

type IImagaServer = {
  path?: string | null;
  alt: string;
  w?: number;
  h?: number;
};

const ImagaServer: React.FC<IImagaServer> = async (props) => {
  const { path, alt, w, h } = props;
  const response = await getSignedUrlServer(path);
  return (
    <Image
      src={response?.data?.signedUrl || ""}
      alt={alt}
      width={w ?? 400}
      height={h ?? 600}
      loading="lazy"
      style={{ objectFit: "contain" }}
    />
  );
};

export default ImagaServer;
