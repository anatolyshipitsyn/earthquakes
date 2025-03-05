import { GET_EARTHQUAKES } from '@/app/graphql/queries';
import { apolloConfig } from '@/app/configs/apollo';

export const fetchEarthquakeList = async (params: {
  pageSize?: number;
  current?: number;
}) => {
  try {
    const { data } = await apolloConfig.query({
      query: GET_EARTHQUAKES,
      variables: {
        pageSize: params.pageSize,
        current: params.current,
      },
    });

    return {
      data: data.earthquakes.data,
      success: true,
      total: data.earthquakes.total,
    };
  } catch (error) {
    console.error('Error fetching earthquakes:', error);
    return { data: [], success: false };
  }
};
