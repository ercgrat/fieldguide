import { NextApiRequest, NextApiResponse } from 'next';
import { GOOGLE_CLIENT_ID } from '../../utils/const';
import { OAuth2Client } from 'google-auth-library';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const idToken = req.query['token'];
  console.log('login handled!', idToken);
  if (typeof idToken !== 'string') {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }

  const client = new OAuth2Client(GOOGLE_CLIENT_ID);
  await client
    .verifyIdToken({
      idToken
    })
    .then(() => {
      res.status(StatusCodes.OK).send(ReasonPhrases.OK);
    })
    .catch(() => {
      res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    });
};
