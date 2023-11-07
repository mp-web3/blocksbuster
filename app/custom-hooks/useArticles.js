"use client";

import { useState, useEffect } from "react";
import axios from "axios";
const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/gnews-articles"
        );
          const articles = response.data;
          

        setArticles(
          articles.map((article) => ({
            id: article.title,
            title: article.title,
            description: article.description,
            publishedAt: article.publishedAt,
            author: article.author,
              image: article.image,
            url: article.url,
          }))
        );
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return { articles, loading, error };
};

export default useArticles;
