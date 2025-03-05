import Joi from 'joi';

import { appSchema } from './app';

export const validationSchema = Joi.object({
  ...appSchema,
});

export const validationResult = validationSchema.validate(process.env, {
  abortEarly: false,
  allowUnknown: true,
});
