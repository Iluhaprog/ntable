import * as React from "react";
import { Table as TableComponent } from "./Table";
import { TableHeadColumn as TableHeadColumnComponent } from "./TableHeadColumn";
import { TableRow as TableRowComponent } from "./TableRow";

export function useTable<T>(values: T[]) {
  const TableWrapper = React.useMemo(() => TableComponent<T>, []);
  const TableHeadColumn = React.useMemo(() => TableHeadColumnComponent<T>, []);
  const TableRow = React.useMemo(() => TableRowComponent<T>, []);
  const Table = React.useCallback((props: { children: JSX.Element | JSX.Element[]}) => (
    <TableWrapper values={values}>
      {props.children}
    </TableWrapper>
  ), [TableWrapper, values]);


  return {
    Table,
    TableHeadColumn,
    TableRow,
  };
} 