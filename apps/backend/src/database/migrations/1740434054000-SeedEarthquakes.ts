import { MigrationInterface, QueryRunner } from 'typeorm';

import { Earthquake } from '../entity/EarthquakeEntity';
import earthquakesData from './data/earthquakes1970-2014.json';

type EarthquakeJSON = {
  Latitude: number;
  Longitude: number;
  Magnitude: number;
  DateTime: string;
};

// noinspection JSUnusedGlobalSymbols
export class SeedEarthquakes1740434054000 implements MigrationInterface {
  name = 'SeedEarthquakes1740434054000';

  private convertToEarthquakeEntities(data: EarthquakeJSON[]): Earthquake[] {
    return data.map((item) =>
      Object.assign(new Earthquake(), {
        location: `${item.Latitude} ${item.Longitude}`,
        magnitude: item.Magnitude,
        date: new Date(item.DateTime),
      })
    );
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      const repository = queryRunner.manager.getRepository(Earthquake);

      const earthquakeEntities = this.convertToEarthquakeEntities(
        earthquakesData as EarthquakeJSON[]
      );

      await repository.save(earthquakeEntities);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM "earthquake"');
  }
}
