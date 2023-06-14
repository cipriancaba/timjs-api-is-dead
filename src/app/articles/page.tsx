import { prisma } from '../lib/prisma'
import Link from 'next/link'

const ArticlesPage = async () => {
  const articles = await prisma.article.findMany()
  console.log('articles', articles)

  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <h1>Articles</h1>
      {articles.map((a) => (
        <Link
          href={`/articles/${a.slug}`}
          key={a.id}
          className="border border-white p-4"
        >
          <h2 className="uppercase">{a.title}</h2>
        </Link>
      ))}
    </div>
  )
}

export default ArticlesPage

export const revalidate = 10 // 10 seconds
