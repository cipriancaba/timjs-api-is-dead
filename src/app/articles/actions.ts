import { redirect } from 'next/navigation'
import { prisma } from '../lib/prisma'
import { revalidateTag } from 'next/cache'

export async function createArticle(formData: FormData) {
  'use server'
  try {
    const article = await prisma.article.create({
      data: {
        author: {
          connect: {
            id: 1,
          },
        },
        title: formData.get('title'),
        content: formData.get('content'),
        slug: formData.get('slug'),
      },
    })
    revalidateTag('/articles')
    redirect(`/articles/${article.slug}`)
  } catch (e) {
    console.error(e)
  }
}
