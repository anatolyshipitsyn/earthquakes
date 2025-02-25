import 'reflect-metadata';

import { DataSource, DataSourceOptions } from 'typeorm';

import { typeormConfig } from '../configs/typeorm';

import { Earthquake } from './entity/EarthquakeEntity';

export const dataSourceOptions: DataSourceOptions = {
  ...typeormConfig,
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  entities: [Earthquake],
  synchronize: false,
  logging: false,
};

export const AppDataSource = new DataSource(dataSourceOptions);

export const getDataSource = async (): Promise<DataSource> => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  return AppDataSource;
};
