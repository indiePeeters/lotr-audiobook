import './App.scss'
import './styles/index.scss'
import { ApolloProvider } from '@apollo/client';
import createApolloClient from '@/plugins/graphql/apollo/apollo';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/styles/theme.tsx';
import Router from '@/router';

export const apolloClient = createApolloClient({ uri: import.meta.env.VITE_GRAPHQL_ENDPOINT ?? '' });

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
            <div className='content-wrapper'>
              <div className="content-fade">
                <div className='content'>
                  <Router/>
                </div>
              </div>
            </div>
        </ApolloProvider>
      </ThemeProvider>
    </>
  )
}

export default App
