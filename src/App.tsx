import { TableCell } from '@mui/material';
import React from 'react';
import { Order } from './components/Table/Context';
import { NumberFilter } from './components/Table/Filters/NumberFilter';
import { useTable } from './components/Table/hooks';
import { TableHead } from './components/Table/TableHead';
import { IColumnRenderer, ITableColumnProps } from './components/Table/TableHeadColumn';
import { ITableCellProps } from './components/Table/TableRow';

interface Row {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  status: "success" | "wait" | "fail"; 
}

interface Test {
  col1: string;
  col2: string;
  col3: number;
}

function App() {
  const values = React.useMemo<Row[]>(() => ([
    { id: 1, firstName: "name1", lastName: "last1", age: 11, status: "success" },
    { id: 2, firstName: "name2", lastName: "last2", age: 13, status: "fail" },
    { id: 3, firstName: "name3", lastName: "last3", age: 15, status: "success" },
    { id: 4, firstName: "name4", lastName: "last4", age: 22, status: "wait" },
    { id: 5, firstName: "name5", lastName: "last5", age: 16, status: "fail" },
    { id: 6, firstName: "name6", lastName: "last6", age: 11, status: "success" },
    { id: 7, firstName: "name7", lastName: "last7", age: 11, status: "fail" },
    { id: 8, firstName: "name8", lastName: "last8", age: 23, status: "success" },
    { id: 9, firstName: "name9", lastName: "last9", age: 10, status: "success" },
    { id: 10, firstName: "name10", lastName: "last10", age: 26, status: "wait" },
  ]), []);

  const values2 = React.useMemo<Test[]>(() => ([
    { col1: "col-val-1", col2: "col-val-1", col3: 1 },
    { col1: "col-val-2", col2: "col-val-2", col3: 2 },
    { col1: "col-val-3", col2: "col-val-3", col3: 3 },
    { col1: "col-val-4", col2: "col-val-4", col3: 4 },
  ]), []);

  const { Table: Table1, TableHeadColumn: TableHeadColumn1, TableRow: TableRow1 } = useTable<Row>(values);
  const { Table: Table2, TableHeadColumn: TableHeadColumn2, TableRow: TableRow2 } = useTable<Test>(values2);


  return (
    <div>
      <Table1>
        <TableHead>
          <TableHeadColumn1 name="id" title="User Id" render={HeadRenderer} />
          <TableHeadColumn1 name="firstName" title="First Name" />
          <TableHeadColumn1 name="lastName" title="Last Name" />
          <TableHeadColumn1 name="age" title="Age" render={AgeHeadRenderer} />
          <TableHeadColumn1 name="status" title="Status" />
        </TableHead>
        <TableRow1
          id={({ value }: any ) => <TableCell>{value}</TableCell>}
          firstName={({ value }: any ) => <TableCell>{value}</TableCell>}
          lastName={({ value }: any ) => <TableCell>{value}</TableCell>}
          age={TColumn}
          status={({ value }: any ) => <TableCell>{value}</TableCell>}
        />
      </Table1>

      <Table2>
        <TableHead>
          <TableHeadColumn2 name="col1" title="Column1" />
          <TableHeadColumn2 name="col2" title="Column2" />
          <TableHeadColumn2 name="col3" title="Column3" />
        </TableHead>
        <TableRow2 
          col1={({ value }: any ) => <TableCell>{value}</TableCell>}
          col2={({ value }: any ) => <TableCell>{value}</TableCell>}
          col3={({ value }: any ) => <TableCell>{value}</TableCell>}
        />
      </Table2>
    </div>
  );
}

export default App;

function HeadRenderer(props: IColumnRenderer) {
  const { value, setSortOrder } = props;

  const [order, setOrder] = React.useState(Order.ASC);

  const onClick = React.useCallback(() => {
    if (order === Order.ASC) {
      setSortOrder(Order.DESC);
      setOrder(Order.DESC);
    } else {
      setSortOrder(Order.ASC);
      setOrder(Order.ASC);
    }
  }, [order, setOrder, setSortOrder])

  return (
    <TableCell>
      <button onClick={onClick}>
        {value}{order === Order.ASC ? "+" : "-"}
      </button>
    </TableCell>
  )
}


function AgeHeadRenderer(props: IColumnRenderer) {
  const { value, setFilter } = props;

  return (
    <TableCell>
      {value}
      <input 
        placeholder='Age'
        onChange={(e) => setFilter(new NumberFilter(+e.target.value))}      
      />
    </TableCell>
  )
}

function TColumn<T>(props: ITableCellProps<T>) {
  const { value } = props;
  return (
    <TableCell>{value + " $"}</TableCell>
  )
}