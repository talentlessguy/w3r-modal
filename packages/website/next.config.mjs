import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'

const withVanillaExtract = createVanillaExtractPlugin()

/**
 * @type {import('next').NextConfig}
 */
const config = {
  pageExtensions: ['tsx'],
  redirects: async () => {
    return [
      {
        source: '/docs',
        destination: '/docs/get-started',
        permanent: true
      }
    ]
  }
}

export default withVanillaExtract(config)
