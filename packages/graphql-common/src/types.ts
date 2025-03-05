import { gql } from 'apollo-server';

export const commonTypeDefs = gql`
  type Earthquake {
    id: ID!
    location: String!
    magnitude: Float!
    date: String!
  }
`;

export interface Earthquake {
  id: number;
  location: string;
  magnitude: number;
  date: Date | string | number;
}

export interface GetEarthquakesInput {
  current: number;
  pageSize: number;
}

export interface PaginatedEarthquakes {
  data: Earthquake[];
  total: number;
}

export const EarthquakeUpdateInput = `
  input EarthquakeUpdateInput {
    location: String
    magnitude: Float
    date: String
  }
`;
