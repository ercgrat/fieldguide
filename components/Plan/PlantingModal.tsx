import { Planting } from '@prisma/client';
import CropSelect from 'components/Crops/CropSelect';
import { Button, Modal } from 'fgui';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

type Props = {
  onClose: () => void;
  onChange: () => void;
};

const PlantingModal: React.FC<Props> = ({ onClose, onChange }) => {
  const intl = useIntl();
  const { control } = useForm<Planting>();

  return (
    <Modal isOpen onClose={onClose} overflow="visible">
      <Modal.Header>
        <FormattedMessage
          defaultMessage="Add Planting"
          description="Title of modal for adding a new planting"
          id="ZTze/u"
        />
      </Modal.Header>
      <Modal.Body overflowY="visible">
        <Controller
          control={control}
          name="cropId"
          render={({ field: { value, onChange: onCropChange } }) => (
            <CropSelect
              label={intl.formatMessage({
                defaultMessage: 'Crop',
                id: 'x47U6n',
                description: 'Label for a select field for a crop when creating a planting'
              })}
              onChange={onCropChange}
              value={value}
            />
          )}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>
          <FormattedMessage
            defaultMessage="Cancel"
            description="Cancel button when creating a new planting"
            id="g4hqbZ"
          />
        </Button>
        <Button onClick={onChange} variant="primary">
          <FormattedMessage
            defaultMessage="Create planting"
            description="Submit button when creating a new planting"
            id="W9dDvR"
          />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlantingModal;
