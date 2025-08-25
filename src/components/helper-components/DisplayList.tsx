import React from "react";
import { Each } from "../custom/Each";
// import { Each } from "./TableList";

type DisplayListProps<T> = {
  data?: T[] | null;
  render: (item: T, index: number) => React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  errorText?: string;
  emptyText?: string;
  className?: string;
};

const DisplayList = <T,>({
  isError,
  isLoading,
  errorText,
  className,
  emptyText,
  data,
  render,
}: DisplayListProps<T>) => {
  return (
    <div className={className}>
      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center">
          <div className="w-6 h-6 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <strong className="text-red-500 text-center">
          {errorText ?? "Something went wrong."}
        </strong>
      )}

      {/* Empty State */}
      {data && !data.length && (
        <em className="text-gray-500 text-sm">{emptyText ?? "No record(s) found"}</em>
      )}

      {/* Data Renderer */}
      <Each data={data ?? []} render={render} />
    </div>
  );
};

export default DisplayList;
