'use client'

import { Article } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import { updateTitle } from '../actions'

export const ArticleComponent = ({ article }: { article: Article }) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [title, setTitle] = React.useState(article.title)
  let [isPending, startTransition] = React.useTransition()

  console.log(title)

  return (
    <div className="flex flex-col items-center gap-4 p-10">
      {isEditing ? (
        <>
          <input
            type="text"
            name="title"
            className="text-black"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="rounded bg-blue-500 p-2 text-white"
            onClick={() => {
              setIsEditing(false)
              setTitle(article.title)
            }}
          >
            Cancel
          </button>
          <button
            className="rounded bg-blue-500 p-2 text-white"
            onClick={async () => {
              startTransition(() => {
                updateTitle({ articleId: article.id, title }).then((res) => {
                  setIsEditing(false)
                })
              })
            }}
          >
            {isPending ? 'Saving...' : 'Save'}
          </button>
        </>
      ) : (
        <>
          <h1>{article.title}</h1>
          <p>{article.content}</p>
          <button
            className="rounded bg-blue-500 p-2 text-white"
            onClick={() => {
              setIsEditing(true)
            }}
          >
            Edit
          </button>
          <Link href="/articles">Back to articles</Link>
        </>
      )}
    </div>
  )
}
