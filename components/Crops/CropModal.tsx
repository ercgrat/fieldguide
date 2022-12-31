'use client';
import { useForm } from 'react-hook-form';
import { useCreateCropMutation, useUpdateCropMutation } from 'fetch/crops';
import React, { useCallback, useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { APIRequestBody } from 'types/backend';
import { Box, Button, HStack, Modal, NumberInput, TextInput, VStack } from 'fgui';
import { Crop } from '@prisma/client';
import { OrganizationContext } from 'contexts/organization';

type Props = {
  crop?: Partial<Crop>;
  mode: 'create' | 'update';
  onCancel: () => void;
  onChange: (crop: Crop) => void;
};
const CropModal: React.FC<Props> = ({ crop, mode, onCancel: onClose, onChange }) => {
  const intl = useIntl();
  const { id: organizationId } = useContext(OrganizationContext) ?? {};
  const {
    register,
    handleSubmit: handleSubmitWrapper,
    formState: { errors },
    setValue
  } = useForm<APIRequestBody.CropCreate>({
    defaultValues: {
      ...crop
    }
  });
  const { onChange: _daysToMaturityOnChange, ...daysToMaturityProps } = register('daysToMaturity', {
    required: true
  });
  const { onChange: _harvestWindowOnChange, ...harvestWindowProps } = register('harvestWindow', {
    required: true
  });

  const { mutate: createCrop, isLoading: isCreatingCrop } = useCreateCropMutation({
    onSuccess: (createdCrop: Crop) => onChange?.(createdCrop)
  });
  const { mutate: updateCrop, isLoading: isUpdatingCrop } = useUpdateCropMutation({
    onSuccess: (updatedCrop: Crop) => onChange?.(updatedCrop)
  });
  const handleSubmit = useCallback(
    (values: APIRequestBody.CropCreate) => {
      if (!organizationId) {
        return;
      }

      const transformedData: APIRequestBody.CropCreate = {
        ...values,
        harvestWindow: Number(values.harvestWindow),
        daysToMaturity: Number(values.daysToMaturity),
        organizationId
      };
      if (mode === 'create') {
        createCrop(transformedData);
      } else {
        updateCrop({ ...transformedData, id: Number(crop?.id) });
      }
    },
    [createCrop, crop, mode, organizationId, updateCrop]
  );

  return (
    <Modal isOpen onClose={onClose}>
      <Modal.Header>
        {mode === 'update' ? (
          <FormattedMessage
            defaultMessage="Edit Crop"
            description="Title of a modal for editing an existing crop in your catalog"
            id="TU8jYF"
          />
        ) : (
          <FormattedMessage
            defaultMessage="Add Crop"
            description="Title of a modal for adding crops to your catalog"
            id="K64V+1"
          />
        )}
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
                id: '0R8pDB',
                description: 'Label for the name input when creating a crop'
              })}
              placeholder={intl.formatMessage({
                defaultMessage: 'Tomatoes',
                id: 'tsSulk',
                description:
                  'Example crop shown as a placeholder for the name field when creating a crop'
              })}
            />
            <HStack>
              <NumberInput
                isRequired
                label={intl.formatMessage({
                  defaultMessage: 'Days to maturity',
                  id: 'IkoKCv',
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
                  id: 'xq5zUL',
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
              id="P08zgD"
            />
          </Button>
          <Button
            disabled={!!Object.keys(errors).length}
            loading={isCreatingCrop || isUpdatingCrop}
            onClick={handleSubmitWrapper(handleSubmit)}
            variant="primary"
          >
            {mode === 'create' ? (
              <FormattedMessage
                defaultMessage="Create crop"
                description="Caption for submit button for the add crop modal"
                id="7484Qi"
              />
            ) : (
              <FormattedMessage
                defaultMessage="Save changes"
                description="Caption for submit button for the edit crop modal"
                id="8UgzT6"
              />
            )}
          </Button>
        </HStack>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(CropModal);
