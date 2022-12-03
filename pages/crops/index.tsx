import AddCropModal from 'components/Catalog/AddCropModal';
import { useCropsQuery } from 'fetch/crops';
import { Box, Button, Skeleton, Stack, useDisclosure } from 'fgui';
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
  return (
    <Box p={2}>
      <Button mb={10} onClick={openAddCropModal} ref={addCropButtonRef} variant="primary">
        <FormattedMessage defaultMessage="Add crop" description="Button label for adding crops" />
      </Button>
      {isAddCropModalOpen && <AddCropModal onClose={handleCloseAddCropModal} />}
      <Stack>
        {isLoading && (
          <>
            <Skeleton height={8} mt={2} width="100%" />
            <Skeleton height={8} mt={2} width="100%" />
            <Skeleton height={8} mt={2} width="100%" />
          </>
        )}
        {crops?.map(crop => (
          <div key={crop.id}>{crop.name}</div>
        ))}
      </Stack>
    </Box>
  );
};

export default React.memo(CropsPage);
