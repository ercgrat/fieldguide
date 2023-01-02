import { Command } from 'db/Command';
import { db } from 'db';

export default class ReadUnitsCommand implements Command {
  constructor(private organizationId: number) {}

  public execute() {
    return db.unit.findMany({
      where: {
        organizationId: this.organizationId
      },
      orderBy: {
        name: 'asc'
      }
    });
  }
}
