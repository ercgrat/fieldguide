import { Crop } from '@prisma/client';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import AddCropModal from 'components/Catalog/AddCropModal';
import { useCropsQuery } from 'fetch/crops';
import { Box, Button, Skeleton, Stack, T, Table, useDisclosure } from 'fgui';
import { NextPage } from 'next';
import React, { useCallback, useRef } from 'react';
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
  const addCropButtonRef = useRef<HTMLButtonElement>(null);
  const handleCloseAddCropModal = useCallback(() => {
    closeAddCropModal();
    refetch();
    setTimeout(() => {
      addCropButtonRef.current?.focus();
    });
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
      })
    ],
    getCoreRowModel: getCoreRowModel(),
    getRowId: crop => `${crop.id}`
  });

  return (
    <Box p={2}>
      <Button mb={2} onClick={openAddCropModal} ref={addCropButtonRef} variant="primary">
        <FormattedMessage
          defaultMessage="Add crop"
          description="Button label for adding crops"
          id="RraxE6"
        />
      </Button>
      {isAddCropModalOpen && <AddCropModal onClose={handleCloseAddCropModal} />}
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
