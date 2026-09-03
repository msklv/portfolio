import { Footer, Layout, Navbar, ThemeSwitch } from 'nextra-theme-blog'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-blog/style.css'
import '../styles/main.css'

export const metadata = {
  title: 'Михаил Соколов — Architect Manager в Tech & GenAI',
  description:
    'Привет 👋, занимаюсь отладкой процесса разработки масштабных систем в области Менеджмента, архитектуры, GenAI и DevOps.'
}

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap('/')
  return (
    <html lang="ru" suppressHydrationWarning>
      <Head
        backgroundColor={{ dark: '#0f172a', light: '#fefce8' }}
        faviconGlyph="🧭"
      />
      <body>
        <Layout>
          <Navbar pageMap={pageMap}>
            <ThemeSwitch />
          </Navbar>
          {children}
          <Footer>
            © {new Date().getFullYear()} Михаил Соколов. sokolov.im
            <a href="/feed.xml" style={{ float: 'right' }}>
              RSS
            </a>
          </Footer>
        </Layout>
      </body>
    </html>
  )
}