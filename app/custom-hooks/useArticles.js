"use client";

import { useState, useEffect } from "react";

const useArticles = (apiKey) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(
                    `https://gnews.io/api/v4/search?q=blockchain&lang=en&country=us&max=10&in=title&sortby=publishedAt&apikey=${apiKey}`
                );
                if (!response.ok) throw new Error("Failed to fetch data");
                const { articles } = await response.json();

                setArticles(
                    articles.map((article) => ({
                        id: article.title,
                        title: article.title,
                        description: article.description,
                        publishedAt: article.publishedAt,
                        author: article.source.name,
                        image: article.image,
                    }))
                );
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchArticles();
    }, [apiKey]);

    return { articles, loading, error }

};

export default useArticles;