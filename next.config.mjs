import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: true,
  readingTime: true
})

/** Resolve nextra's virtual `next-mdx-import-source-file` to a real provider. */
const virtualModule = {
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'next-mdx-import-source-file': 'nextra-theme-blog'
    }
    return config
  }
}

export default withNextra({
  ...virtualModule,
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    mdxRs: false
  }
})