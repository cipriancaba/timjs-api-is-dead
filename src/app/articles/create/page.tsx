import { createArticle } from '../actions'

const ArticleCreatePage = async () => {
  return (
    <>
      <div className="flex flex-col items-center">Create new article</div>
      <form
        action={createArticle}
        className="flex flex-col items-center gap-4 text-black"
      >
        <input type="text" name="title" placeholder="title" />
        <input type="text" name="slug" placeholder="slug" />
        <textarea name="content" placeholder="content" />
        <button type="submit" className="text-white">
          Submit
        </button>
      </form>
    </>
  )
}

export default ArticleCreatePage

export const revalidate = 10 // 10 seconds
