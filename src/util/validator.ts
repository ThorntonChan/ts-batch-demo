import { z } from 'zod';
import { Response } from 'express';

export function validateOrError<T extends z.ZodTypeAny>(data: any, schema: T) {
  const safeParse = schema.safeParse(data);
  if (!safeParse.success) {
    throw new Error(
        `${safeParse.error.errors.map((e) => `${e.path.join('.')}: Validation error: ${e.message}`).join('. ')}`
    );
  }
  return safeParse.data as z.infer<typeof schema>;
}

export function handleErrorResponse(res: Response, error: any) {
  if (error instanceof Error) {
    res.status(500).send({error: error.message});
  } else {
    // e is not an Error object
    res.status(500).send({error: 'An unknown error occurred'});
  }
}