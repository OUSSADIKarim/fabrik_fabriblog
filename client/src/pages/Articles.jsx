import { useQuery } from "@tanstack/react-query"
import { getAllArticles } from "../../api/api"
import ArticleCard from "../components/ArticleCard"

const Articles = () => {
  const {
    data: articles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const data = await getAllArticles()
      return data
    },
  })

  return (
    <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
      <div className="text-center">
        <h1 className="text-3xl text-gray-800 font-semibold">Blog</h1>
        <p className="mt-3 text-gray-500">
          Blogs that are loved by the community. Updated every hour.
        </p>
      </div>
      <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {articles?.map((article) => {
          return <ArticleCard key={article._id} article={article} />
        })}
      </div>
    </section>
  )
}

export default Articles
