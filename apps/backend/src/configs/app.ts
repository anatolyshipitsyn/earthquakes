import Joi from 'joi';

export const appConfig = {
  defaultPrecision: 2,
  defaultPageSize: 20,
  configTransferSecret: process.env.CONFIG_TRANSFER_SECRET,
};

export const appSchema = {
  CONFIG_TRANSFER_SECRET: Joi.string().required(),
};
