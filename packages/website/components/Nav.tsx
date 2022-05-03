import Image from 'next/image'
import Link from 'next/link'
import * as styles from './Nav.css'

export const Nav = () => {
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a className={styles.logo}>
          <Image src="/logo_small.png" height={50} width={50} />
        </a>
      </Link>
      <Link href="/docs/get-started">
        <a className={styles.link}>Get Started</a>
      </Link>
      <Link href="/docs/api">
        <a className={styles.link}>API</a>
      </Link>
      <a className={styles.link} href="https://github.com/talentlessguy/w3r-modal" target="_blank" rel="noreferer">
        Source
      </a>
    </nav>
  )
}
