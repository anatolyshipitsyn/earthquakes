import { Layout } from '@/components/Layout';
import { EarthquakeCatalog } from '@/components/EarthquakeCatalog';

const Home = () => {
  return (
    <Layout subTitle="Data Exporer">
      <EarthquakeCatalog />
    </Layout>
  );
};

export default Home;
