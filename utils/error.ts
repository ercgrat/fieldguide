import { AxiosError } from 'axios';
import { useToast } from 'fgui';
import { useCallback } from 'react';
import { IS_PROD } from './const';
import { HttpResponseHeader } from './enums';

export const useErrorHandler = () => {
  const toast = useToast();
  const handleError = useCallback(
    (e: Error | AxiosError) => {
      let message = e.message;
      if (e instanceof AxiosError) {
        message = e.response?.headers[HttpResponseHeader.Error.toLowerCase()] ?? message;
      }

      toast({
        description: message
      });
    },
    [toast]
  );

  return { handleError };
};

export const throwDeveloperError = (message: string) => {
  if (!IS_PROD) {
    throw new Error(message);
  }
};
