import { gql } from 'apollo-server-express';
import {
  commonTypeDefs,
  EarthquakeUpdateInput,
} from 'graphql-common/src/types';

export const typeDefs = gql`
  ${commonTypeDefs}
  ${EarthquakeUpdateInput}

  type EarthquakeResponse {
    data: [Earthquake!]!
    success: Boolean!
    total: Int!
  }

  type Query {
    earthquakes(pageSize: Int!, current: Int!): EarthquakeResponse!
    earthquake(id: ID!): Earthquake
  }

  type Mutation {
    addEarthquake(
      location: String!
      magnitude: Float!
      date: String!
    ): Earthquake
    updateEarthquake(id: ID!, data: EarthquakeUpdateInput!): Earthquake
    deleteEarthquake(id: ID!): String
  }
`;
