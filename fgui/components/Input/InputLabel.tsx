import { Box, T } from 'fgui';

type Props = {
  label?: string;
  isRequired?: boolean;
};

const InputLabel: React.FC<Props> = ({ label, isRequired }) => {
  if (!label) {
    return null;
  }
  return (
    <T.Label mb={1}>
      {label}
      <Box as="span" color="rose.100">
        {isRequired && ' *'}
      </Box>
    </T.Label>
  );
};

export default InputLabel;
