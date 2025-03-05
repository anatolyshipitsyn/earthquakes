import Joi from 'joi';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const apolloConfig = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/graphql',
  }),
  cache: new InMemoryCache(),
});

export const appSchema = {
  NEXT_PUBLIC_API_URL: Joi.string().required(),
};
