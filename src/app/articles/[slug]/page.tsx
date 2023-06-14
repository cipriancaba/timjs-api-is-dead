import { prisma } from '../../lib/prisma'
import Link from 'next/link'

const ArticlePage = async (props: { params: { slug: string } }) => {
  const article = await prisma.article.findUniqueOrThrow({
    where: { slug: props.params.slug },
  })
  console.log('article', article)

  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <Link href="/articles">Back to articles</Link>
    </div>
  )
}

export default ArticlePage

export const revalidate = 10 // 10 seconds
