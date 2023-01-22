type NumberFormatOptions = Omit<Intl.NumberFormatOptions, 'style'> & {
  format: 'integer' | 'decimal' | 'price' | 'percent';
};

export const formatNumber = (
  value: number,
  options: NumberFormatOptions = { format: 'decimal' }
) => {
  const { format = 'decimal', ...rest } = options;
  let formatOptions: Intl.NumberFormatOptions = {};
  switch (format) {
    case 'integer':
      formatOptions = {
        maximumFractionDigits: 0,
        style: 'decimal'
      };
      break;
    case 'decimal':
      formatOptions = {
        maximumFractionDigits: 6,
        style: 'decimal'
      };
      break;
    case 'price':
      formatOptions = {
        maximumFractionDigits: 2,
        style: 'price'
      };
      break;
    case 'percent':
      formatOptions = {
        maximumFractionDigits: 2,
        style: 'percent'
      };
      break;
  }

  const formatter = Intl.NumberFormat('en-US', {
    currency: 'USD',
    ...formatOptions,
    ...rest
  });
  return formatter.format(value);
};
