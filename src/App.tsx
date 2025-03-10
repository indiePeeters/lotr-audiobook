import './App.scss'
import './styles/index.scss'
import { ApolloProvider } from '@apollo/client';
import createApolloClient from '@/plugins/graphql/apollo/apollo';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/styles/theme.tsx';
import Router from '@/router';
import i18n from '@/plugins/i18n/i18n.ts'
import { I18nextProvider } from 'react-i18next';

export const apolloClient = createApolloClient({ uri: import.meta.env.VITE_GRAPHQL_ENDPOINT ?? '' });

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <I18nextProvider i18n={i18n}>

            <div className='content-wrapper'>
              <div className="content-fade">
                <div className='content'>
                  <Router/>
                </div>
              </div>
            </div>
          </I18nextProvider>

        </ApolloProvider>
      </ThemeProvider>
    </>
  )
}

export default App
