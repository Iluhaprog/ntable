import * as React from "react";
import * as MUI from "@mui/material";
import { IFilters, Order, TableContext, TFilterValues, TKey, TSortBy } from "./Context";
import { IFilter } from "./Filters/IFilter";


export interface ITableProps<T> {
  values: T[];
  children: JSX.Element | JSX.Element[];
  initRowsPerPage?: number;
  initValuesNumber?: number;
}

export function Table<T>(props: ITableProps<T>) {
  const { 
    children,
    initRowsPerPage,
    initValuesNumber,
    values: currentValues,
  } = props;
  const [filters, setFilter] = React.useState<IFilters>({});
  const [sortBy, setSortBy] = React.useState<TSortBy>({ key: "", order: Order.ASC });
  const [valuesNumber, setValuesNumber] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(0);
  const [values, setValues] = React.useState(currentValues);

  React.useEffect(() => {
    setValuesNumber(initValuesNumber || values.length);
  }, [initValuesNumber, values]);

  React.useEffect(() => {
    setRowsPerPage(initRowsPerPage || 10);
  }, [initRowsPerPage]);

  React.useEffect(() => {
    setValues(currentValues);
  }, [setValues, currentValues]);

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
    if (value <= valuesNumber) {
      setRowsPerPage(value);
    }
  }, [setRowsPerPage, valuesNumber]);

  const changeValuesNumber = React.useCallback((value: number) => {
    setValuesNumber(value);
  }, [setValuesNumber])

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
        changeRowsPerPage,
        changeValuesNumber
      }}
    >
      <MUI.TableContainer>
        { children }
      </MUI.TableContainer>
    </TableContext.Provider>
  )
}