import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { db } from 'utils/db';

export default (req: NextApiRequest, res: NextApiResponse<User>) => {
  if (typeof req.query.email !== 'string') {
    res.status(StatusCodes.BAD_REQUEST);
    return;
  }
  const email = req.query.email;

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
};
