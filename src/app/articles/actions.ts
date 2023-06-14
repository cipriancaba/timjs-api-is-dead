'use server'
import { redirect } from 'next/navigation'
import { prisma } from '../lib/prisma'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function createArticle(formData: FormData) {
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

export async function updateTitle({
  title,
  articleId,
}: {
  title: string
  articleId: number
}) {
  try {
    const article = await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        title: title,
      },
    })

    revalidatePath(`/articles/${article.slug}`)
    revalidatePath('/articles')
  } catch (err) {
    console.error(err)
    return {
      error: err.message,
    }
  }
}
