import type { NextApiRequest, NextApiResponse } from 'next';
import { Crop } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import { RequestSchema, withRouteSetup } from 'utils/middleware';
import { HttpMethod, HttpResponseHeader } from 'utils/enums';
import { APIQueryParams, APIRequestBody } from 'types/backend';
import { SequentialTransaction } from 'db/Transaction';
import CreateCropCommand from 'db/crops/CreateCropCommand';
import ReadCropsCommand from 'db/crops/ReadCropsCommand';
import DeleteCropCommand from 'db/crops/DeleteCropCommand';
import UpdateCropCommand from 'db/crops/UpdateCropCommand';

const createSchema: RequestSchema = Joi.object({
  body: Joi.object<APIRequestBody.CropCreate>({
    organizationId: Joi.number().required(),
    name: Joi.string().required(),
    daysToMaturity: Joi.number().required().min(0),
    harvestWindow: Joi.number().required().min(1),
    harvestRate: Joi.number().min(0).optional().allow(null),
    pricePerHarvestUnit: Joi.number().min(0).optional().allow(null),
    unitId: Joi.number().optional().allow(null)
  })
});

const readSchema: RequestSchema = Joi.object({
  query: Joi.object<APIQueryParams.CropRead>({
    organizationId: Joi.number().required()
  }).required()
});

const updateSchema: RequestSchema = Joi.object({
  body: Joi.object<APIRequestBody.CropUpdate>({
    id: Joi.number().required(),
    organizationId: Joi.number().required(),
    name: Joi.string().required(),
    daysToMaturity: Joi.number().required().min(0),
    harvestWindow: Joi.number().required().min(1),
    harvestRate: Joi.number().min(0).optional().allow(null),
    pricePerHarvestUnit: Joi.number().min(0).optional().allow(null),
    unitId: Joi.number().optional().allow(null)
  })
});

const deleteSchema: RequestSchema = Joi.object({
  query: Joi.object<APIQueryParams.CropDelete>({
    id: Joi.number().required()
  })
});

const createCrop = (req: NextApiRequest, res: NextApiResponse<Crop>) => {
  const reqBodyCrop = req.body as APIRequestBody.CropCreate;
  return new Promise((resolve, reject) => {
    const createCropCommand = new CreateCropCommand(reqBodyCrop);
    const transaction = new SequentialTransaction([createCropCommand]);
    transaction
      .execute()
      .then(([crop]) => {
        if (crop) {
          res.status(StatusCodes.OK).send(crop);
          resolve(crop);
        } else {
          throw new Error('Failed to create crop');
        }
      })
      .catch((e: Error) => {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .setHeader(HttpResponseHeader.Error, JSON.stringify(e));
        reject(e.message);
      });
  });
};

const readCrops = (req: NextApiRequest, res: NextApiResponse<Crop[]>) => {
  const query = req.query as APIQueryParams.CropRead;
  const { organizationId } = query;
  return new Promise((resolve, reject) => {
    const getCropCommand = new ReadCropsCommand(Number(organizationId));

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

const updateCrop = (req: NextApiRequest, res: NextApiResponse<Crop>) => {
  const body = req.body as APIRequestBody.CropUpdate;
  return new Promise((resolve, reject) => {
    const updateCropCommand = new UpdateCropCommand(body);
    const transaction = new SequentialTransaction([updateCropCommand]);
    transaction
      .execute()
      .then(([crop]) => {
        if (crop) {
          res.status(StatusCodes.OK).json(crop);
        } else {
          res.status(StatusCodes.NOT_FOUND);
        }
        resolve(crop);
      })
      .catch((e: Error) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
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
        if (crop) {
          res.status(StatusCodes.OK).send(crop);
          resolve(crop);
        } else {
          throw new Error('Failed to delete crop');
        }
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
    [HttpMethod.POST]: createSchema,
    [HttpMethod.GET]: readSchema,
    [HttpMethod.PUT]: updateSchema,
    [HttpMethod.DELETE]: deleteSchema
  },
  handlers: {
    [HttpMethod.POST]: createCrop,
    [HttpMethod.GET]: readCrops,
    [HttpMethod.PUT]: updateCrop,
    [HttpMethod.DELETE]: deleteCrop
  }
});
