import { gql } from '@apollo/client';
import { EARTHQUAKE_FRAGMENT } from 'graphql-common/src/fragments';

export const UPDATE_EARTHQUAKE = gql`
  mutation UpdateEarthquake($id: ID!, $data: EarthquakeUpdateInput!) {
    updateEarthquake(id: $id, data: $data) {
      ...EarthquakeFields
      __typename
    }
  }
  ${EARTHQUAKE_FRAGMENT}
`;

export const DELETE_EARTHQUAKE = gql`
  mutation DeleteEarthquake($id: ID!) {
    deleteEarthquake(id: $id)
  }
`;