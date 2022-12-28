import { Td, Tr } from '@chakra-ui/react';
import { flexRender, Row } from '@tanstack/react-table';
import React from 'react';

const TableRow = <TData,>(props: { row: Row<TData>; index: number }) => {
  const { index, row } = props;
  const isEven = index % 2 === 0;
  return (
    <Tr background={isEven ? 'bark.5' : 'bark.10'}>
      {row.getAllCells().map(cell => (
        <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
      ))}
    </Tr>
  );
};

export default React.memo(TableRow) as typeof TableRow;
