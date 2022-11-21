import { StatusCodes } from 'http-status-codes';
import Joi, { AnySchema } from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';
import { HttpMethod, HttpResponseHeader } from './enums';

export const withRouteSetup = <T>(args: {
  schemas?: Partial<Record<HttpMethod, RequestSchema>>;
  handlers: Partial<
    Record<HttpMethod, (req: NextApiRequest, res: NextApiResponse) => Promise<unknown> | undefined>
  >;
}) => {
  return async (req: NextApiRequest, res: NextApiResponse<T>) => {
    const method = req.method as HttpMethod | undefined;
    if (!method) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .setHeader(HttpResponseHeader.Error, 'No HTTP method specified')
        .end();
      return;
    }

    const schema = args.schemas?.[method];
    if (!schema) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .setHeader(
          HttpResponseHeader.Error,
          'No validation schema specified when using `withValidation` middleware'
        )
        .end();
      return;
    }

    const { error } = schema?.unknown().validate(req) ?? {};
    if (error) {
      res.status(StatusCodes.BAD_REQUEST).setHeader(HttpResponseHeader.Error, error.message).end();
      return;
    }

    const handler = args.handlers[method];
    if (!handler) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .setHeader(HttpResponseHeader.Error, 'No handler specified for HTTP method')
        .end();
      return;
    }

    return handler(req, res);
  };
};

export type RequestSchema = Joi.ObjectSchema<Record<keyof NextApiRequest, AnySchema>>;
