import React from 'react';
import { AppProps } from 'next/app';
import Navbar from '../components/Navbar'; 
import { Provider } from 'react-redux';
import store from '../store/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Navbar /> {}
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
