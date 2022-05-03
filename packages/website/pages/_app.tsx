import type { AppProps } from 'next/app'
import 'w3r-modal/index.css'
import { cssStringFromTheme, defaultTheme } from 'w3r-modal'
import '@fontsource/chivo/latin.css'
import '@fontsource/fira-code/latin-400.css'
import './global.css'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'

const theme = cssStringFromTheme(defaultTheme)

const App = ({ pageProps, Component }: AppProps) => {
  return (
    <>
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
