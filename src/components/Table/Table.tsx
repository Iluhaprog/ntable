import * as React from "react";
import * as MUI from "@mui/material";
import { IFilters, Order, TableContext, TFilterValues, TKey, TSortBy } from "./Context";
import { IFilter } from "./Filters/IFilter";


export interface ITableProps<T> {
  values: T[];
  children: JSX.Element | JSX.Element[];
}

export function Table<T>(props: ITableProps<T>) {
  const { 
    children, 
    values,
  } = props;
  const [filters, setFilter] = React.useState<IFilters>({});
  const [sortBy, setSortBy] = React.useState<TSortBy>({ key: "", order: Order.ASC });
  const [valuesNumber] = React.useState(values.length);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(0);

  const addFilter = React.useCallback((key: TKey, value: IFilter<TFilterValues>) => {
    setFilter({...filters, [key]: value});
  }, [filters, setFilter]);

  const addSortBy = React.useCallback((key: TKey, order = Order.ASC) => {
    setSortBy({ key, order });
  }, [setSortBy]);

  const nextPage = React.useCallback(() => {
    if (page * rowsPerPage < valuesNumber) {
      setPage(page + 1);
    }
  }, [page, setPage, rowsPerPage, valuesNumber]);

  const pervPage = React.useCallback(() => {
    if (page - 1 > 0) {
      setPage(page - 1);
    }
  }, [page, setPage]);

  const changeRowsPerPage = React.useCallback((value: number) => {
    if (rowsPerPage <= valuesNumber) {
      setRowsPerPage(value);
    }
  }, [rowsPerPage, setRowsPerPage, valuesNumber]);

  return (
    <TableContext.Provider value={{
        page,
        rowsPerPage,
        valuesNumber,
        values, 
        sortBy,
        filters, 
        addFilter,
        addSortBy,
        nextPage,
        pervPage,
        changeRowsPerPage
      }}
    >
      <MUI.TableContainer>
        <MUI.Table>
          { children }
        </MUI.Table>
      </MUI.TableContainer>
    </TableContext.Provider>
  )
}