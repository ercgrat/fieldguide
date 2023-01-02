import { Crop, Organization, Unit } from '@prisma/client';

declare namespace APIRequestBody {
  type CropCreate = Omit<Crop, 'id'>;
  type CropUpdate = Crop;
  type OrganizationCreate = Omit<Organization, 'id' | 'created_at'> & {
    userId: string;
  };
  type UnitCreate = Omit<Unit, 'id'>;
}

declare namespace APIQueryParams {
  type CropRead = Partial<Pick<Crop, 'organizationId'>>;
  type CropDelete = Partial<Pick<Crop, 'id'>>;
  type OrganizationRead = {
    name?: string;
    userId?: string;
  };
  type UnitRead = Partial<Pick<Unit, 'organizationId'>>;
  type UserRead = {
    email: string;
  };
}
