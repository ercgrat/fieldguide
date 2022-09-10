import type { NextApiRequest, NextApiResponse } from 'next';
import { Organization } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { db } from 'utils/db';

export default (req: NextApiRequest, res: NextApiResponse<Organization[]>) => {
  if (typeof req.query.userId !== 'string') {
    res.status(StatusCodes.BAD_REQUEST);
    return;
  }
  const userId = req.query.userId;

  return new Promise((resolve, reject) => {
  db.organization
    .findMany({
      where: {
        Membership: {
          some: {
            userId
          }
        }
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
