import FirstNews from "@/components/FirstNews";
import NewsCard from "@/components/NewsCard";
import Pagination from "@/components/Pagination";
import { getNews } from "@/lib/news";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1');
  
  const data = await getNews(undefined, currentPage);
  const { articles, totalPages, currentPage: page } = data;

  return (
    <div className="my-6 flex flex-col gap-6 p-4">
      <h1 className="text-4xl md:text-6xl font-bold">Top Headlines</h1>

      {articles.length > 0 && (
        <FirstNews articles={articles[0]} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.slice(1).map((article: any, index: number) => (
          <NewsCard 
            key={`${article.url}-${index}-${currentPage}`} 
            articles={article} 
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination 
          currentPage={page}
          totalPages={totalPages}
          baseUrl="/" 
        />
      )}
    </div>
  );
}