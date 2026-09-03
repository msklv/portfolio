const { promises: fs } = require('fs')
const path = require('path')
const RSS = require('rss')
const matter = require('gray-matter')

async function generate() {
  const feed = new RSS({
    title: 'Михаил Соколов',
    site_url: 'https://sokolov.im/',
    feed_url: 'https://sokolov.im/feed.xml'
  })

  const posts = await fs.readdir(path.join(__dirname, '..', 'app', 'posts'))

  await Promise.all(
    posts.map(async (name) => {
      if (name.startsWith('index.') || name.startsWith('.')) return
      if (/\.(jsx?|mdx?)$/.test(name)) return

      const content = await fs.readFile(
        path.join(__dirname, '..', 'app', 'posts', name, 'page.mdx')
      )
      const frontmatter = matter(content)

      feed.item({
        title: frontmatter.data.title,
        url: '/posts/' + name,
        date: frontmatter.data.date,
        description: frontmatter.data.description,
        categories: frontmatter.data.tags ?? frontmatter.data.tag,
        author: frontmatter.data.author
      })
    })
  )

  await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }))
}

generate()
