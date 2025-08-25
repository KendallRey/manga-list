import React from "react";

type EachProps<T> = {
  data: T[] | null | undefined;
  render: (item: T, index: number) => React.ReactNode;
  empty?: React.ReactNode; // optional fallback when no data
};

export function Each<T>({ data, render, empty }: EachProps<T>) {
  if (!data || data.length === 0) {
    return <>{empty ?? null}</>;
  }

  return <>{data.map((item, index) => render(item, index))}</>;
}
