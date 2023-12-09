const axios = require("axios");
const connectDB = require("./db");

async function fetchNews() {
  const db = await connectDB();
  const response = await axios.get(
    `https://gnews.io/api/v4/search?q=blockchain&lang=en&country=us&max=10&in=title&sortby=publishedAt&apikey=${process.env.NEXT_PUBLIC_GNEWS_API_KEY}`
  );
  const data = response.data;
  const articleList = [];
  for (const article of data.articles) {
    articleList.push({
      id: article.title,
      title: article.title,
      description: article.description,
      publishedAt: article.publishedAt,
      author: article.source.name,
      image: article.image,
      url: article.url,
    });
  }
  const articleCollection = db.collection("fetchedarticles");
  await articleCollection.deleteMany({});
  await articleCollection.insertMany(articleList);
  console.log("Fetched and saved articles to MongoDB");
}

module.exports = fetchNews;
