import { SelectItem } from '@mantine/core/lib/Select/types';
import { useCropsQuery } from 'fetch/crops';
import { Select, Spinner } from 'fgui';
import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';

type Props = {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  label?: string;
};
const CropSelect: React.FC<Props> = ({ value, onChange, label }) => {
  const intl = useIntl();
  const { data: crops, isLoading } = useCropsQuery();
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

  return (
    <Select
      data={data}
      dropdownPosition="bottom"
      icon={isLoading ? <Spinner size="sm" /> : null}
      label={label}
      onChange={handleChange}
      placeholder={intl.formatMessage({
        defaultMessage: 'Select a crop',
        id: 'KKpBlP',
        description: 'Placeholder text for the select input for a crop'
      })}
      value={value ? `${value}` : null}
    />
  );
};

export default React.memo(CropSelect);
