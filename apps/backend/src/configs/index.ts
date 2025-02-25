import Joi from 'joi';

import { typeormSchema } from './typeorm';

export const validationSchema = Joi.object({
  ...typeormSchema,
});

export const validationResult = validationSchema.validate(process.env, {
  abortEarly: false,
  allowUnknown: true,
});
