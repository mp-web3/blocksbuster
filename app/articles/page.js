
/*
const getArticles = async () => {
  const response = await fetch(
  `https://gnews.io/api/v4/search?q=blockchain&lang=en&country=us&max=10&in=title&sortby=publishedAt&apikey=${process.env.NEXT_PUBLIC_GNEWS_API_KEY}`
  );
  if (!response.ok) throw new Error("Failed to fetch data");
  const data = await response.json();

  console.log(data);
  data.articles.forEach((article, index) => {
    console.log(`Source object of the article ${index + 1}:`, article.source);
  });
};
export default getArticles;
*/


"use client"
import ArticleList from "@/app/components/articles/ArticleList";

export default function Page() {
  return <ArticleList />;
}

