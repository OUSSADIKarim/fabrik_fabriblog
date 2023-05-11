import { Link } from "react-router-dom"

const ArticleCard = ({ article }) => {
  console.log({ article })
  return (
    <article className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm">
      <Link to={`/articles/${article._id}`}>
        <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
          <div className="flex-none w-10 h-10 rounded-full"></div>
          <div className="ml-3">
            <span className="block text-gray-900">{article.user.email}</span>
            {/* <span className="block text-gray-400 text-sm">{items.date}</span> */}
          </div>
        </div>
        {/* <div className="pt-3 ml-4 mr-2 mb-3">
          <h3 className="text-xl text-gray-900">{items.title}</h3>
          <p className="text-gray-400 text-sm mt-1">{items.desc}</p>
        </div> */}
      </Link>
    </article>
  )
}

export default ArticleCard
