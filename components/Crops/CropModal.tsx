'use client';
import { Controller, useForm } from 'react-hook-form';
import { useCreateCropMutation, useUpdateCropMutation } from 'fetch/crops';
import React, { useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { APIRequestBody } from 'types/backend';
import { Box, Button, Card, Flex, HStack, Modal, NumberInput, T, TextInput, VStack } from 'fgui';
import { Crop } from '@prisma/client';
import { useOrganization } from 'contexts/organization';
import UnitSelect from 'components/Catalog/UnitSelect';
import { useUnitsQuery } from 'fetch/units';

type Props = {
  crop?: Partial<Crop>;
  mode: 'create' | 'update';
  onCancel: () => void;
  onChange: (crop: Crop) => void;
};
const CropModal: React.FC<Props> = ({ crop, mode, onCancel: onClose, onChange }) => {
  const intl = useIntl();
  const {
    organization: { id: organizationId, unitSystem }
  } = useOrganization();
  const { data: units } = useUnitsQuery();
  const {
    control,
    register,
    handleSubmit: handleSubmitWrapper,
    formState: { errors },
    setValue,
    watch
  } = useForm<Partial<APIRequestBody.CropCreate>>({
    defaultValues: {
      ...crop
    }
  });

  const harvestUnitID = watch('unitId');
  const harvestUnit = units?.find(unit => unit.id === harvestUnitID);
  const daysToMaturity = watch('daysToMaturity');
  const harvestWindow = watch('harvestWindow');
  const harvestRate = watch('harvestRate') ?? undefined;
  const pricePerHarvestUnit = watch('pricePerHarvestUnit') ?? undefined;

  const { mutate: createCrop, isLoading: isCreatingCrop } = useCreateCropMutation({
    onSuccess: (createdCrop: Crop) => onChange?.(createdCrop)
  });
  const { mutate: updateCrop, isLoading: isUpdatingCrop } = useUpdateCropMutation({
    onSuccess: (updatedCrop: Crop) => onChange?.(updatedCrop)
  });
  const handleSubmit = useCallback(
    (values: Partial<APIRequestBody.CropCreate>) => {
      if (!organizationId) {
        return;
      }

      const transformedData: APIRequestBody.CropCreate = {
        name: values.name ?? '',
        harvestWindow: Number(values.harvestWindow),
        daysToMaturity: Number(values.daysToMaturity),
        harvestRate: values.harvestRate || null,
        pricePerHarvestUnit: values.pricePerHarvestUnit || null,
        unitId: values.unitId || null,
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
                value={daysToMaturity}
                max={undefined}
                min={0}
                onChange={v => setValue('daysToMaturity', v)}
              />
              <NumberInput
                isRequired
                label={intl.formatMessage({
                  defaultMessage: 'Harvest window (days)',
                  id: 'xq5zUL',
                  description: 'Label for the number input for harvest window when creating a crop'
                })}
                value={harvestWindow}
                max={undefined}
                min={1}
                onChange={v => setValue('harvestWindow', v)}
              />
            </HStack>
            <Card borderLeft="solid 4px" borderColor="pea.100" p={3} overflow="visible">
              <VStack alignItems="stretch">
                <T.HeadingSm>
                  <FormattedMessage
                    defaultMessage="Yield Details"
                    description="Title of a card where user enters yield information about a crop"
                    id="y3eD7e"
                  />
                </T.HeadingSm>
                <Flex direction="column" w="100%">
                  <T.Label mb={1}>
                    <FormattedMessage
                      defaultMessage="Harvest Rate"
                      id="UM7xkZ"
                      description="Label over harvest rate and unit fields"
                    />
                  </T.Label>
                  <HStack>
                    <NumberInput
                      value={harvestRate}
                      min={0}
                      max={undefined}
                      onChange={v => setValue('harvestRate', v)}
                      placeholder={intl.formatMessage({
                        defaultMessage: 'e.g. 50, 100',
                        id: '+mwbyx',
                        description:
                          'Placeholder text for the numerator of the harvest rate when editing crop details'
                      })}
                    />
                    <Controller
                      name="unitId"
                      control={control}
                      render={({ field: { value, onChange: onChangeHarvestUnit } }) => (
                        <UnitSelect value={value ?? undefined} onChange={onChangeHarvestUnit} />
                      )}
                    />
                    <T.BodySm whiteSpace="nowrap">
                      {unitSystem === 'Metric' ? (
                        <FormattedMessage
                          defaultMessage="per 30 bed meters"
                          id="bMuEmV"
                          description="Label for harvest rate denominator when editing crop details"
                        />
                      ) : (
                        <FormattedMessage
                          defaultMessage="per 100 bed feet"
                          id="lJgekc"
                          description="Label for harvest rate denominator when editing crop details"
                        />
                      )}
                    </T.BodySm>
                  </HStack>
                </Flex>
                <Flex direction="column" w="100%">
                  <T.Label mb={1}>
                    <FormattedMessage
                      defaultMessage="Price"
                      id="O5Wre1"
                      description="Label for the price input section when editing crop details"
                    />
                  </T.Label>
                  <HStack>
                    <NumberInput
                      value={pricePerHarvestUnit}
                      min={0}
                      max={undefined}
                      minimumFractionDigits={2}
                      isDisabled={!harvestUnit}
                      leftAddon="$"
                      onChange={v => setValue('pricePerHarvestUnit', v)}
                    />
                    <T.BodySm whiteSpace="nowrap">
                      <FormattedMessage
                        defaultMessage="per {unit}"
                        id="xpSMA3"
                        description="Label appended to the price field when editing crop details, e.g. 'per lb'"
                        values={{
                          unit: harvestUnit?.abbreviation ?? 'unit'
                        }}
                      />
                    </T.BodySm>
                  </HStack>
                </Flex>
              </VStack>
            </Card>
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
