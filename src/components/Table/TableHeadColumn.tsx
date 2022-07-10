import * as React from "react";
import * as MUI from "@mui/material";
import { Order, TableContext, TFilterValues } from "./Context";
import { IFilter } from "./Filters/IFilter";

export interface IColumnRenderer {
  value: string;
  setFilter: (value: IFilter<TFilterValues>) => void;
  setSortOrder: (order: Order) => void;
}

export interface ITableColumnProps<T> {
  name: keyof T;
  title: string;
  render?: React.FC<IColumnRenderer>;
}

export function TableHeadColumn<T>(props: ITableColumnProps<T>) {
  const { name, title, render } = props;
  const { addFilter, addSortBy } = React.useContext(TableContext);
  const Wrapper = React.useMemo(() => render || Default, [ render ]);

  const setFilter = React.useCallback((value: IFilter<TFilterValues>) => {
    addFilter(name, value);
  }, [name, addFilter]);

  const setSortBy = React.useCallback((order: Order) => {
    addSortBy(name, order);
  }, [name, addSortBy]);

  return (
    <Wrapper 
      value={title} 
      setFilter={setFilter}
      setSortOrder={setSortBy}
    />
  )
}

function Default(props: IColumnRenderer) {
  const { value } = props;
  return <MUI.TableCell>{ value }</MUI.TableCell>
}