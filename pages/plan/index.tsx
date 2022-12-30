import PlantingModal from 'components/Plan/PlantingModal';
import { Box, Button, useDisclosure } from 'fgui';
import { NextPage } from 'next';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const Plan: NextPage = () => {
  const {
    isOpen: isPlantingModalOpen,
    onClose: onClosePlantingModal,
    onOpen: onOpenPlantingModal
  } = useDisclosure({ defaultIsOpen: false });
  return (
    <Box p={2}>
      <Button onClick={onOpenPlantingModal} variant="primary">
        <FormattedMessage
          defaultMessage="Add planting"
          description="Button caption for adding a new planting"
          id="cTJ0QJ"
        />
      </Button>
      {isPlantingModalOpen && (
        <PlantingModal onChange={onClosePlantingModal} onClose={onClosePlantingModal} />
      )}
    </Box>
  );
};

export default React.memo(Plan);
