import { readdir, readFile } from 'fs/promises'
import { GetStaticPaths, GetStaticProps } from 'next'
import path from 'node:path'
import * as styles from './[slug].css'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import withShiki from '@stefanprobst/remark-shiki'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import dynamic from 'next/dynamic'
import { Contents } from '../../components/Contents'
import { useMemo } from 'react'
import Head from 'next/head'

type PageProps = {
  source: string
  slug: string
  frontmatter: Record<string, string>
  slugs: string[]
}

const links = {
  'get-started': 'Get Started',
  theming: 'Theming',
  tips: 'Tips',
  api: 'API'
}

const components = {}

export default function DocsPage({ source, slug, frontmatter, slugs }: PageProps) {
  if (slug === 'get-started') {
    components['Example'] = dynamic(() => import('../../components/Example').then((m) => m.Example), { ssr: false })
  }

  const generatedLinks = useMemo(() => {
    return slugs.map((path) => ({
      title: links[path],
      slug: path
    }))
  }, [])

  return (
    <main className={styles.main}>
      <Head>
        <title>{frontmatter.title} | w3r-modal</title>
        <meta property="og:title" content={`${frontmatter.title} | w3r-modal`} />
      </Head>
      <Contents links={generatedLinks} currentPage={slug} />
      <div>
        <h1>{frontmatter.title}</h1>
        <article className={styles.article}>
          <MDXRemote compiledSource={source} components={components} />
        </article>
      </div>
    </main>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const POSTS_PATH = path.join(process.cwd(), 'docs')
  const slug = params.slug as string
  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`)
  const content = (await readFile(postFilePath)).toString()
  const slugs = (await readdir(POSTS_PATH))
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path))
    // Remove file extensions for page paths
    .map((p) => p.replace(/\.mdx$/, ''))

  const shiki = await import('shiki')

  const highlighter = await shiki.getHighlighter({ theme: 'nord' })

  if (!content) {
    return {
      notFound: true
    }
  }

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [[withShiki, { highlighter }], remarkGfm],
      rehypePlugins: [[rehypeRaw, { passThrough: ['mdxJsxFlowElement'] }]]
    },
    parseFrontmatter: true
  })

  return {
    props: {
      source: mdxSource.compiledSource,
      frontmatter: mdxSource.frontmatter as Record<string, string>,
      slug,
      slugs
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const POSTS_PATH = path.join(process.cwd(), 'docs')
  const paths = (await readdir(POSTS_PATH))
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path))
    // Remove file extensions for page paths
    .map((p) => p.replace(/\.mdx$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false
  }
}
