import Link from 'next/link'
import * as styles from './Contents.css'

export const Contents = ({ links, currentPage }: { links: { title: string; slug: string }[]; currentPage: string }) => {
  return (
    <div className={styles.container}>
      <div className={styles.contents}>Contents</div>
      <ul className={styles.ul}>
        {links.map(({ slug, title }) => (
          <li key={slug}>
            <Link href={`/docs/${slug}`}>
              <a className={`${styles.link} ${slug === currentPage ? styles.currentLink : ''}`}>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
