import { SelectItem } from '@mantine/core/lib/Select/types';
import { Crop } from '@prisma/client';
import { useCropsQuery } from 'fetch/crops';
import { HStack, Icon, Select, Spinner, T, useDisclosure } from 'fgui';
import React, { useCallback, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import CropModal from './CropModal';

type Props = {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  label?: string;
};
const CropSelect: React.FC<Props> = ({ value, onChange, label }) => {
  const intl = useIntl();
  const [cropNameToCreate, setCropNameToCreate] = useState('');
  const { data: crops, isFetching, refetch } = useCropsQuery();
  const data: SelectItem[] = useMemo(
    () =>
      crops?.map(crop => ({
        value: `${crop.id}`,
        label: crop.name
      })) ?? [],
    [crops]
  );

  const handleChange = useCallback(
    (newValue: string | null) => {
      onChange(newValue ? Number(newValue) : undefined);
    },
    [onChange]
  );

  const {
    isOpen: isCreateCropModalOpen,
    onOpen: onOpenCreateCropModal,
    onClose: onCloseCreateCropModal
  } = useDisclosure({
    defaultIsOpen: false
  });

  const handleStartCreatingCrop = useCallback(
    (query: string) => {
      setCropNameToCreate(query);
      onOpenCreateCropModal();
      return null;
    },
    [onOpenCreateCropModal]
  );

  const handleCropCreated = useCallback(
    (crop: Crop) => {
      refetch().then(() => {
        onChange(crop.id);
        onCloseCreateCropModal();
      });
    },
    [onChange, onCloseCreateCropModal, refetch]
  );

  return (
    <>
      <Select
        creatable
        data={data}
        dropdownPosition="bottom"
        getCreateLabel={query => (
          <HStack>
            <Icon.PlusCircle color="cornflower.100" />
            <T.BodyMd>
              <FormattedMessage
                defaultMessage="Create {query}"
                description="Select dropdown option to create a new crop"
                id="Jvjkbu"
                values={{
                  query: query
                }}
              />
            </T.BodyMd>
          </HStack>
        )}
        icon={isFetching ? <Spinner size="sm" /> : null}
        label={label}
        onChange={handleChange}
        onCreate={handleStartCreatingCrop}
        placeholder={intl.formatMessage({
          defaultMessage: 'Select a crop',
          id: 'KKpBlP',
          description: 'Placeholder text for the select input for a crop'
        })}
        value={value ? `${value}` : null}
      />
      {isCreateCropModalOpen && (
        <CropModal
          crop={{ name: cropNameToCreate }}
          mode="create"
          onCancel={onCloseCreateCropModal}
          onChange={handleCropCreated}
        />
      )}
    </>
  );
};

export default React.memo(CropSelect);
