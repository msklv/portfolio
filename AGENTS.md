# AGENTS.md for Portfolio Project

## Project Overview
This is a personal portfolio website built with Next.js and Nextra (Nextra-theme-blog). The site
features blog posts, case studies, and personal information as presented by Mikhail Sokolov.
Hosting is provided by Vercel.

## Build, Test, & Lint Commands

### Setup
```bash
yarn                           # Install dependencies
yarn build                     # Build the project (runs gen-rss.js + Next.js build)
yarn dev                       # Start development server
```

### Testing & Validation
```bash
# No explicit test commands found - this is a content-focused portfolio
# Build validation
yarn build

# Development mode
yarn dev
```

## Code Style Guidelines

### Prerequisites
- This project uses **Pre-commit formatting** configured in package.json
- Running tests must pass before committing (see Git Safety Protocol in tools)

### Import & Formatting Rules

**General Formatting:**
- Single quotes only (enforced by Prettier)
- 2-space tab width (enforced by Prettier)
- No trailing commas (enforced by Prettier)
- No semicolons (enforced by Prettier)
- Arrow parentheses required (e.g., `() => {}`)

**JavaScript/JSX Imports:**
```javascript
// Import Nextra theme styles explicitly
import 'nextra-theme-blog/style.css'

// Use next/image for images
import Image from 'next/image'

// Import local CSS
import '../styles/main.css'

// Import components from next/head
import Head from 'next/head'
```

**File Naming Convention:**
- Pages: `.mdx` files in the `pages/` root (e.g., `index.mdx`, `blog.mdx`)
- Blog Posts: `.mdx` files with frontmatter in `pages/posts/`
- Configuration: `.js` files (next.config.js, theme.config.js)
- Scripts: `.js` files for build automation

### Markdown / MDX Style

**Frontmatter Format (all MDX files):**
```yaml
---
type: page                    # For root pages (index, blog)
title: Page Title             # In Russian
date: YYYY-MM-DD              # Date in ISO format
---
```

**Blog Post Frontmatter:**
```yaml
---
type: post                    # Required for blog posts
title: Post Title
date: YYYY/MM/DD              # Local format preferred
description: Short description
tag: tag1, tag2               # Comma-separated tags
author: Author Name
---
```

### JSX/React Style

**Asynchronous Components:**
```javascript
export default async function MyComponent() {
  // Async components require explicit return from components that await
  const data = await fetchData()
  return <div>{data}</div>
}
```

**Image Components:**
```javascript
<Image 
  src="/images/filename.jpg" 
  alt="Description" 
  width={450} 
  height={450} 
  priority      // For above-fold images
  className="next-image logo"
/>
```

**Inline Styles:**
```javascript
// Preferred for simple, custom styles
<small style={{ display: 'block', marginTop: '8rem' }}>

// Style jsx tags for component-scoped styles
<style jsx>{`
  a {
    float: right;
  }
  @media screen and (max-width: 480px) {
    article {
      padding-top: 2rem;
      padding-bottom: 4rem;
    }
  }
`}</style>
```

### Naming Conventions

**Component Names:**
- PascalCase for React components (e.g., `Nextra`, `Image`, `ComponentName`)

**File Names:**
- Nextra pages: `index.mdx` (root), `blog.mdx` (root)
- Blog posts: `name.mdx` in `pages/posts/` (e.g., `tutorial-01.mdx`, `my-post.mdx`)
- Configuration: kebab-case (next.config.js, theme.config.js)

**CSS Classes:**
- Use BEM or kebab-case: `.main.css`, `.logo`, `.next-image`
- Custom styles in styles/ directory overwriting default Nextra theme

## Error Handling & Edge Cases

### Build Process
- Build script (`yarn build`) runs RSS generation before Next.js build
- RSS generation reads frontmatter from all blog posts in `pages/posts/`
- Skip RSS generation for `index.mdx` files in posts directory
- Frontmatter fields required: `title`, `date`, `description` (for RSS)
- Tags must be comma-separated: `tag: speech, management`

### Content Management
- Invalid frontmatter will cause build failures
- Missing or malformed dates cause issues with date sorting
- Image paths should use absolute paths: `src="/images/..."`

### Development
- Development server runs on default Next.js port (likely 3000)
- Font files in `public/fonts/` require preload in `_app.js`
- RSS feed is auto-generated, requires proper frontmatter in posts

## Important Files & Directories

- `pages/_app.js` - Main components wrapper, global styles, preloads
- `pages/_document.js` - HTML document template
- `theme.config.js` - Site configuration, footer, custom elements
- `next.config.js` - Next.js Nextra configuration
- `package.json` - Dependencies, build scripts, Prettier config
- `scripts/gen-rss.js` - RSS feed generation script
- `styles/main.css` - Custom styles override
- `pages/posts/` - Blog post storage (all MDX files)
- `pages/tags/` - Tag-based content
- `public/` - Static assets (images, fonts, favicon)
- `colors/` - Favicon and logo assets

## Git Safety Protocol

**IMPORTANT:**
- Commit only when user explicitly requests
- Pre-commit hooks are NOT configured (no .husky directory)
- NO automatic force pushing to main/master
- Development scripts must be explicitly asked for
- Other directories should NOT be changed without consultation
- Commit messages should focus on "why" not "what"

**When creating a commit:**
1. Run `git status` to see untracked/modified files
2. Run `git diff` to review changes
3. Draft a commit message focusing on the purpose
4. Add files and commit with message
5. Verify with `git status`

## Pagination & Tag Structure

**Automatic Page Generation (Nextra):**
- Nextra automatically handles navigation between pages
- Cleaner URLs: `/posts/post-name` instead of `/posts/post-name.html`
- Tags are automatically linkable through `/tags` page structure

## Rules

- Always reply to the user in Russian unless explicitly stated otherwise.