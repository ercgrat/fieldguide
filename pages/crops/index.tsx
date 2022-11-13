import { Button, Skeleton, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AddCropModal from 'components/Catalog/AddCropModal';
import { useCropsQuery } from 'fetch/crops';
import { NextPage } from 'next';
import React, { useCallback, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

const CropsPage: NextPage = () => {
  const { data: crops, isLoading } = useCropsQuery();
  const [isAddCropModalOpen, { open: openAddCropModal, close: closeAddCropModal }] =
    useDisclosure(false);
  const addCropButtonRef = useRef<HTMLButtonElement>(null);
  const handleCloseAddCropModal = useCallback(() => {
    closeAddCropModal();
    setTimeout(() => {
      addCropButtonRef.current?.focus();
    });
  }, [closeAddCropModal]);
  return (
    <>
      <Button mb={10} onClick={openAddCropModal} ref={addCropButtonRef}>
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
    </>
  );
};

export default React.memo(CropsPage);
