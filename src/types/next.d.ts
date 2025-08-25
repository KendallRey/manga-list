type INextPage = {
  params?: Promise<Record<string, unknown>>;
  searchParams?: Promise<{ q?: string } & Record<string, unknown>>;
};
