export default async function handler(req, res) {

  const API_KEY = process.env.NEWS_API_KEY;

  const category = req.query.category || "";

  const q = req.query.q || "";


  let url = "";

  if (q) {

    url =
      `https://newsapi.org/v2/everything?q=${q}&pageSize=12&apiKey=${API_KEY}`;

  }
  else {

    url =
      `https://newsapi.org/v2/top-headlines?country=in&pageSize=12&apiKey=${API_KEY}`;

    if (category) {

      url += "&category=" + category;

    }

  }


  const response = await fetch(url);

  const data = await response.json();

  res.status(200).json(data);

}
