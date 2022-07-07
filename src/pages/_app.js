import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import ProgressBar from '@badrap/bar-of-progress'
import { Router } from 'next/router'

const MyApp = ({ Component, pageProps:{ session, ...pageProps }, }) => {

  const progress = new ProgressBar({
    size:4,
    color:'#facc15',
    className:'z-50',
    delay:100,
  });
  Router.events.on('routeChangeStart', progress.start);
  Router.events.on('routeChangeError', progress.finish);
  Router.events.on('routeChangeComplete', progress.finish);
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
