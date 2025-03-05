import { gql } from '@apollo/client';
import { EARTHQUAKE_FRAGMENT } from 'graphql-common/src/fragments';

export const GET_EARTHQUAKES = gql`
  query GetEarthquakes($pageSize: Int!, $current: Int!) {
    earthquakes(pageSize: $pageSize, current: $current) {
      success
      total
      data {
        ...EarthquakeFields
        __typename
      }
      __typename
    }
  }
  ${EARTHQUAKE_FRAGMENT}
`;
