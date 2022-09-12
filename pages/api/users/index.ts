import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { db } from 'utils/db';
import Joi from 'joi';
import { RequestSchema, withHttpMethods, withValidation } from 'utils/middleware';
import { HttpMethod } from 'utils/enums';
import { APIQueryParams } from 'types/backend';

const getSchema: RequestSchema = Joi.object({
  query: Joi.object<APIQueryParams.User>({
    email: Joi.string().required()
  })
});

export default withValidation(
  {
    [HttpMethod.GET]: getSchema
  },
  withHttpMethods({
    [HttpMethod.GET]: (req: NextApiRequest, res: NextApiResponse<User>) => {
      const query = req.query as APIQueryParams.User;
      const { email } = query;
      return new Promise((resolve, reject) => {
        db.user
          .findFirst({
            where: {
              email
            }
          })
          .then(user => {
            if (user) {
              res.status(StatusCodes.OK).json(user);
            } else {
              res.status(StatusCodes.NOT_FOUND);
            }
            resolve(user);
          })
          .catch(() => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR);
            reject();
          });
      });
    }
  })
);
