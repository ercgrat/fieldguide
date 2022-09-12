import { Organization } from '@prisma/client';

declare namespace APIRequestBody {
  type CreateOrganization = Omit<Organization, 'id' | 'created_at'> & {
    userId: string;
  };
}

declare namespace APIQueryParams {
  type Organization = {
    name?: string;
    userId?: string;
  };

  type User = {
    email: string;
  };
}
