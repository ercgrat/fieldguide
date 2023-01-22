import {
  forwardRef,
  InputGroup,
  InputLeftAddon,
  NumberInput as ChakraNumberInput,
  NumberInputField as ChakraNumberInputField,
  NumberInputProps as ChakraNumberInputProps,
  useDisclosure
} from '@chakra-ui/react';
import { fieldStyles } from './styles';
import { Flex } from 'fgui';
import isNil from 'lodash/isNil';
import { throwDeveloperError } from 'utils/error';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import InputLabel from './InputLabel';
import { useBorderColor } from './utils';
import { formatNumber } from 'utils/number';

type Props = Omit<ChakraNumberInputProps, 'onChange' | 'min' | 'max' | 'value' | 'precision'> &
  Pick<Intl.NumberFormatOptions, 'maximumFractionDigits' | 'minimumFractionDigits'> & {
    value: number | undefined;
    label?: string;
    onChange?: (value: number | undefined) => void;
    min?: number;
    max?: number;
    leftAddon?: React.ReactNode;
  };
const NumberInput = forwardRef<Props, 'div'>(
  (
    {
      value,
      label,
      min = 0,
      max = 999999,
      leftAddon,
      minimumFractionDigits = 0,
      maximumFractionDigits = minimumFractionDigits,
      onChange,
      isDisabled,
      isRequired,
      placeholder,
      ...props
    },
    ref
  ) => {
    if (!isNil(min) && !isNil(max) && min > max) {
      throwDeveloperError('Min must be less than or equal to max.');
    }
    if (maximumFractionDigits < minimumFractionDigits) {
      throwDeveloperError('Min fraction digits must be less than or equal to max.');
    }

    const allowNegatives = !isNil(min) && min < 0;
    const { isOpen: isFocused, onOpen: focus, onClose: blur } = useDisclosure();
    const { isOpen: isHovered, onOpen: onMouseIn, onClose: onMouseOut } = useDisclosure();
    const borderColor = useBorderColor({ isFocused, isHovered });
    const [textValue, setTextValue] = useState('');
    const [internalValue, setInternalValue] = useState<number>();
    const previousValueRef = useRef<number>();

    const resetTextValue = useCallback(() => {
      if (!isNil(value)) {
        const formattedValue = formatNumber(value, {
          format: 'decimal',
          minimumFractionDigits,
          maximumFractionDigits
        });
        setTextValue(formattedValue);
      } else {
        setTextValue('');
      }
    }, [maximumFractionDigits, minimumFractionDigits, value]);

    const handleBlur = useCallback(() => {
      resetTextValue();
      blur();
    }, [blur, resetTextValue]);

    useEffect(() => {
      if (value === previousValueRef.current || value === internalValue) {
        return;
      }

      resetTextValue();
    }, [internalValue, resetTextValue, value]);

    useEffect(() => {
      previousValueRef.current = value;
    }, [value]);

    const toNumber = useCallback(
      (newValue: string) => {
        let newInternalValue = +newValue;
        if (!isNil(min) && !isNil(newInternalValue) && newInternalValue < min) {
          newInternalValue = min;
        }
        if (!isNil(max) && !isNil(newInternalValue) && newInternalValue > max) {
          newInternalValue = max;
        }

        const parsedValue = `${newInternalValue}`;
        return parsedValue.length > 0 ? Number(parsedValue) : undefined;
      },
      [min, max]
    );

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        let newInternalValue: number | undefined = undefined,
          newTextValue = '';

        if (newValue === '') {
          newTextValue = '';
          newInternalValue = undefined;
        } else if (newValue === '.') {
          if (maximumFractionDigits > 0) {
            newTextValue = '0.';
            newInternalValue = 0;
          } else {
            newTextValue = '';
            newInternalValue = undefined;
          }
        } else if (newValue === '0.') {
          newTextValue = '0.';
          newInternalValue = 0;
        } else if (allowNegatives && newValue === '-') {
          newTextValue = newValue;
          newInternalValue = undefined;
        } else if (
          maximumFractionDigits > 0 &&
          newValue.length > 0 &&
          newValue.charAt(newValue.length - 1) === '.' &&
          newValue.split('.').length === 2
        ) {
          newTextValue = newValue;
          newInternalValue = +newValue;
        } else {
          const regexString = `^${
            allowNegatives ? '-?' : ''
          }(\\d+)?(\\.\\d{0,${maximumFractionDigits}})?[\\d.e]*$`;
          const matchedValue = newValue?.match(regexString) || '';
          if (typeof matchedValue === 'string' || matchedValue.length < 2) {
            return;
          }

          const significantDigits = matchedValue[1] ?? '';
          const fractionDigits = matchedValue[2] ?? '';
          const newValueString = `${significantDigits}${fractionDigits}`;
          if (newValueString.startsWith('0') || newValueString.startsWith('-0')) {
            const isNegative = newValueString.startsWith('-');
            const afterZeroSuffix = newValueString.replace(/(-?)0+(.*)/, '$2');
            if (afterZeroSuffix.startsWith('.')) {
              newTextValue = `${isNegative ? '-' : ''}0${afterZeroSuffix}`;
            } else if (newValueString.endsWith('0')) {
              newTextValue = '0';
            } else {
              newTextValue = afterZeroSuffix;
            }
          } else {
            newTextValue = newValueString;
          }
          newInternalValue = toNumber(newTextValue);
        }

        setTextValue(newTextValue);
        if (newInternalValue !== previousValueRef.current) {
          setInternalValue(newInternalValue);
          onChange?.(newInternalValue);
        }
      },
      [allowNegatives, onChange, toNumber, maximumFractionDigits, setTextValue]
    );

    const inputRef = useRef<HTMLInputElement>(null);
    const handleFocus = useCallback(() => {
      setTextValue(v => v.replaceAll(',', ''));
      setTimeout(() => {
        inputRef.current?.setSelectionRange(0, 1000);
      });
    }, []);

    return (
      <Flex direction="column" w="100%">
        <InputLabel isRequired={isRequired} label={label} />
        <InputGroup>
          {leftAddon && (
            <InputLeftAddon
              borderColor={borderColor}
              borderRight="none"
              h="36px"
              borderRadius={fieldStyles.borderRadius}
              opacity={isDisabled ? 0.4 : undefined}
              px={3}
            >
              {leftAddon}
            </InputLeftAddon>
          )}
          <ChakraNumberInput
            ref={ref}
            {...props}
            value={textValue}
            isDisabled={isDisabled}
            isRequired={isRequired}
            max={max}
            min={min}
            onBlur={handleBlur}
            onFocus={focus}
            onMouseOut={onMouseOut}
            onMouseOver={onMouseIn}
            precision={maximumFractionDigits}
            flex={1}
          >
            <ChakraNumberInputField
              ref={inputRef}
              onFocus={handleFocus}
              borderColor={borderColor}
              max={max}
              min={min}
              onChange={handleChange}
              placeholder={placeholder}
              borderLeft={leftAddon ? 'none !important' : undefined}
              borderTopLeftRadius={leftAddon ? '0' : undefined}
              borderBottomLeftRadius={leftAddon ? '0' : undefined}
              {...fieldStyles}
            />
          </ChakraNumberInput>
        </InputGroup>
      </Flex>
    );
  }
);

export default NumberInput;
