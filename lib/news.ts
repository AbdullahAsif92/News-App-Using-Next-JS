// lib/news.ts
const pageSize = 7;
const MAX_PAGES = 5; 

export async function getNews(category?: string, page: number = 1) {
  const safePage = Math.max(1, Math.min(page, MAX_PAGES));
  
  let url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${pageSize}&page=${safePage}&apiKey=${process.env.NEWS_API_KEY}`;
  
  if (category) {
    url += `&category=${category}`;
  }

  const res = await fetch(url);
  const data = await res.json();

  if (data.status === 'error') {
    console.error('API Error:', data);
    return {
      articles: [],
      totalPages: 0,
      currentPage: safePage,
      totalArticles: 0
    };
  }

  const totalResults = Math.min(data.totalResults || 0, 100);
  const totalPages = Math.ceil(totalResults / pageSize);

  return {
    articles: data.articles || [],
    totalPages,
    currentPage: safePage,
    totalArticles: totalResults
  };
}

const getDateFilter = (timeFilter: string) => {
  const now = new Date();
  
  switch(timeFilter) {
    case 'today':
      return new Date(now.setHours(0, 0, 0, 0)).toISOString().split('T')[0];
    case '7days':
      const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
      return sevenDaysAgo.toISOString().split('T')[0];
    case '14days':
      const fourteenDaysAgo = new Date(now.setDate(now.getDate() - 14));
      return fourteenDaysAgo.toISOString().split('T')[0];
    case 'month':
      const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
      return monthAgo.toISOString().split('T')[0];
    default:
      return null;
  }
};

export async function searchNews(
  query: string, 
  page: number = 1, 
  sortBy: string = 'publishedAt',
  timeFilter: string = 'all'
) {
  const safePage = Math.max(1, Math.min(page, MAX_PAGES));
  const encodedQuery = encodeURIComponent(query);
  
  let url = `https://newsapi.org/v2/everything?q=${encodedQuery}&pageSize=${pageSize}&page=${safePage}&sortBy=${sortBy}&apiKey=${process.env.NEWS_API_KEY}`;
  
  const fromDate = getDateFilter(timeFilter);
  if (fromDate) {
    url += `&from=${fromDate}`;
  }

  const res = await fetch(url);
  const data = await res.json();

  if (data.status === 'error') {
    console.error('Search API Error:', data);
    return {
      articles: [],
      totalPages: 0,
      currentPage: safePage,
      totalArticles: 0,
      query,
      sortBy,
      timeFilter
    };
  }

  const totalResults = Math.min(data.totalResults || 0, 100);
  const totalPages = Math.ceil(totalResults / pageSize);

  return {
    articles: data.articles || [],
    totalPages,
    currentPage: safePage,
    totalArticles: totalResults,
    query,
    sortBy,
    timeFilter
  };
}