import '../styles/globals.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { LinkProvider } from '../src/context';

function MyApp({ Component, pageProps }) {
  return (
    <LinkProvider>
      <Component {...pageProps} />
    </LinkProvider>

  )
}

export default MyApp