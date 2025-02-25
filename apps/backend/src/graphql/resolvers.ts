import { AppDataSource } from '@/database/data-source';
import { Earthquake } from '@/database/entity/EarthquakeEntity';

export const resolvers = {
  Query: {
    earthquakes: async () => AppDataSource.getRepository(Earthquake).find(),
  },
  Mutation: {
    addEarthquake: async (
      _: any,
      {
        location,
        magnitude,
        date,
      }: { location: string; magnitude: number; date: string }
    ) => {
      const repository = AppDataSource.getRepository(Earthquake);
      const earthquake = repository.create({
        location,
        magnitude,
        date: new Date(date),
      });

      return await repository.save(earthquake);
    },
  },
};
