import { Crop, Organization } from '@prisma/client';

declare namespace APIRequestBody {
  type CreateCrop = Omit<Crop, 'id'>;
  type CreateOrganization = Omit<Organization, 'id' | 'created_at'> & {
    userId: string;
  };
}

declare namespace APIQueryParams {
  type CropGet = Partial<Pick<Crop, 'organizationId'>>;

  type CropDelete = Partial<Pick<Crop, 'id'>>;

  type Organization = {
    name?: string;
    userId?: string;
  };

  type User = {
    email: string;
  };
}
