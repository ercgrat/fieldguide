import type { NextApiRequest, NextApiResponse } from 'next';
import { Crop } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { db } from 'utils/db';
import Joi from 'joi';
import { RequestSchema, withHttpMethods, withValidation } from 'utils/middleware';
import { HttpMethod, HttpResponseHeader } from 'utils/enums';
import { APIQueryParams, APIRequestBody } from 'types/backend';

const getSchema: RequestSchema = Joi.object({
  query: Joi.object<APIQueryParams.Crop>({
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

const getCrops = (req: NextApiRequest, res: NextApiResponse<Crop[]>) => {
  const query = req.query as APIQueryParams.Crop;
  const { organizationId } = query;
  return new Promise((resolve, reject) => {
    db.crop
      .findMany({
        where: {
          organizationId: Number(organizationId)
        }
      })
      .then(crops => {
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
    db.crop
      .create({
        data: reqBodyCrop
      })
      .then(crop => {
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

export default withValidation(
  {
    [HttpMethod.GET]: getSchema,
    [HttpMethod.POST]: postSchema
  },
  withHttpMethods({
    [HttpMethod.GET]: getCrops,
    [HttpMethod.POST]: createCrop
  })
);
