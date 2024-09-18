import { useCallOnce } from "@/components/hooks/useCallOnce";
import { getSignedUrlClient } from "@/utils/supabase/helper/client-storage";
import Image from "next/image";
import React, { useCallback, useState } from "react";

type IImageClient = {
  path?: string | null;
  alt: string;
  w?: number;
  h?: number;
};

const ImageClient: React.FC<IImageClient> = (props) => {
  const { path, alt, w, h } = props;
  const [src, setSrc] = useState<string>();

  const getSignedUrl = useCallback(async () => {
    const response = await getSignedUrlClient(path);
    setSrc(response?.data?.signedUrl);
  }, [path]);

  useCallOnce(getSignedUrl);

  return <Image src={src || ""} alt={alt} width={w ?? 400} height={h ?? 600} loading="lazy" />;
};

export default ImageClient;
