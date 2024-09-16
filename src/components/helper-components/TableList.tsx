import React, { ReactNode } from "react";
import { MuiTd, MuiTr } from "../table/Table";
import { Skeleton } from "@mui/material";

type ITableList<T> = {
  isLoading: boolean;
  isError?: boolean;
  errorText?: string | null;
  errorNode?: React.ReactNode;
  emptyDataText?: string;
  emptyDataNode?: React.ReactNode;
  data?: T[] | null;
  colSpan: number;
  onRefresh?: () => void;
  render: (data: T, index: number) => React.ReactNode;
};

const TableList = <T,>(props: ITableList<T>) => {
  const {
    isLoading,
    errorText = "Fetching list failed",
    isError,
    data = [],
    emptyDataText,
    emptyDataNode,
    colSpan,
    onRefresh,
    render,
  } = props;

  if (isError)
    return (
      <MuiTr>
        <MuiTd colSpan={colSpan}>{emptyDataNode ?? errorText}</MuiTd>
      </MuiTr>
    );

  if (isLoading)
    return (
      <MuiTr>
        <MuiTd colSpan={colSpan}>
          <Skeleton height={56} />
        </MuiTd>
      </MuiTr>
    );

  if (!data?.length)
    return (
      <MuiTr>
        <MuiTd colSpan={colSpan}>{emptyDataNode ?? emptyDataText}</MuiTd>
      </MuiTr>
    );

  return <Each data={data ?? []} render={render} />;
};

export default TableList;

type EachProps<T> = {
  render: (data: T, index: number) => ReactNode;
  data?: T[];
};

const Each = <T,>({ render, data }: EachProps<T>) => (
  <>{React.Children.toArray(data?.map((item, index) => render(item, index)))}</>
);
