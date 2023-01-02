import { Command } from 'db/Command';
import { db } from 'db';

export default class ReadCropsCommand implements Command {
  constructor(private organizationId: number) {}

  public execute() {
    return db.crop.findMany({
      where: {
        organizationId: this.organizationId
      },
      orderBy: {
        name: 'asc'
      }
    });
  }
}
