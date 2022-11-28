import { useForm } from 'react-hook-form';
import { useCreateCropMutation } from 'fetch/crops';
import { useCurrentOrganizationsQuery } from 'fetch/organizations';
import React, { useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { APIRequestBody } from 'types/backend';
import { Box, Button, HStack, Modal, TextInput, VStack } from 'fgui';

type Props = {
  onClose: () => void;
};
const AddCropModal: React.FC<Props> = ({ onClose }) => {
  const intl = useIntl();
  const { data: organizations } = useCurrentOrganizationsQuery();
  const organizationId = organizations?.[0]?.id ?? 0;
  const {
    register,
    handleSubmit: handleSubmitWrapper,
    formState: { errors }
  } = useForm<APIRequestBody.CreateCrop>({
    defaultValues: {
      name: ''
    }
  });
  const { mutate, isLoading } = useCreateCropMutation();
  const handleSubmit = useCallback(
    (values: APIRequestBody.CreateCrop) => {
      mutate({
        ...values,
        harvestWindow: Number(values.harvestWindow),
        daysToMaturity: Number(values.daysToMaturity),
        organizationId
      });
    },
    [mutate, organizationId]
  );

  return (
    <Modal isOpen onClose={onClose}>
      <Modal.Header>
        {intl.formatMessage({
          defaultMessage: 'Add crop',
          description: 'Title of a modal for adding crops to your catalog'
        })}
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmitWrapper(handleSubmit)}>
          <Box as="button" display="none" type="submit" />
          <VStack alignItems="flex-start" w="100%">
            <TextInput
              data-autofocus
              required
              {...register('name', { required: true })}
              label={intl.formatMessage({
                defaultMessage: 'Name',
                description: 'Label for the name input when creating a crop'
              })}
              placeholder={intl.formatMessage({
                defaultMessage: 'Tomatoes',
                description:
                  'Example crop shown as a placeholder for the name field when creating a crop'
              })}
            />
            <TextInput
              required
              {...register('daysToMaturity', { required: true })}
              label={intl.formatMessage({
                defaultMessage: 'Days to maturity',
                description: 'Label for the number input for days to maturity when creating a crop'
              })}
            />
            <TextInput
              required
              {...register('harvestWindow', { required: true })}
              label={intl.formatMessage({
                defaultMessage: 'Harvest window',
                description: 'Label for the number input for harvest window when creating a crop'
              })}
            />
          </VStack>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <HStack justifyContent="flex-end" p={2} w="100%">
          <Button onClick={onClose} variant="secondary">
            <FormattedMessage
              defaultMessage="Cancel"
              description="Caption for cancel button to close the add crop modal"
            />
          </Button>
          <Button
            disabled={!!Object.keys(errors).length}
            loading={isLoading}
            onClick={handleSubmitWrapper(handleSubmit)}
            variant="primary"
          >
            <FormattedMessage
              defaultMessage="Create crop"
              description="Caption for submit button for the add crop modal"
            />
          </Button>
        </HStack>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(AddCropModal);
