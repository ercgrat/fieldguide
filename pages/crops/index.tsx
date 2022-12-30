'use client';

import { Crop } from '@prisma/client';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import CropActionMenu from 'components/Crops/CropActionMenu';
import CropModal from 'components/Crops/CropModal';
import { useCropsQuery } from 'fetch/crops';
import { Box, Button, Skeleton, Stack, T, Table, useDisclosure } from 'fgui';
import { NextPage } from 'next';
import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

const CropsPage: NextPage = () => {
  const { data: crops, isLoading, refetch } = useCropsQuery();
  const {
    isOpen: isAddCropModalOpen,
    onOpen: openAddCropModal,
    onClose: closeAddCropModal
  } = useDisclosure({
    defaultIsOpen: false
  });
  const handleCropAdded = useCallback(() => {
    closeAddCropModal();
    refetch();
  }, [closeAddCropModal, refetch]);

  const columnHelper = createColumnHelper<Crop>();
  const table = useReactTable<Crop>({
    data: crops ?? [],
    columns: [
      columnHelper.accessor('name', {
        header: () => (
          <T.Label textAlign="left">
            <FormattedMessage
              defaultMessage="Name"
              description="Table column header for the name of a crop"
              id="anzty/"
            />
          </T.Label>
        ),
        cell: c => <T.BodyMd>{c.getValue()}</T.BodyMd>
      }),
      columnHelper.accessor('daysToMaturity', {
        header: () => (
          <T.Label textAlign="right">
            <FormattedMessage
              defaultMessage="Days to Maturity"
              description="Table column header for the days to maturity of a crop"
              id="x/zUnG"
            />
          </T.Label>
        ),
        cell: c => <T.BodyMd textAlign="right">{c.getValue()}</T.BodyMd>
      }),
      columnHelper.accessor('harvestWindow', {
        header: () => (
          <T.Label textAlign="right">
            <FormattedMessage
              defaultMessage="Harvest Window"
              description="Table column header for the harvest window of a crop"
              id="gulkDN"
            />
          </T.Label>
        ),
        cell: c => <T.BodyMd textAlign="right">{c.getValue()}</T.BodyMd>
      }),
      columnHelper.display({
        id: 'action-cell',
        cell: c => (
          <T.BodyMd textAlign="right">
            <CropActionMenu crop={c.row.original} onChange={refetch} />
          </T.BodyMd>
        )
      })
    ],
    getCoreRowModel: getCoreRowModel(),
    getRowId: crop => `${crop.id}`
  });

  return (
    <Box p={2}>
      <Button autoFocus mb={2} onClick={openAddCropModal} variant="primary">
        <FormattedMessage
          defaultMessage="Add crop"
          description="Button label for adding crops"
          id="RraxE6"
        />
      </Button>
      {isAddCropModalOpen && <CropModal onCancel={closeAddCropModal} onChange={handleCropAdded} />}
      <Stack>
        {isLoading && (
          <>
            <Skeleton height={5} mt={2} width="100%" />
            <Skeleton height={5} mt={2} width="100%" />
            <Skeleton height={5} mt={2} width="100%" />
          </>
        )}
        {!isLoading && <Table table={table} />}
      </Stack>
    </Box>
  );
};

export default React.memo(CropsPage);
