import { TableContainer, Table as ChakraTable, Th } from '@chakra-ui/react';
import { flexRender } from '@tanstack/react-table';
import { Table as TanstackTable } from '@tanstack/table-core';
import TableRow from './TableRow';

type Props<TData> = {
  table: TanstackTable<TData>;
};

const TableBase = <TData = unknown,>({ table }: Props<TData>) => {
  const rows = table.getRowModel().rows;
  if (!rows.length) {
    return null;
  }

  return (
    <TableContainer>
      <ChakraTable
        sx={{
          'thead > tr:first-of-type, thead > tr:first-of-type > th:first-of-type': {
            borderTopLeftRadius: '4px'
          },
          'thead > tr:first-of-type, thead > tr:first-of-type > th:last-child': {
            borderTopRightRadius: '4px'
          },
          'tbody > tr:last-child, tbody > tr:last-child > td:first-of-type': {
            borderBottomLeftRadius: '4px'
          },
          'tbody > tr:last-child, tbody > tr:last-child > td:last-child': {
            borderBottomRightRadius: '4px'
          },
          td: {
            border: 'none'
          },
          th: {
            borderColor: 'bark.20'
          }
        }}
      >
        {table.getHeaderGroups().map(headerGroup => (
          <thead key={headerGroup.id}>
            <tr>
              {headerGroup.headers.map(header => (
                <Th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </Th>
              ))}
            </tr>
          </thead>
        ))}
        {rows.map((row, index) => {
          return (
            <tbody key={row.id}>
              <TableRow index={index} row={row} />
            </tbody>
          );
        })}
      </ChakraTable>
    </TableContainer>
  );
};

export default TableBase;
