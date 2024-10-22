import { headers } from "next/headers";

export const getHeaders = () => {
  const headerList = headers();
  const _searchParams = headerList.get("searchParams");
  const searchParams = new URLSearchParams(_searchParams ?? "");

  return {
    searchParams,
  };
};
