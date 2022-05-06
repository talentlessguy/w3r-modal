import type { AppProps } from 'next/app'
import 'w3r-modal/index.css'
import { cssStringFromTheme, defaultTheme } from 'w3r-modal'
import '@fontsource/chivo/latin.css'
import '@fontsource/fira-code/latin-400.css'
import './global.css'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import Head from 'next/head'

const theme = cssStringFromTheme(defaultTheme)

const App = ({ pageProps, Component }: AppProps) => {
  return (
    <>
      <Head>
        <meta property="og:url" content="https://www.w3r-modal.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/preview.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="http://www.genie.xyz/preview.png" />
        <meta property="og:description" content="Simple Web3 wallet modal library based on web3-react." />
      </Head>
      <style jsx global>
        {`
          :root {
            ${theme}
          }
        `}
      </style>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default App
