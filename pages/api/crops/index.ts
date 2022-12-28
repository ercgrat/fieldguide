import type { NextApiRequest, NextApiResponse } from 'next';
import { Crop } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import { RequestSchema, withRouteSetup } from 'utils/middleware';
import { HttpMethod, HttpResponseHeader } from 'utils/enums';
import { APIQueryParams, APIRequestBody } from 'types/backend';
import { SequentialTransaction } from 'db/Transaction';
import CreateCropCommand from 'db/crops/CreateCropCommand';
import GetCropCommand from 'db/crops/GetCropCommand';
import DeleteCropCommand from 'db/crops/DeleteCropCommand';

const getSchema: RequestSchema = Joi.object({
  query: Joi.object<APIQueryParams.CropGet>({
    organizationId: Joi.number().required()
  })
});

const postSchema: RequestSchema = Joi.object({
  body: Joi.object<APIRequestBody.CreateCrop>({
    organizationId: Joi.number().required(),
    name: Joi.string().required(),
    daysToMaturity: Joi.number().required().min(0),
    harvestWindow: Joi.number().required().min(1)
  })
});

const deleteSchema: RequestSchema = Joi.object({
  query: Joi.object<APIQueryParams.CropDelete>({
    id: Joi.number().required()
  })
});

const getCrops = (req: NextApiRequest, res: NextApiResponse<Crop[]>) => {
  const query = req.query as APIQueryParams.CropGet;
  const { organizationId } = query;
  return new Promise((resolve, reject) => {
    const getCropCommand = new GetCropCommand(Number(organizationId));

    const transaction = new SequentialTransaction([getCropCommand]);
    transaction
      .execute()
      .then(([crops]) => {
        if (crops) {
          res.status(StatusCodes.OK).json(crops);
        } else {
          res.status(StatusCodes.NOT_FOUND);
        }
        resolve(crops);
      })
      .catch((e: Error) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        reject(e.message);
      });
  });
};

const createCrop = (req: NextApiRequest, res: NextApiResponse<Crop>) => {
  const reqBodyCrop = req.body as APIRequestBody.CreateCrop;
  return new Promise((resolve, reject) => {
    const createCropCommand = new CreateCropCommand(reqBodyCrop);
    const transaction = new SequentialTransaction([createCropCommand]);
    transaction
      .execute()
      .then(([crop]) => {
        res.status(StatusCodes.OK).send(crop);
        resolve(crop);
      })
      .catch((e: Error) => {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .setHeader(HttpResponseHeader.Error, JSON.stringify(e));
        reject(e.message);
      });
  });
};

const deleteCrop = (req: NextApiRequest, res: NextApiResponse<Crop>) => {
  const query = req.query as APIQueryParams.CropDelete;
  const { id } = query;
  return new Promise((resolve, reject) => {
    const deleteCropCommand = new DeleteCropCommand(Number(id));
    const transaction = new SequentialTransaction([deleteCropCommand]);
    transaction
      .execute()
      .then(([crop]) => {
        res.status(StatusCodes.OK).send(crop);
        resolve(crop);
      })
      .catch((e: Error) => {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .setHeader(HttpResponseHeader.Error, JSON.stringify(e));
        reject(e.message);
      });
  });
};

export default withRouteSetup({
  schemas: {
    [HttpMethod.GET]: getSchema,
    [HttpMethod.POST]: postSchema,
    [HttpMethod.DELETE]: deleteSchema
  },
  handlers: {
    [HttpMethod.GET]: getCrops,
    [HttpMethod.POST]: createCrop,
    [HttpMethod.DELETE]: deleteCrop
  }
});
