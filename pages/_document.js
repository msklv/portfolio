import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const meta = {
      title: 'Михаил Соколов - Architect 🔗 Manager в Tech & GenAI',
      description: 'Привет 👋, занимаюсь **отладкой процесса разработки масштабных систем** в области Менеджмента, архитектуры, GenAI и DevOps.',
      image:
        'https://sokolov.im/images/michael-sokolov-2024-v2.jpg'
    }

    return (
      <Html lang="ru">
        <Head>
          <meta name="robots" content="follow, index" />
          <meta name="description" content={meta.description} />
          <meta property="og:site_name" content={meta.title} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:title" content={meta.title}/>
          <meta property="og:image" content={meta.image} />
          <meta name="twitter:title" content={meta.title} />
          <meta name="twitter:description" content={meta.description} />
          <meta name="twitter:image" content={meta.image} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
