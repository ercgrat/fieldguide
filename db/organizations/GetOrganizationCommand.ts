import { Command } from 'db/Command';
import { db } from 'db';

export default class GetOrganizationCommand implements Command {
  constructor(private userId: string, private name: string | undefined) {}

  public execute() {
    return db.organization.findMany({
      where: {
        name: this.name,
        ...(this.userId
          ? {
              Membership: {
                some: {
                  userId: this.userId
                }
              }
            }
          : {})
      }
    });
  }
}
