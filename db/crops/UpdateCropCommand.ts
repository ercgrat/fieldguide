import { Crop } from '@prisma/client';
import { Command } from 'db/Command';
import { APIRequestBody } from 'types/backend';
import { db } from 'db';

export default class UpdateCropCommand implements Command<Crop> {
  constructor(private crop: APIRequestBody.CropUpdate) {}

  public execute() {
    return db.crop.update({
      data: this.crop,
      where: {
        id: this.crop.id
      }
    });
  }
}
