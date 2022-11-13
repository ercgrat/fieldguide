import { Crop } from '@prisma/client';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { APIRequestBody } from 'types/backend';
import { QueryKey } from 'utils/enums';
import { handleError } from 'utils/error';
import urls from 'utils/urls';
import { useCurrentOrganizationsQuery } from './organizations';

export const useCropsQuery = () => {
  const { data: organizations } = useCurrentOrganizationsQuery();
  const organizationId = organizations?.[0]?.id;
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

export const useCreateCropMutation = () => {
  return useMutation<Crop, Error, APIRequestBody.CreateCrop>(
    [QueryKey.Crop],
    crop => axios.post(urls.crops(), crop),
    {
      onError: handleError
    }
  );
};
