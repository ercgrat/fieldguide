import type { NextApiRequest, NextApiResponse } from 'next';
import { Unit } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import Joi, { AnySchema } from 'joi';
import { RequestSchema, withRouteSetup } from 'utils/middleware';
import { HttpMethod, HttpResponseHeader } from 'utils/enums';
import { APIQueryParams, APIRequestBody } from 'types/backend';
import { SequentialTransaction } from 'db/Transaction';
import CreateUnitCommand from 'db/units/CreateUnitCommand';
import ReadUnitsCommand from 'db/units/ReadUnitsCommand';

const readSchema: RequestSchema = Joi.object<Record<keyof NextApiRequest, AnySchema>>({
  query: Joi.object<APIQueryParams.UnitRead>({
    organizationId: Joi.number().required()
  }).required()
});

const createSchema = Joi.object<Record<keyof NextApiRequest, AnySchema>>({
  method: 'POST',
  body: Joi.object<APIRequestBody.UnitCreate>({
    abbreviation: Joi.string().required(),
    name: Joi.string().required(),
    organizationId: Joi.number().required()
  }).required()
});

const readUnits = (req: NextApiRequest, res: NextApiResponse<Unit[]>) => {
  const query = req.query as APIQueryParams.UnitRead;
  const { organizationId } = query;
  return new Promise((resolve, reject) => {
    const getCropCommand = new ReadUnitsCommand(Number(organizationId));

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

const createUnit = (req: NextApiRequest, res: NextApiResponse<Unit>) => {
  const unit = req.body as APIRequestBody.UnitCreate;
  return new Promise((resolve, reject) => {
    const createUnitCommand = new CreateUnitCommand(unit);
    const transaction = new SequentialTransaction([createUnitCommand]);
    transaction
      .execute()
      .then(([newOrg]) => {
        if (newOrg) {
          res.status(StatusCodes.OK).send(newOrg);
          resolve(newOrg);
        } else {
          throw new Error('Failed to create organization');
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
    [HttpMethod.GET]: readSchema,
    [HttpMethod.POST]: createSchema
  },
  handlers: {
    [HttpMethod.GET]: readUnits,
    [HttpMethod.POST]: createUnit
  }
});
