import { Command } from 'db/Command';
import { db } from 'db';

export default class GetCropCommand implements Command {
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
