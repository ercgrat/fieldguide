import { StatusCodes } from 'http-status-codes';
import Joi, { AnySchema } from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';
import { HttpMethod, HttpResponseHeader } from './enums';

export type RequestSchema = Joi.ObjectSchema<Record<keyof NextApiRequest, AnySchema>>;
export const withValidation = <T>(
  schemas: Partial<Record<HttpMethod, RequestSchema>>,
  handler: (req: NextApiRequest, res: NextApiResponse<T>) => Promise<unknown> | undefined
) => {
  return async (req: NextApiRequest, res: NextApiResponse<T>) => {
    const method = req.method as HttpMethod | undefined;
    if (!method) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .setHeader(HttpResponseHeader.Error, 'No HTTP method specified')
        .end();
      return;
    }

    const schema = schemas[method];
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

    return handler(req, res);
  };
};

export const withHttpMethods = (
  handlers: Partial<
    Record<HttpMethod, (req: NextApiRequest, res: NextApiResponse) => Promise<unknown> | undefined>
  >
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method as HttpMethod | undefined;
    if (!method) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .setHeader(HttpResponseHeader.Error, 'No HTTP method specified')
        .end();
      return;
    }

    const handler = handlers[method];
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
