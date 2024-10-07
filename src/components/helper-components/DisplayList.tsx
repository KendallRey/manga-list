import { CircularProgress } from "@mui/material";
import React from "react";
import MuiTypography from "../typography/Typograph";
import { Each } from "./TableList";

type IDisplayList<T> = {
  data?: T[] | null;
  render: (item: T, index: number) => React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  errorText?: string;
  emptyText?: string;
  className?: string;
};

const DisplayList = <T,>(props: IDisplayList<T>) => {
  const { isError, isLoading, errorText, className, emptyText, data, render } = props;

  return (
    <>
      {isLoading && <CircularProgress className={`mx-auto ${className ?? ""}`} />}
      {isError && (
        <MuiTypography className={`text-destructive-500 mx-auto text-center ${className ?? ""}`} component={"strong"}>
          {errorText ?? "Something went wrong."}
        </MuiTypography>
      )}
      {data && !data?.length ? (
        <MuiTypography component={"em"} className={className}>
          {emptyText ?? "No record/s found"}
        </MuiTypography>
      ) : (
        <></>
      )}
      <Each data={data ?? []} render={render} />
    </>
  );
};

export default DisplayList;
