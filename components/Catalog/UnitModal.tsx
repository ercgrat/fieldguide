import { Unit } from '@prisma/client';
import { useOrganization } from 'contexts/organization';
import { useCreateUnitMutation } from 'fetch/units';
import { Button, Modal, TextInput, VStack } from 'fgui';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { APIRequestBody } from 'types/backend';

type Props = {
  unit?: Partial<Unit>;
  onClose: () => void;
  onChange: (unit: Unit) => void;
};
const UnitModal: React.FC<Props> = ({ unit, onClose, onChange }) => {
  const intl = useIntl();
  const {
    organization: { id: organizationId }
  } = useOrganization();
  const {
    register,
    handleSubmit: handleSubmitWrapper,
    watch
  } = useForm<APIRequestBody.UnitCreate>({
    defaultValues: {
      ...unit,
      organizationId
    }
  });
  const name = watch('name');
  const abbreviation = watch('abbreviation');
  const isSubmitEnabled = !!name && !!abbreviation;
  const { mutate } = useCreateUnitMutation({
    onSuccess: newUnit => {
      onChange(newUnit);
    }
  });

  const handleSubmit = useCallback(
    (newUnit: APIRequestBody.UnitCreate) => {
      mutate(newUnit);
    },
    [mutate]
  );

  return (
    <Modal isOpen onClose={onClose}>
      <Modal.Header>
        <FormattedMessage
          defaultMessage="Add Unit"
          id="HpifGk"
          description="Title of modal for creating a new unit"
        />
      </Modal.Header>
      <Modal.Body>
        <VStack alignItems="stretch">
          <TextInput
            label={intl.formatMessage({
              defaultMessage: 'Name',
              id: 'SWaZzM',
              description: 'Label of the name text input when creating a unit'
            })}
            placeholder={intl.formatMessage({
              defaultMessage: 'e.g. pounds, kilograms',
              id: 'FElmYe',
              description: 'Placeholder text for unit name input in unit creation modal'
            })}
            {...register('name')}
          />
          <TextInput
            label={intl.formatMessage({
              defaultMessage: 'Abbreviation',
              id: 'oHL5n5',
              description: 'Label of the abbreviation text input when creating a unit'
            })}
            placeholder={intl.formatMessage({
              defaultMessage: 'e.g. lb, kg',
              id: 'UuaWLm',
              description: 'Placeholder text for unit abbreivation input in unit creation modal'
            })}
            {...register('abbreviation')}
          />
        </VStack>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>
          <FormattedMessage
            defaultMessage="Cancel"
            id="wiRzl+"
            description="Label for button to cancel creating a unit"
          />
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmitWrapper(handleSubmit)}
          isDisabled={!isSubmitEnabled}
        >
          {!isSubmitEnabled ? (
            <FormattedMessage
              defaultMessage="Create unit"
              id="ggmJHj"
              description="Label for submit button on create unit modal"
              values={{
                unit: name,
                abbreviation: abbreviation
              }}
            />
          ) : (
            <FormattedMessage
              defaultMessage="Create ''{unit} ({abbreviation})''"
              id="Pq4erR"
              description="Label for submit button on create unit modal"
              values={{
                unit: name,
                abbreviation: abbreviation
              }}
            />
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(UnitModal);
