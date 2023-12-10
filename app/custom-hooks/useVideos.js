"use client";

import { useState, useEffect } from "react";
import axios from "axios";
const useVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          "/api/youtube-videos"
        );
        const videos = response.data;

        setVideos(
          videos.map((video) => ({
            id: video.id,
            title: video.title,
            description: video.description,
            publishedAt: video.publishedAt,
            channel: video.channelTitle
          }))
        );
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return { videos, loading, error };
};

export default useVideos;
