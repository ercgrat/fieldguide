import { Crop } from '@prisma/client';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { APIQueryParams, APIRequestBody } from 'types/backend';
import { QueryKey } from 'utils/enums';
import { useErrorHandler } from 'utils/error';
import urls from 'utils/urls';
import { useCurrentOrganizationsQuery } from './organizations';

export const useCropsQuery = () => {
  const { data: organizations } = useCurrentOrganizationsQuery();
  const organizationId = organizations?.[0]?.id;
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
  return useMutation<Crop, Error, APIRequestBody.CreateCrop>(
    [QueryKey.Crop],
    crop => axios.post(urls.crops(), crop),
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
