import { Prisma, Role, UnitSystem } from '@prisma/client';
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
        },
        Unit: {
          createMany: {
            data: DEFAULT_UNITS
          }
        }
      }
    });
  }
}

const DEFAULT_UNITS: Prisma.UnitCreateManyOrganizationInput[] = [
  {
    name: 'bags',
    abbreviation: 'bag'
  },
  {
    name: 'bunches',
    abbreviation: 'bunch'
  },
  {
    name: 'count',
    abbreviation: 'ct'
  },
  {
    name: 'kilograms',
    abbreviation: 'kg'
  },
  {
    name: 'pounds',
    abbreviation: 'lb'
  },
  {
    name: 'pints',
    abbreviation: 'pint'
  }
];
