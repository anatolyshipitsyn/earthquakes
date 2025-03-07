import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { validationResult } from '@/configs';
import { getDataSource } from '@/database/data-source';
import { earthquakeResolvers } from '@/graphql/resolvers';
import { typeDefs } from '@/graphql/schema';
import { Logger } from '@/utils/logger';

async function initializeDatabase(): Promise<void> {
  try {
    await getDataSource();
    Logger.log('Database initialized successfully.');
  } catch (error) {
    Logger.error('Database initialization error:', error);
    process.exit(1);
  }
}

function configureMiddleware(
  app: express.Application,
  server: ApolloServer
): void {
  app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server));
}

async function startServer() {
  if (validationResult.error) {
    throw new Error(
      `Config validation error: ${validationResult.error.message}`
    );
  }

  await initializeDatabase();

  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: earthquakeResolvers,
  });

  await apolloServer.start();
  configureMiddleware(app, apolloServer);

  app.listen({ port: 4000 }, () => {
    Logger.log(`🚀 Server ready at http://localhost:4000/graphql`);
  });
}

startServer().catch((error) => {
  Logger.error('Error starting server:', error);
});
