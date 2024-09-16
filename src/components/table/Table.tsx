"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Table, { TableProps } from "@mui/material/Table";
import TableCell, { TableCellProps, tableCellClasses } from "@mui/material/TableCell";
import TableContainer, { TableContainerProps } from "@mui/material/TableContainer";
import TableRow, { TableRowTypeMap } from "@mui/material/TableRow";
import {
  Box,
  PaginationProps,
  TableBody,
  TableBodyProps,
  TableHead,
  TableHeadProps,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import MuiPagination from "../pagination/Pagination";

const CustomMuiTd = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

type IMuiTd = {
  right?: boolean;
  left?: boolean;
} & TableCellProps;

export const MuiTd: React.FC<IMuiTd> = (props) => {
  const { right, left, ...otherProps } = props;
  return <CustomMuiTd align={right ? "right" : left ? "left" : "justify"} {...otherProps} />;
};

export const MuiTh: React.FC<IMuiTd> = (props) => {
  const { right, left, ...otherProps } = props;
  return <CustomMuiTd sx={{ fontWeight: 700 }} align={right ? "right" : left ? "left" : "justify"} {...otherProps} />;
};

type IMuiSortTh = {
  ordering?: IOrdering;
  name: string;
  onClick: (name: string) => void;
} & Omit<IMuiTd, "onClick">;

type IMuiTr = {
  children?: React.ReactNode;
} & Omit<OverridableComponent<TableRowTypeMap<{}, "tr">>, "children"> &
  React.ComponentPropsWithoutRef<"tr">;

export const MuiSortTh: React.FC<IMuiSortTh> = (props) => {
  const { name, ordering, children, onClick, ...otherProps } = props;
  const { orderBy, order } = ordering || {};
  return (
    <MuiTh sortDirection={orderBy === name ? order : false} {...otherProps}>
      <TableSortLabel
        data-testid={"table-th-sort"}
        active={orderBy === name}
        direction={orderBy === name ? order || "asc" : "asc"}
        onClick={() => onClick(name)}
      >
        {children}
        {orderBy === name ? (
          <Box component="span" sx={visuallyHidden}>
            {order === "desc" ? "sorted descending" : "sorted ascending"}
          </Box>
        ) : null}
      </TableSortLabel>
    </MuiTh>
  );
};

const StyledMuiHeadTr = styled(TableRow)(({ theme }) => ({
  "& th": {
    fontWeight: 600,
    color: "#7c8ca1",
  },
}));

export const MuiHeadTr: React.FC<IMuiTr> = (props) => {
  return <StyledMuiHeadTr {...props} data-testid="table-tr" />;
};

const StyledMuiHeadTrVar = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#e1e7ef",
  "& th": {
    color: "#7c8ca1",
  },
}));

export const MuiHeadTrVar: React.FC<IMuiTr> = (props) => {
  return <StyledMuiHeadTrVar {...props} data-testid="table-tr" />;
};

const StyledMuiTr = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const MuiTr: React.FC<IMuiTr> = (props) => {
  return <StyledMuiTr {...props} data-testid="table-tr" />;
};

type IMuiTableHead = TableHeadProps;

export const MuiTableHead: React.FC<IMuiTableHead> = (props) => {
  return <TableHead {...props} />;
};

type IMuiTableBody = TableBodyProps;

export const MuiTableBody: React.FC<IMuiTableBody> = (props) => {
  return <TableBody {...props} />;
};

type IMuiTable = {
  containerProps?: TableContainerProps;
  paginationProps?: PaginationProps;
  colsWidth?: (string | number | IColGroupItem)[];
} & TableProps;

const MuiTable: React.FC<IMuiTable> = (props) => {
  const { containerProps, children, paginationProps, colsWidth, ...cleanProps } = props;
  return (
    <>
      <TableContainer {...containerProps}>
        <Table sx={{ minWidth: 700 }} data-testid={"table"} {...cleanProps}>
          {colsWidth && <ColGroup sizes={colsWidth} />}
          {children}
        </Table>
      </TableContainer>
      <div onClick={(e) => e.stopPropagation()}>{paginationProps && <MuiPagination {...paginationProps} />}</div>
    </>
  );
};

export default MuiTable;

type IColGroupItem = {
  w?: number | string;
  min?: number;
};

type IColGroupSize = (string | number | IColGroupItem)[];

type IColGroups = {
  sizes: IColGroupSize;
};

export const ColGroup: React.FC<IColGroups> = ({ sizes }) => {
  return (
    <colgroup>
      {sizes.map((col, i) => {
        if (typeof col === "number" || typeof col === "string") return <col key={i} style={{ width: col }} />;
        return <col key={i} style={{ width: col.w, minWidth: col.min }} />;
      })}
    </colgroup>
  );
};