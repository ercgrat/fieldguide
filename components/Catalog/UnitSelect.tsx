import { SelectItem } from '@mantine/core/lib/Select/types';
import { Unit } from '@prisma/client';
import { useUnitsQuery } from 'fetch/units';
import { HStack, Icon, Select, Spinner, T, useDisclosure } from 'fgui';
import React, { useCallback, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import UnitModal from './UnitModal';

type Props = {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  label?: string;
};
const UnitSelect: React.FC<Props> = ({ value, onChange, label }) => {
  const intl = useIntl();
  const [unitNameToCreate, setUnitNameToCreate] = useState('');
  const { data: units, isFetching, refetch } = useUnitsQuery();
  const data: SelectItem[] = useMemo(
    () =>
      units?.map(unit => ({
        value: `${unit.id}`,
        label: `${unit.name} (${unit.abbreviation})`
      })) ?? [],
    [units]
  );

  const handleChange = useCallback(
    (newValue: string | null) => {
      onChange(newValue ? Number(newValue) : undefined);
    },
    [onChange]
  );

  const {
    isOpen: isCreateUnitModalOpen,
    onOpen: onOpenCreateUnitModal,
    onClose: onCloseCreateUnitModal
  } = useDisclosure({
    defaultIsOpen: false
  });

  const handleStartCreatingUnit = useCallback(
    (query: string) => {
      setUnitNameToCreate(query);
      onOpenCreateUnitModal();
      return null;
    },
    [onOpenCreateUnitModal]
  );

  const handleUnitCreated = useCallback(
    (unit: Unit) => {
      refetch().then(() => {
        onChange(unit.id);
        onCloseCreateUnitModal();
      });
    },
    [onChange, onCloseCreateUnitModal, refetch]
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
            <T.BodyMd whiteSpace="break-spaces">
              <FormattedMessage
                defaultMessage="Create {query}"
                description="Select dropdown option to create a new unit"
                id="4/wN7w"
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
        onCreate={handleStartCreatingUnit}
        placeholder={intl.formatMessage({
          defaultMessage: 'Select a unit',
          id: 'b7yrhL',
          description: 'Placeholder text for the select input for a unit'
        })}
        value={value ? `${value}` : null}
      />
      {isCreateUnitModalOpen && (
        <UnitModal
          unit={{ name: unitNameToCreate }}
          onClose={onCloseCreateUnitModal}
          onChange={handleUnitCreated}
        />
      )}
    </>
  );
};

export default React.memo(UnitSelect);
