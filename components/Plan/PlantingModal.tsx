import { Planting } from '@prisma/client';
import CropSelect from 'components/Crops/CropSelect';
import { useOrganization } from 'contexts/organization';
import { Button, HStack, Modal, NumberInput, VStack } from 'fgui';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

type Props = {
  onClose: () => void;
  onChange: () => void;
};

const PlantingModal: React.FC<Props> = ({ onClose, onChange }) => {
  const intl = useIntl();
  const { control } = useForm<Planting>();
  const { bedLengthUnits, inRowSpacingUnits } = useOrganization();

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
        <VStack alignItems="stretch">
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
          <HStack>
            <Controller
              control={control}
              name="bedLength"
              render={({ field: { value, onChange: onBedLengthChange } }) => (
                <NumberInput
                  label={intl.formatMessage(
                    {
                      defaultMessage: 'Bed length ({unit})',
                      id: 'ATHwst',
                      description: 'Label for an input for the bed length of a planting'
                    },
                    { unit: bedLengthUnits }
                  )}
                  onChange={onBedLengthChange}
                  value={value ?? undefined}
                />
              )}
            />
            <Controller
              control={control}
              name="rowsPerPed"
              render={({ field: { value, onChange: onRowsPerBedChange } }) => (
                <NumberInput
                  label={intl.formatMessage({
                    defaultMessage: 'Rows per bed',
                    id: 'GGrpYT',
                    description: 'Label for an input for the rows per bed of a planting'
                  })}
                  onChange={onRowsPerBedChange}
                  value={value ?? undefined}
                />
              )}
            />
            <Controller
              control={control}
              name="inRowSpacing"
              render={({ field: { value, onChange: onInRowSpacingChange } }) => (
                <NumberInput
                  label={intl.formatMessage(
                    {
                      defaultMessage: 'In-row spacing ({unit})',
                      id: 'Q5JeNT',
                      description: 'Label for an input for the in-row spacing of a planting'
                    },
                    { unit: inRowSpacingUnits }
                  )}
                  onChange={onInRowSpacingChange}
                  value={value ?? undefined}
                />
              )}
            />
          </HStack>
        </VStack>
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
