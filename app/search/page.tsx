import Search from "@/components/Search";
import FirstNews from "@/components/FirstNews";
import NewsCard from "@/components/NewsCard";
import Pagination from "@/components/Pagination";
import { searchNews } from "@/lib/news";

interface SearchPageProps {
  searchParams: Promise<{ 
    q?: string;
    page?: string;
    sort?: string;
    time?: string;
  }>;
}

const page = async ({ searchParams }: SearchPageProps) => {
  const params = await searchParams;
  const query = params.q || '';
  const currentPage = parseInt(params.page || '1');
  const sortBy = params.sort || 'publishedAt';
  const timeFilter = params.time || 'all';

  if (!query) {
    return (
      <div className="my-6 flex flex-col gap-6 p-4">
        <Search />
      </div>
    );
  }

  const data = await searchNews(query, currentPage, sortBy, timeFilter);
  const { articles, totalPages, currentPage: page } = data;

  return (
    <div className="my-6 flex flex-col gap-6 p-4">
      <Search 
        initialQuery={query} 
        initialSort={sortBy}
        initialTime={timeFilter}
      />

      {articles.length > 0 ? (
        <>
          {articles[0] && (
            <FirstNews articles={articles[0]} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.slice(1).map((article: any, index: number) => (
              article && (
                <NewsCard 
                  key={`${article.url}-${index}-${currentPage}`} 
                  articles={article} 
                />
              )
            ))}
          </div>

          {totalPages > 1 && currentPage <= totalPages && (
            <Pagination 
              currentPage={page}
              totalPages={totalPages}
              baseUrl={`/search?q=${encodeURIComponent(query)}&sort=${sortBy}&time=${timeFilter}`}
            />
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No articles found for "{query}"</p>
          <p className="text-gray-500 mt-2">Try different keywords or filters</p>
        </div>
      )}
    </div>
  );
};

export default page;