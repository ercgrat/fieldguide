import type { NextApiRequest, NextApiResponse } from 'next';
import { Organization, UnitSystem } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import Joi, { AnySchema } from 'joi';
import { RequestSchema, withRouteSetup } from 'utils/middleware';
import { validateEmail, validatePhoneNumber } from 'utils/validation';
import { HttpMethod, HttpResponseHeader } from 'utils/enums';
import { APIQueryParams, APIRequestBody } from 'types/backend';
import CreateOrganizationCommand from 'db/organizations/CreateOrganizationCommand';
import { SequentialTransaction } from 'db/Transaction';
import GetOrganizationCommand from 'db/organizations/GetOrganizationCommand';

const getSchema: RequestSchema = Joi.object<Record<keyof NextApiRequest, AnySchema>>({
  query: Joi.object<APIQueryParams.Organization>({
    name: Joi.string(),
    userId: Joi.string()
  }).required()
});

const postSchema = Joi.object<Record<keyof NextApiRequest, AnySchema>>({
  method: 'POST',
  body: Joi.object<APIRequestBody.OrganizationCreate>({
    name: Joi.string().required(),
    street1: Joi.string().required(),
    street2: Joi.string().allow(''),
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
    const getOrganizationsCommand = new GetOrganizationCommand(userId ?? '', name);
    const transaction = new SequentialTransaction([getOrganizationsCommand]);
    transaction
      .execute()
      .then(([organizations]) => {
        if (organizations) {
          res.status(StatusCodes.OK).json(organizations);
        } else {
          res.status(StatusCodes.NOT_FOUND);
        }
        resolve(organizations);
      })
      .catch((e: Error) => {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .setHeader(HttpResponseHeader.Error, JSON.stringify(e));
        reject();
      });
  });
};

const createOrganization = (req: NextApiRequest, res: NextApiResponse<Organization>) => {
  const { userId, ...organization } = req.body as APIRequestBody.OrganizationCreate;
  return new Promise((resolve, reject) => {
    const createOrganizationCommand = new CreateOrganizationCommand(organization, userId);
    const transaction = new SequentialTransaction([createOrganizationCommand]);
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
    [HttpMethod.GET]: getSchema,
    [HttpMethod.POST]: postSchema
  },
  handlers: {
    [HttpMethod.GET]: getOrganizations,
    [HttpMethod.POST]: createOrganization
  }
});
