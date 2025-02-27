import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { ApolloOptions } from './apolloOptions';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createHttpLink = (apolloOptions: ApolloOptions): ApolloLink =>
  // in this example we consume a Hasura graphql instance with an admin key, when consuming another graphql instance change this line
  new HttpLink({
    uri: apolloOptions.uri,
  });

const createApolloClient = (apolloOptions: ApolloOptions): ApolloClient<NormalizedCacheObject> => {
  const httpLink = createHttpLink(apolloOptions);

  apolloClient = new ApolloClient<NormalizedCacheObject>({ link: httpLink, cache: new InMemoryCache(), defaultOptions: apolloOptions });
  return apolloClient;
};

export default createApolloClient;
