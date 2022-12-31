import { Crop } from '@prisma/client';
import axios from 'axios';
import { OrganizationContext } from 'contexts/organization';
import { useContext } from 'react';
import { useMutation, useQuery } from 'react-query';
import { APIQueryParams, APIRequestBody } from 'types/backend';
import { QueryKey } from 'utils/enums';
import { useErrorHandler } from 'utils/error';
import urls from 'utils/urls';

export const useCropsQuery = () => {
  const { id: organizationId } = useContext(OrganizationContext) ?? {};
  const { handleError } = useErrorHandler();
  return useQuery<Crop[], Error>(
    [QueryKey.Organization, { organizationId }],
    async () => {
      const { data } = await axios.get<Crop[]>(urls.crops({ organizationId }));
      return data;
    },
    {
      enabled: !!organizationId,
      onError: handleError
    }
  );
};

export const useCreateCropMutation = (args?: { onSuccess?: (data: Crop) => void }) => {
  const { handleError } = useErrorHandler();
  return useMutation<Crop, Error, APIRequestBody.CropCreate>(
    [QueryKey.Crop],
    crop => axios.post(urls.crops(), crop).then(({ data }) => data),
    {
      onError: handleError,
      onSuccess: args?.onSuccess
    }
  );
};

export const useUpdateCropMutation = (args?: { onSuccess?: (data: Crop) => void }) => {
  const { handleError } = useErrorHandler();
  return useMutation<Crop, Error, APIRequestBody.CropUpdate>(
    [QueryKey.Crop],
    crop => axios.put(urls.crops(), crop).then(({ data }) => data),
    {
      onError: handleError,
      onSuccess: args?.onSuccess
    }
  );
};

export const useDeleteCropMutation = (args?: { onSuccess?: (data: Crop) => void }) => {
  const { handleError } = useErrorHandler();
  return useMutation<Crop, Error, APIQueryParams.CropDelete>(
    [QueryKey.Crop],
    body => axios.delete(urls.crops(body)),
    {
      onError: handleError,
      onSuccess: args?.onSuccess
    }
  );
};
