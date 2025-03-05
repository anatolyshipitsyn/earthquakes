import { gql } from '@apollo/client';

export const EARTHQUAKE_FRAGMENT = gql`
  fragment EarthquakeFields on Earthquake {
    id
    location
    magnitude
    date
    __typename
  }
`;
