// ❌ newsapi.org direct call ના કરવું

// ✅ only Vercel API function call

async function fetchNews(url) {

  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {

    throw new Error(data.message || "Error");

  }

  return {
    articles: data.articles || []
  };

}


// TOP HEADLINES

export async function getTopHeadlines(category = "") {

  let url = "/api/news";

  if (category) {

    url += "?category=" + category;

  }

  return fetchNews(url);

}



// SEARCH

export async function searchNews(query) {

  const url =
    "/api/news?q=" + query;

  return fetchNews(url);

}
