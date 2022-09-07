import { showNotification } from '@mantine/notifications';

export const handleError = (e: Error) => {
  showNotification({
    message: e.message,
    color: 'cinnabar'
  });
};
