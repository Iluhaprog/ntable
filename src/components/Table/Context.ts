import * as React from "react";
import { IFilter } from "./Filters/IFilter";

export type TPrimitive = number | string | Date;

export interface IRange { 
  from: TPrimitive, 
  to: TPrimitive 
}

export type TFilterValues = TPrimitive | IRange;
export type TKey = number | string | symbol; 

export enum Order {
  ASC,
  DESC
}

export type TSortBy = { key: TKey, order: Order };

export interface IFilters {
  [key: TKey]: IFilter<TFilterValues>;
}

export interface ITableContext {
  values: any[];
  rowsPerPage: number;
  page: number;
  valuesNumber: number;
  filters: IFilters;
  sortBy: TSortBy;
  addFilter: (key: TKey, value: IFilter<TFilterValues>) => void;
  addSortBy: (key: TKey, order?: Order) => void;
  nextPage: () => void;
  pervPage: () => void;
  changeRowsPerPage: (value: number) => void;
  changeValuesNumber: (value: number) => void;
}

export const TableContext = React.createContext<ITableContext>({
  values: [],
  rowsPerPage: 0,
  page: 1,
  valuesNumber: 1,
  filters: {},
  sortBy: { key: "", order: Order.ASC },
  addFilter: (key: TKey, value: IFilter<TFilterValues>) => {},
  addSortBy: (key: TKey, order = Order.ASC) => {},
  nextPage: () => {},
  pervPage: () => {},
  changeRowsPerPage: (value: number) => {},
  changeValuesNumber: (value: number) => {}
});