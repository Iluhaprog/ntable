import * as React from "react";
import { Table as TableComponent } from "./Table";
import { TableHeadColumn as TableHeadColumnComponent } from "./TableHeadColumn";
import { TableRow as TableRowComponent } from "./TableRow";

export function useTable<T>() {
  const Table = React.useMemo(() => TableComponent<T>, []);
  const TableHeadColumn = React.useMemo(() => TableHeadColumnComponent<T>, []);
  const TableRow = React.useMemo(() => TableRowComponent<T>, []);


  return {
    Table,
    TableHeadColumn,
    TableRow,
  };
} 