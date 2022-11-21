import { showNotification } from '@mantine/notifications';
import { AxiosError } from 'axios';
import { HttpResponseHeader } from './enums';

export const handleError = (e: Error | AxiosError) => {
  let message = e.message;
  if (e instanceof AxiosError) {
    message = e.response?.headers[HttpResponseHeader.Error.toLowerCase()] ?? message;
  }
  showNotification({
    message,
    color: 'cinnabar'
  });
};
