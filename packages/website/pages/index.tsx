import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Example } from '../components/Example'
import * as styles from './index.css'

export default function Index() {
  return (
    <main className={styles.main}>
      <Head>
        <title>w3r-modal</title>
        <meta property="og:title" content="w3r-modal" />
      </Head>
      <Image src="/logo.png" height={232} width={292} alt="Logo" />
      <h1 className={styles.h1}>w3r-modal</h1>
      <span className={styles.caption}>Simple Web3 wallet modal library.</span>

      <div className={styles.linkRow}>
        <Example />
        <Link href="/docs/get-started">
          <a className={styles.docsLink}>Get Started</a>
        </Link>
      </div>
      <div className={styles.featureGrid}>
        <div className={styles.feature}>
          <h2>Auto Connect</h2>
          <p>
            Previously chosen wallets gets automatically connected after page load and is forgotten after disconnecting.
          </p>
        </div>
        <div className={styles.feature}>
          <h2>Built-in modal</h2>
          <p>
            w3r-modal comes with a basic modal component, which supports theming, filters wallets by device and has good
            accessibility by default.
          </p>
        </div>
        <div className={styles.feature}>
          <h2>Fresh {'&'} clean</h2>
          <p>
            w3r-modal is based on v8 version of web3-react, unlike most of the libraries and apps using the unmaintained
            and outdated v6 version.
          </p>
        </div>
      </div>
    </main>
  )
}
