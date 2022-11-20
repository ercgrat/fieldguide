import { Role, UnitSystem } from '@prisma/client';
import { Command } from 'db/Command';
import { db } from 'db';

type Organization = {
  name: string;
  street1: string;
  street2: string | null;
  city: string;
  state: string;
  postCode: string;
  phone: string | null;
  email: string;
  unitSystem: UnitSystem;
};

export default class CreateOrganizationCommand implements Command {
  constructor(private organization: Organization, private userId: string) {}

  public execute() {
    return db.organization.create({
      data: {
        ...this.organization,
        Membership: {
          create: {
            role: Role.Owner,
            userId: this.userId
          }
        }
      }
    });
  }
}
