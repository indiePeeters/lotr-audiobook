import { ApolloLink, DefaultOptions } from '@apollo/client';

export interface ApolloOptions extends DefaultOptions {
  uri: string,
  httpMiddleware?: ApolloLink[]
  websocketMiddleware?: ApolloLink[]
}
