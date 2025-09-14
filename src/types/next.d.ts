type NextPage = {
  params?: Promise<Record<string, unknown>>;
  searchParams?: Promise<{ q?: string } & Record<string, unknown>>;
};

type LayoutProps<T extends string> = {
  children?: ReactNode;
  [T]: string;
};
type PageProps<T extends string> = {
  params?: Record<string, unknown>;
  searchParams?: { q?: string } & Record<string, unknown>;
  [T]: string;
};
