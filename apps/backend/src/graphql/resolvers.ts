import { Earthquake, GetEarthquakesInput } from 'graphql-common/src/types';

import { EarthquakeData } from '@/database/repositories/EarthquakeRepository';
import { EarthquakeService } from '@/services/EarthquakeService';

const earthquakeService = new EarthquakeService();

export const earthquakeResolvers = {
  Query: {
    earthquakes: async (_parent: unknown, args: GetEarthquakesInput) => {
      return earthquakeService.getAllEarthquakes(args);
    },
  },

  Mutation: {
    addEarthquake: async (
      _parent: unknown,
      { data }: { data: EarthquakeData }
    ): Promise<Earthquake> => {
      return earthquakeService.addEarthquake(data);
    },
    updateEarthquake: async (
      _parent: unknown,
      { id, data }: { id: number; data: EarthquakeData }
    ): Promise<Earthquake> => {
      return earthquakeService.updateEarthquake(id, data);
    },
    deleteEarthquake: async (
      _parent: unknown,
      { id }: { id: number }
    ): Promise<string> => earthquakeService.deleteEarthquake(id),
  },
};
