import { AppProps } from 'next/app';
import './_app.css';
import '../styles/globals.css';

interface CustomPageProps {
}

const MyApp = ({ Component, pageProps }: AppProps<CustomPageProps>) => {
  return <Component {...pageProps} />
}

export default MyApp;
