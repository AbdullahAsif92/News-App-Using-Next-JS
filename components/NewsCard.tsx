import NewsImage from "./NewsImage";
import Link from "next/link";
const NewsCard = ({ articles }: any) => {
  return (
    <div className="flex flex-col flex-[47%] md:flex-[32%]">
      <div className="relative w-full h-45 md:h-85">
        <NewsImage
          src={articles.urlToImage}
          alt={articles.title}
          className="object-cover rounded"
        />
      </div>

      <div className="my-3">
        <span className="md:text-xl">
          {new Date(articles.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>

        <Link href={articles.url} target="_blank">
          <h3 className="font-bold text-[16px] md:text-2xl my-1 md:my-3 line-clamp-2">
            {articles.title}
          </h3>
        </Link>
        <p className="line-clamp-2 text-[14px]">{articles.description}</p>
      </div>
    </div>
  );
};

export default NewsCard;
