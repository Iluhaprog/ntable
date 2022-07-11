import { SelectChangeEvent } from "@mui/material";
import * as React from "react";
import { TableContext } from "./Context";

export interface ITablePaginationProps {
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  initRowsPerPage: number;
  nextButton: React.FC<{ onClick: () => void }>,
  prevButton: React.FC<{ onClick: () => void }>,
  selectRowsPerPage: React.FC<{onChange: (e: SelectChangeEvent) => void}>,
}

export function TablePagination (props: ITablePaginationProps) {
  const {
    onPageChange = () => {},
    onRowsPerPageChange = () => {},
    initRowsPerPage, 
    nextButton, 
    prevButton, 
    selectRowsPerPage 
  } = props;

  const {
    page,
    rowsPerPage,
    nextPage,
    pervPage,
    changeRowsPerPage,
  } = React.useContext(TableContext);

  const NextButton = React.useMemo(() => nextButton, [nextButton]);
  const PrevButton = React.useMemo(() => prevButton, [prevButton]);
  const Select = React.useMemo(() => selectRowsPerPage, [selectRowsPerPage]);

  React.useEffect(() => {
    changeRowsPerPage(initRowsPerPage);
  }, [])

  React.useEffect(() => {
    onPageChange(page);
  }, [page, onPageChange]);

  React.useEffect(() => {
    onRowsPerPageChange(rowsPerPage)
  }, [rowsPerPage, onRowsPerPageChange]);

  return (
    <div>
      <NextButton onClick={pervPage} />
      <PrevButton onClick={nextPage} />
      <Select onChange={(e: SelectChangeEvent) => changeRowsPerPage(+e?.target?.value)} />
    </div>
  )
}