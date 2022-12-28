import { Crop, Organization } from '@prisma/client';

declare namespace APIRequestBody {
  type CropCreate = Omit<Crop, 'id'>;
  type CropUpdate = Crop;
  type OrganizationCreate = Omit<Organization, 'id' | 'created_at'> & {
    userId: string;
  };
}

declare namespace APIQueryParams {
  type CropRead = Partial<Pick<Crop, 'organizationId'>>;

  type CropDelete = Partial<Pick<Crop, 'id'>>;

  type Organization = {
    name?: string;
    userId?: string;
  };

  type User = {
    email: string;
  };
}
