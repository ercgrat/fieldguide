import { Unit } from '@prisma/client';
import axios from 'axios';
import { useOrganization } from 'contexts/organization';
import { useMutation, useQuery } from 'react-query';
import { APIRequestBody } from 'types/backend';
import { QueryKey } from 'utils/enums';
import { useErrorHandler } from 'utils/error';
import urls from 'utils/urls';

export const useUnitsQuery = () => {
  const {
    organization: { id: organizationId }
  } = useOrganization();
  return useQuery<Unit[], Error, Unit[]>(
    [QueryKey.Unit],
    () => axios.get(urls.units({ organizationId })).then(({ data }) => data),
    {
      enabled: !!organizationId
    }
  );
};

export const useCreateUnitMutation = (args?: {
  onSuccess?:
    | ((
        data: Unit,
        variables: APIRequestBody.UnitCreate,
        context: unknown
      ) => void | Promise<unknown>)
    | undefined;
}) => {
  const { handleError } = useErrorHandler();
  return useMutation<Unit, Error, APIRequestBody.UnitCreate>(
    [QueryKey.Unit],
    unit => axios.post(urls.units(), unit).then(({ data }) => data),
    {
      onError: handleError,
      onSuccess: args?.onSuccess
    }
  );
};
