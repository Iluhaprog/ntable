import { Table } from "@mui/material";
import * as React from "react";

export interface ITableWrapperProps {
  children: JSX.Element | JSX.Element[];
}

export function TableWrapper (props: ITableWrapperProps) {
  const { children } = props;

  return (
    <Table>
      {children}
    </Table>
  )
}