"use client";

import { useState, useEffect } from "react";

const useGames = (apiKey) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch (
          `https://api.rawg.io/api/games?key=${apiKey}`
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const { results } = await response.json();
        setGames(
          results.map((game) => ({
            id: game.id,
            backgroundImage: game.background_image,
            rating: game.rating,
            name: game.name,
          }))
        );
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchGames();
  }, [apiKey]);

  return { games, loading, error };
};

export default useGames;
