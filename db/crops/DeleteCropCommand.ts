import { Command } from 'db/Command';
import { db } from 'db';
import { Crop } from '@prisma/client';

export default class DeleteCropCommand implements Command<Crop> {
  constructor(private cropId: number) {}

  public execute() {
    return db.crop.delete({
      where: {
        id: this.cropId
      }
    });
  }
}
