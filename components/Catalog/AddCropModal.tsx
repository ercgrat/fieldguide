import { useForm } from 'react-hook-form';
import { useCreateCropMutation } from 'fetch/crops';
import { useCurrentOrganizationsQuery } from 'fetch/organizations';
import React, { useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { APIRequestBody } from 'types/backend';
import { Box, Button, HStack, Modal, NumberInput, TextInput, VStack } from 'fgui';

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
    formState: { errors },
    setValue
  } = useForm<APIRequestBody.CreateCrop>();
  const { onChange: _daysToMaturityOnChange, ...daysToMaturityProps } = register('daysToMaturity', {
    required: true
  });
  const { onChange: _harvestWindowOnChange, ...harvestWindowProps } = register('harvestWindow', {
    required: true
  });

  const { mutate, isLoading } = useCreateCropMutation({ onSuccess: onClose });
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
              isRequired
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
            <HStack>
              <NumberInput
                isRequired
                label={intl.formatMessage({
                  defaultMessage: 'Days to maturity',
                  description:
                    'Label for the number input for days to maturity when creating a crop'
                })}
                {...daysToMaturityProps}
                max={undefined}
                min={0}
                onChange={v => setValue('daysToMaturity', v ?? null)}
              />
              <NumberInput
                isRequired
                label={intl.formatMessage({
                  defaultMessage: 'Harvest window (days)',
                  description: 'Label for the number input for harvest window when creating a crop'
                })}
                {...harvestWindowProps}
                max={undefined}
                min={1}
                onChange={v => setValue('harvestWindow', v ?? null)}
              />
            </HStack>
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
