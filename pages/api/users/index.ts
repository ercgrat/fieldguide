import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import { RequestSchema, withRouteSetup } from 'utils/middleware';
import { HttpMethod } from 'utils/enums';
import { APIQueryParams } from 'types/backend';
import GetUserCommand from 'db/users/getUserCommand';
import { SequentialTransaction } from 'db/Transaction';

const getSchema: RequestSchema = Joi.object({
  query: Joi.object<APIQueryParams.UserRead>({
    email: Joi.string().required()
  })
});

const getUser = (req: NextApiRequest, res: NextApiResponse<User>) => {
  const query = req.query as APIQueryParams.UserRead;
  const { email } = query;
  return new Promise((resolve, reject) => {
    const getUserCommand = new GetUserCommand(email);
    const transaction = new SequentialTransaction([getUserCommand]);
    transaction
      .execute()
      .then(([user]) => {
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
};

export default withRouteSetup({
  schemas: {
    [HttpMethod.GET]: getSchema
  },
  handlers: {
    [HttpMethod.GET]: getUser
  }
});
