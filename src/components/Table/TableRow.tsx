import * as React from "react";
import * as MUI from "@mui/material";
import { IFilters, Order, TableContext, TSortBy } from "./Context";

export interface ITableCellProps<T> {
  value: T[keyof T];
}

export type ITableRowProps<T> = {
  [key in keyof T]: React.FC<ITableCellProps<T>>
}

export function TableRow<T extends Object>(props: ITableRowProps<T>) {
  const { values, filters, sortBy, page, rowsPerPage } = React.useContext(TableContext);
  
  const filteredRows: T[] = React.useMemo(() => values
    .slice((page - 1) * rowsPerPage, page * rowsPerPage)
    .filter((row) => applyFilters(row, filters))
    .sort((a: T, b: T) => applySortBy<T>(a, b, sortBy))
    , [values, filters, sortBy, page, rowsPerPage]);

  return (
    <MUI.TableBody>
      {
        filteredRows.map((row: T, index: number) => {
          const columns = Reflect.ownKeys(row);

          return (
            <MUI.TableRow key={Object.values(row).join("-") + index}>
              {
                columns.map((column, index) => {
                  const Column = props[column as keyof T] as React.FC<{ value: any }>;
                  return <Column key={index + Object.values(row).join("|") + index} value={row[column as keyof T]} />
                })
              }
            </MUI.TableRow>
          );
        })
      }
    </MUI.TableBody>
  )
}

function applyFilters<T extends Object>(row: T, filters: IFilters) {
  const columns = Object.keys(filters);

  for (const column of columns) {
    if (!filters[column].check(row[column as keyof T] as any)) {
      return false;
    }
  }

  return true;
}

function applySortBy<T>(a: T, b: T, sortBy: TSortBy): 1 | -1 | 0 {
  if (sortBy.key === "") return 0;

  const key = sortBy.key as keyof T;
  if (a[key] < b[key]) {
    return sortBy.order === Order.ASC ? -1 : 1;
  }
  if (a[key] > b[key]) {
    return sortBy.order === Order.ASC ? 1 : -1;
  }

  return 0;
}