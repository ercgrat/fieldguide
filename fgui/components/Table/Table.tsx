import { TableContainer, Table as ChakraTable, Td, Th } from '@chakra-ui/react';
import { flexRender } from '@tanstack/react-table';
import { Table as TanstackTable } from '@tanstack/table-core';
import React from 'react';
import { Box } from 'fgui';

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
          'thead > tr:first-child, thead > tr:first-child > th:first-child': {
            borderTopLeftRadius: '4px'
          },
          'thead > tr:first-child, thead > tr:first-child > th:last-child': {
            borderTopRightRadius: '4px'
          },
          'tbody > tr:last-child, tbody > tr:last-child > td:first-child': {
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
          const isEven = index % 2 === 0;
          return (
            <tbody key={row.id}>
              <Box as="tr" background={isEven ? 'bark.5' : 'bark.10'}>
                {row.getAllCells().map(cell => (
                  <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
                ))}
              </Box>
            </tbody>
          );
        })}
      </ChakraTable>
    </TableContainer>
  );
};

export default React.memo(TableBase) as unknown as typeof TableBase;
