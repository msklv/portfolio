import Link from 'next/link'
import { getPosts } from '../../posts/get-posts'

export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await getPosts()
  const allTags = new Set(posts.flatMap(post => post.frontMatter.tags ?? []))
  return [...allTags].map(tag => ({ tag }))
}

export async function generateMetadata({ params }) {
  const { tag } = await params
  return { title: `#${tag}` }
}

export default async function TagPage({ params }) {
  const { tag } = await params
  const filtered = (await getPosts()).filter(post =>
    (post.frontMatter.tags ?? []).includes(tag)
  )
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
      <h1>Посты с тегом #{tag}</h1>
      {filtered.map(post => (
        <Link key={post.route} href={post.route} style={{ textDecoration: 'underline' }}>
          {post.frontMatter.title}
        </Link>
      ))}
    </div>
  )
}