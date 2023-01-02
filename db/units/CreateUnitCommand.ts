import { Command } from 'db/Command';
import { db } from 'db';
import { APIRequestBody } from 'types/backend';

export default class CreateUnitCommand implements Command {
  constructor(private unit: APIRequestBody.UnitCreate) {}

  public execute() {
    return db.unit.create({
      data: this.unit
    });
  }
}
