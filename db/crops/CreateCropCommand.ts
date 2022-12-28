import { Crop } from '@prisma/client';
import { Command } from 'db/Command';
import { APIRequestBody } from 'types/backend';
import { db } from 'db';

export default class CreateCropCommand implements Command<Crop> {
  constructor(private crop: APIRequestBody.CropCreate) {}

  public execute() {
    return db.crop.create({
      data: this.crop
    });
  }
}
