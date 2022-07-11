import { TableCell } from '@mui/material';
import React from 'react';
import { Order } from './components/Table/Context';
import { NumberFilter } from './components/Table/Filters/NumberFilter';
import { useTable } from './components/Table/hooks';
import { TableHead } from './components/Table/TableHead';
import { IColumnRenderer } from './components/Table/TableHeadColumn';
import { TablePagination } from './components/Table/TablePagination';
import { ITableCellProps } from './components/Table/TableRow';
import { TableWrapper } from './components/Table/TableWrapper';

interface IData {
  id: number;
  name: string;
  status: "success" | "fail" | "cancel"
}

function App() {
  const [data, setData ] = React.useState<IData[]>([]);
  const [numberValues, setNumberValues] = React.useState<number>(0);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);

  React.useEffect(() => {
    fetch("http://localhost:5000/values/" + page + "/" + limit)
      .then(res => res.json())
      .then(data => {
        setData(data.data)
        setNumberValues(data.numberElements)
      });
  }, [page, limit]);

  const {Table, TableHeadColumn, TableRow} = useTable<IData>();

  return (
    <div>
      <Table values={data} initValuesNumber={numberValues}>
        <TableWrapper>
          <TableHead>
            <TableHeadColumn name="id" title="ID" />
            <TableHeadColumn name="name" title="Name" />
            <TableHeadColumn name="status" title="Status" />
          </TableHead>
          <TableRow 
            id={TColumn<IData>}
            name={TColumn<IData>}
            status={TColumn<IData>}
          />
        </TableWrapper>
        <TablePagination
          onPageChange={setPage}
          onRowsPerPageChange={setLimit}
          initRowsPerPage={10}
          nextButton={NextButton}
          prevButton={PervButton}
          selectRowsPerPage={Select}
        />
      </Table>
    </div>
  );
}

export default App;

function NextButton ({ onClick }: any) {
  return <button onClick={onClick}>next</button>
}

function PervButton ({ onClick }: any) {
  return <button onClick={onClick}>perv</button>
}

function Select ({ onChange }: any) {
  return (
    <select onChange={onChange}>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={15}>15</option>
      <option value={20}>20</option>
      <option value={25}>25</option>

    </select>
  )
}

function TColumn<T>(props: ITableCellProps<T>) {
  const { value } = props;
  return (
    <TableCell>{value + ""}</TableCell>
  )
}