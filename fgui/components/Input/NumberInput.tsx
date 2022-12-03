import {
  forwardRef,
  NumberInput as ChakraNumberInput,
  NumberInputField as ChakraNumberInputField,
  NumberInputFieldProps as ChakraNumberInputFieldProps,
  NumberInputProps
} from '@chakra-ui/react';
import { fieldStyles } from './styles';
import { Flex, T } from 'fgui';
import isNil from 'lodash/isNil';
import { throwDeveloperError } from 'utils/error';
import { ChangeEvent, useCallback } from 'react';

type NumberInputFieldProps = Omit<ChakraNumberInputFieldProps, 'onChange' | 'min' | 'max'> & {
  onChange?: (value: number | undefined) => void;
  min?: number;
  max?: number;
};
const NumberInputField = forwardRef<NumberInputFieldProps, 'input'>(
  ({ min = 0, max = 999999, onChange, ...props }, ref) => {
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
      <ChakraNumberInputField
        max={max}
        min={min}
        ref={ref}
        {...fieldStyles}
        {...props}
        onChange={handleChange}
      />
    );
  }
);

type Props = NumberInputProps & {
  label?: string;
};
const NumberInputBase = forwardRef<Props, 'div'>(({ label, ...props }, ref) => {
  return (
    <Flex direction="column" w="100%">
      {label && <T.Label mb={1}>{label}</T.Label>}
      <ChakraNumberInput ref={ref} {...props} />
    </Flex>
  );
});

const NumberInput = Object.assign(NumberInputBase, {
  Field: NumberInputField
});

export default NumberInput;
