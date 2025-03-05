import { Earthquake, GetEarthquakesInput } from 'graphql-common/src/types';

import { EarthquakeData } from '@/database/repositories/EarthquakeRepository';
import { EarthquakeService } from '@/services/EarthquakeService';

const earthquakeService = new EarthquakeService();

export const earthquakeResolvers = {
  Query: {
    earthquakes: async (_parent: unknown, args: GetEarthquakesInput) => {
      return earthquakeService.getAllEarthquakes(args);
    },
    // earthquake: async (
    //   _parent: unknown,
    //   { id }: { id: number }
    // ): Promise<Earthquake | null> => earthquakeService.getEarthquakeById(id),
  },

  Mutation: {
    // addEarthquake: async (
    //   _parent: unknown,
    //   { location, magnitude, date }: Omit<Earthquake, 'id'>
    // ): Promise<Earthquake> => {
    //   const earthquake = {
    //     location,
    //     magnitude,
    //     date: new Date(date),
    //   };
    //
    //   return earthquakeService.addEarthquake(earthquake);
    // },
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
