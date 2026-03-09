const pageSize = 7;

export async function getNews(category?: string, page: number = 1) {
  let url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${pageSize}&page=${page}&apiKey=${process.env.NEWS_API_KEY}`;
  
  if (category) {
    url += `&category=${category}`;
  }

  const res = await fetch(url);
  const data = await res.json();

  const totalResults = data.totalResults || 0;
  const totalPages = Math.ceil(totalResults / pageSize);

  return {
    articles: data.articles || [],
    totalPages,
    currentPage: page,
    totalArticles: totalResults
  };
}