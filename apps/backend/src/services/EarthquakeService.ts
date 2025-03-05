import { GetEarthquakesInput } from 'graphql-common/src/types';

import { getDataSource } from '@/database/data-source';
import { Earthquake } from '@/database/entity/EarthquakeEntity';
import {
  EarthquakeData,
  EarthquakeRepository,
} from '@/database/repositories/EarthquakeRepository';

export class EarthquakeService {
  private repository = new EarthquakeRepository();

  async getAllEarthquakes({ current, pageSize }: GetEarthquakesInput) {
    const dataSource = await getDataSource();
    const [data, total] = await dataSource
      .getRepository(Earthquake)
      .findAndCount({
        skip: (current - 1) * pageSize,
        take: pageSize,
        order: {
          id: 'DESC',
        },
      });

    return { data, success: true, total };
  }

  async getEarthquakeById(id: number): Promise<Earthquake | null> {
    return this.repository.findById(id);
  }

  async addEarthquake(
    data: Omit<Earthquake, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Earthquake> {
    return this.repository.create(data);
  }

  async updateEarthquake(id: number, data: EarthquakeData) {
    console.log('updateEarthquake service', { id, data });

    return this.repository.update(id, data);
  }

  async deleteEarthquake(id: number): Promise<string> {
    await this.repository.delete(id);

    return `Earthquake with ID ${id} was deleted successfully.`;
  }
}
