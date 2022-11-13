import { Button, Group, Modal, NumberInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCreateCropMutation } from 'fetch/crops';
import { useCurrentOrganizationsQuery } from 'fetch/organizations';
import React, { useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { APIRequestBody } from 'types/backend';

type Props = {
  onClose: () => void;
};
const AddCropModal: React.FC<Props> = ({ onClose }) => {
  const intl = useIntl();
  const { data: organizations } = useCurrentOrganizationsQuery();
  const organizationId = organizations?.[0]?.id ?? 0;
  const { values, getInputProps } = useForm<APIRequestBody.CreateCrop>({
    initialValues: {
      name: ''
    }
  });
  const { mutate } = useCreateCropMutation();
  const handleSubmit = useCallback(() => {
    mutate({ ...values, organizationId });
  }, [mutate, organizationId, values]);

  return (
    <Modal
      onClose={onClose}
      opened
      title={intl.formatMessage({
        defaultMessage: 'Add crop',
        description: 'Title of a modal for adding crops to your catalog'
      })}
      trapFocus
    >
      <TextInput
        data-autofocus
        required
        {...getInputProps('name')}
        label={intl.formatMessage({
          defaultMessage: 'Name',
          description: 'Label for the name input when creating a crop'
        })}
        placeholder={intl.formatMessage({
          defaultMessage: 'Tomatoes',
          description: 'Example crop shown as a placeholder for the name field when creating a crop'
        })}
      />
      <NumberInput
        min={0}
        required
        {...getInputProps('daysToMaturity')}
        label={intl.formatMessage({
          defaultMessage: 'Days to maturity',
          description: 'Label for the number input for days to maturity when creating a crop'
        })}
      />
      <NumberInput
        min={1}
        required
        {...getInputProps('harvestWindow')}
        label={intl.formatMessage({
          defaultMessage: 'Harvest window',
          description: 'Label for the number input for harvest window when creating a crop'
        })}
      />
      <Group mt={12} position="right">
        <Button onClick={onClose} variant="subtle">
          <FormattedMessage
            defaultMessage="Cancel"
            description="Caption for cancel button to close the add crop modal"
          />
        </Button>
        <Button onClick={handleSubmit}>
          <FormattedMessage
            defaultMessage="Create crop"
            description="Caption for submit button for the add crop modal"
          />
        </Button>
      </Group>
    </Modal>
  );
};

export default React.memo(AddCropModal);
