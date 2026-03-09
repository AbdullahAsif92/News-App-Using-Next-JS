import Link from "next/link"
import NewsImage from "./NewsImage"

const FirstNews = ({ articles }: any) => {

  const date = new Date(articles.publishedAt)

  const formattedDate = date.toLocaleDateString("en-US",{
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex gap-6 items-center flex-col md:flex-row">

        <div className="md:w-1/2 relative h-95 w-full">
          <NewsImage
            src={articles.urlToImage}
            alt={articles.title}
            className="object-cover rounded"
          />
        </div>

        <div className="md:w-1/2">
          <span className="font-bold">{formattedDate}</span>
                <Link href={articles.url} target="_blank">
          <h2 className="text-2xl md:text-4xl font-bold my-4">{articles.title}</h2>
      </Link>
          <p>{articles.description}</p>
        </div>

    </div>
  )
}

export default FirstNews