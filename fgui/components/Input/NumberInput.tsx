import {
  forwardRef,
  NumberInput as ChakraNumberInput,
  NumberInputField as ChakraNumberInputField,
  NumberInputProps as ChakraNumberInputProps
} from '@chakra-ui/react';
import { fieldStyles } from './styles';
import { Flex } from 'fgui';
import isNil from 'lodash/isNil';
import { throwDeveloperError } from 'utils/error';
import { ChangeEvent, useCallback } from 'react';
import InputLabel from './InputLabel';

type Props = Omit<ChakraNumberInputProps, 'onChange' | 'min' | 'max'> & {
  label?: string;
  onChange?: (value: number | undefined) => void;
  min?: number;
  max?: number;
};
const NumberInput = forwardRef<Props, 'div'>(
  ({ label, min = 0, max = 999999, precision = 0, onChange, isRequired, ...props }, ref) => {
    if (!isNil(min) && !isNil(max) && min > max) {
      throwDeveloperError('Min must be less than or equal to max.');
    }

    const allowNegatives = !isNil(min) && min < 0;

    const parse = useCallback(
      (value: string | undefined) => {
        const regex = allowNegatives ? /-?\d+/ : /\d+/;
        const matchedValue = value?.match(regex) || '';
        if (!matchedValue.length) {
          return undefined;
        }

        let internalValue = +matchedValue;
        if (!isNil(min) && !isNil(internalValue) && internalValue < min) {
          internalValue = min;
        }
        if (!isNil(max) && !isNil(internalValue) && internalValue > max) {
          internalValue = max;
        }

        const parsedValue = `${internalValue}`;
        return parsedValue.length > 0 ? Number(parsedValue) : undefined;
      },
      [allowNegatives, max, min]
    );

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (allowNegatives && value === '-') {
          return;
        }

        onChange?.(parse(value));
      },
      [allowNegatives, onChange, parse]
    );

    return (
      <Flex direction="column" w="100%">
        <InputLabel isRequired={isRequired} label={label} />
        <ChakraNumberInput
          ref={ref}
          {...props}
          isRequired={isRequired}
          max={max}
          min={min}
          precision={precision}
        >
          <ChakraNumberInputField max={max} min={min} onChange={handleChange} {...fieldStyles} />
        </ChakraNumberInput>
      </Flex>
    );
  }
);

export default NumberInput;
