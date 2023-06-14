import { prisma } from '../../lib/prisma'
import React from 'react'
import { ArticleComponent } from './article'

const ArticlePage = async (props: { params: { slug: string } }) => {
  const article = await prisma.article.findUniqueOrThrow({
    where: { slug: props.params.slug },
  })
  console.log('article', article)

  return <ArticleComponent article={article} />
}

export default ArticlePage

export const revalidate = 10 // 10 seconds
