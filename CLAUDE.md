# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Michael Sokolov's personal website (sokolov.im) — a content-driven blog/portfolio built with Next.js and [Nextra](https://nextra.vercel.app/) (`nextra-theme-blog`). Content is primarily in Russian. There is almost no application logic here; nearly all changes are Markdown/MDX content edits, not code.

## Commands

```bash
yarn              # install dependencies
yarn dev           # start dev server (next)
yarn build         # generate RSS feed then build (node ./scripts/gen-rss.js && next build)
yarn start         # start production server
```

There are no lint or test scripts configured in `package.json`.

To upgrade dependencies interactively: `yarn upgrade-interactive --latest`

## Architecture

- **Framework**: Next.js `pages` router with Nextra's blog theme, configured in `next.config.js` (`nextra('nextra-theme-blog', './theme.config.js')`) and `theme.config.js` (site footer).
- **Content is routing**: every file under `pages/` is a route. Blog posts live in `pages/posts/*.md`. Top-level pages (`index.mdx`, `certificates.mdx`) are standalone MDX pages. `pages/tags/[tag].mdx` is a dynamic route that lists posts by tag using `useRouter().query.tag`.
- **Post frontmatter contract**: every post in `pages/posts/` needs YAML frontmatter with `title`, `date`, `description`, `tag` (comma-separated string, e.g. `"speech, devops"`), and `author`. `pages/posts/index.md` is the posts index page itself (has `type: posts`) and is skipped when generating the RSS feed.
- **RSS generation**: `scripts/gen-rss.js` runs as a pre-build step (see `build` script). It reads every file in `pages/posts/` (skipping anything starting with `index.`), parses frontmatter with `gray-matter`, and writes `public/feed.xml`. `feed.xml` is gitignored — it's generated, not committed. If you add/edit a post's frontmatter, this feed picks it up automatically on next build.
- **Global chrome**: `pages/_app.js` imports the Nextra theme CSS and `styles/main.css`, and injects the RSS `<link>` and font preload into `<Head>`. `pages/_document.js` sets the page-wide `<html lang="ru">`, default meta/OG/Twitter tags (site title, description, share image), and is the place to change sitewide SEO defaults.
- **Assets**: images referenced by posts live in `public/images/`; fonts in `public/fonts/`.
- **Disabled/draft content**: `pages/blog.mdx_` uses a `.mdx_` extension (not `.mdx`) specifically so Next.js does *not* route it — it's an intentionally disabled page. `markdown.md` at the repo root (outside `pages/`) is an unrouted Nextra example/reference file, not live content.

## Adding a new blog post

1. Create `pages/posts/<slug>.md` with frontmatter: `title`, `date` (format `YYYY/M/D`), `description`, `tag` (comma-separated), `author`.
2. Write content in Markdown/MDX below the frontmatter (MDX components like `next/image` can be imported directly in the file, as in `pages/posts/highload-2024.md`).
3. Images go in `public/images/` and are referenced as `/images/<file>`.
4. The RSS feed regenerates automatically on `yarn build`; no manual step needed.
