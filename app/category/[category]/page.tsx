import FirstNews from "@/components/FirstNews";
import NewsCard from "@/components/NewsCard";
import Pagination from "@/components/Pagination";
import { getNews } from "@/lib/news";

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const paramsResult = await params;
  const searchParamsData = await searchParams;
  const category = paramsResult.category;
  const currentPage = parseInt(searchParamsData.page || '1');

  const data = await getNews(category, currentPage);
  const { articles, totalPages, currentPage: page } = data;

  return (
    <div className="my-6 flex flex-col gap-6 p-4">
      <h1 className="text-4xl md:text-6xl font-bold">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>

      {articles.length > 0 && <FirstNews articles={articles[0]} />}

      <div className="flex flex-row flex-wrap gap-2 md:gap-4">
        {articles.slice(1).map((article: any, index: number) => (
          <NewsCard key={index} articles={article} />
        ))}
      </div>

      <Pagination 
        currentPage={page}
        totalPages={totalPages}
        baseUrl={`/category/${category}`}
      />
    </div>
  );
}