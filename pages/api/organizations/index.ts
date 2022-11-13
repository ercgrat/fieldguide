import type { NextApiRequest, NextApiResponse } from 'next';
import { Organization, UnitSystem, Role } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { db } from 'utils/db';
import Joi, { AnySchema } from 'joi';
import { RequestSchema, withHttpMethods, withValidation } from 'utils/middleware';
import { validateEmail, validatePhoneNumber } from 'utils/validation';
import { HttpMethod, HttpResponseHeader } from 'utils/enums';
import { APIQueryParams, APIRequestBody } from 'types/backend';

const getSchema: RequestSchema = Joi.object<Record<keyof NextApiRequest, AnySchema>>({
  query: Joi.object<APIQueryParams.Organization>({
    name: Joi.string(),
    userId: Joi.string()
  }).required()
});

const postSchema = Joi.object<Record<keyof NextApiRequest, AnySchema>>({
  method: 'POST',
  body: Joi.object<APIRequestBody.CreateOrganization>({
    name: Joi.string().required(),
    street1: Joi.string().required(),
    street2: Joi.string(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postCode: Joi.string().required(),
    email: Joi.string()
      .required()
      .custom(v => validateEmail(v)),
    phone: Joi.string().custom(v => validatePhoneNumber(v)),
    unitSystem: Joi.string().valid(...Object.values(UnitSystem)),
    userId: Joi.string().required()
  }).required()
});

const getOrganizations = (req: NextApiRequest, res: NextApiResponse<Organization[]>) => {
  const query = req.query as APIQueryParams.Organization;
  const { userId, name } = query;

  return new Promise((resolve, reject) => {
    db.organization
      .findMany({
        where: {
          name,
          ...(userId
            ? {
                Membership: {
                  some: {
                    userId
                  }
                }
              }
            : {})
        }
      })
      .then(organizations => {
        if (organizations) {
          res.status(StatusCodes.OK).json(organizations);
        } else {
          res.status(StatusCodes.NOT_FOUND);
        }
        resolve(organizations);
      })
      .catch(() => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        reject();
      });
  });
};

const createOrganization = (req: NextApiRequest, res: NextApiResponse<Organization>) => {
  const { userId, ...organization } = req.body as APIRequestBody.CreateOrganization;
  return new Promise((resolve, reject) => {
    db.organization
      .create({
        data: {
          ...organization,
          Membership: {
            create: {
              role: Role.Owner,
              userId
            }
          }
        }
      })
      .then(newOrg => {
        res.status(StatusCodes.OK).send(newOrg);
        resolve(newOrg);
      })
      .catch((e: Error) => {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .setHeader(HttpResponseHeader.Error, JSON.stringify(e));
        reject(e.message);
      });
  });
};

const schemas = {
  [HttpMethod.GET]: getSchema,
  [HttpMethod.POST]: postSchema
};
export default withValidation(
  schemas,
  withHttpMethods({
    [HttpMethod.GET]: getOrganizations,
    [HttpMethod.POST]: createOrganization
  })
);
