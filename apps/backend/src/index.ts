import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import express from 'express';

import { resolvers } from '@/graphql/resolvers';
import { typeDefs } from '@/graphql/schema';


async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  app.use('/graphql', bodyParser.json(), expressMiddleware(server));

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  });
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
});
