"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const YouTubeVideoPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/youtube-videos"
        ); // Fetch videos from your Express route
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      {videos.map((video) => (
        <div key={video.id}>
          <h3>{video.title}</h3>
          <p>{video.description}</p>
          <iframe
            title={video.title}
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${video.id}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default YouTubeVideoPage;