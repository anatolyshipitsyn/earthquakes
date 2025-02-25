import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Earthquake {
    id: ID!
    location: String!
    magnitude: Float!
    date: String!
  }

  type Query {
    earthquakes: [Earthquake]
  }

  type Mutation {
    addEarthquake(
      location: String!
      magnitude: Float!
      date: String!
    ): Earthquake
  }
`;
