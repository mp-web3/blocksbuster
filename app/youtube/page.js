"use client";
import { useEffect } from "react";

import React, { useState } from "react";
import axios from "axios";

const YouTubeVideoList = () => {
  const [videos, setVideos] = useState([]);

  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const CHANNEL_IDS = ["UCAl9Ld79qaZxp9JzEOwd3aA", "UCtvTdPZWUwW4whk9CLlCBug"];

  const fetchVideos = async () => {
    try {
      const videoList = [];

      for (const channelId of CHANNEL_IDS) {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=30&type=video`
        );

        const data = response.data;

        for (const video of data.items) {
          const videoId = video.id.videoId;

          // Fetch video details including duration
          const videoDetailsResponse = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoId}&part=contentDetails`
          );

          const videoDetails = videoDetailsResponse.data.items[0];
          const duration = videoDetails.contentDetails.duration;

          // console.log("Duration:", duration);

          // Check if the video duration is greater than 5 minutes
          const isLongVideo = parseISO8601Duration(duration) >= 300; // 300 seconds = 5 minutes

          if (isLongVideo) {
            videoList.push({
              id: videoId,
              snippet: video.snippet,
              publishedAt: video.snippet.publishedAt,
            });
          }
        }
      }

      // Sort the videos by published date in descending order (newest first)
      videoList.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );

      setVideos(videoList);
    } catch (error) {
      console.error("Error fetching videos", error);
    }
  };

  // Function to parse ISO8601 duration into seconds
  const parseISO8601Duration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;

    return hours * 3600 + minutes * 60 + seconds;
    };
    
    const fetchAndStoreVideos = async () => {
      await fetchVideos();
      // Store the fetched videos and timestamp in local storage
      localStorage.setItem(
        "fetchedVideos",
        JSON.stringify({ videos: videos, timestamp: Date.now() })
      );
    };

    useEffect(() => {
      const storedVideos = JSON.parse(localStorage.getItem("fetchedVideos"));
      if (
        storedVideos &&
        Date.now() - storedVideos.timestamp < 12 * 60 * 60 * 1000
      ) {
        // Use the stored videos if they were fetched within the last 12 hours
        setVideos(storedVideos.videos);
      } else {
        fetchAndStoreVideos(); // Fetch and store new videos
      }
    }, []);

  return (
    <div>
      <button onClick={fetchVideos}>Fetch Videos</button>
      <div>
        {videos.slice(0, 5).map((video) => {
          const { id, snippet } = video;
          return (
            <div key={id}>
              <h3>{snippet.title}</h3>
              <p>{snippet.description}</p>
              <iframe
                title={snippet.title}
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${id}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YouTubeVideoList;

/*
import React, { useEffect, useState } from "react";
import axios from "axios";

function YouTubeVideos() {
  const [videos, setVideos] = useState([]);
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const channelId = "UCAl9Ld79qaZxp9JzEOwd3aA";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              part: "snippet",
              channelId,
              maxResults: 10,
              order: "date",
              key: apiKey,
            },
          }
        );
        setVideos(response.data.items);
      } catch (error) {
        console.error("Error making YouTube API request", error);
      }
    };

    fetchData();
  }, [apiKey, channelId]);

  return (
    <div>
      <h2>Latest YouTube Videos</h2>
      {videos.map((video) => (
        <div key={video.id.videoId}>
          <h3>{video.snippet.title}</h3>
          <div className="video-container">
            <iframe
              title={video.id.videoId}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ))}
    </div>
  );
}

export default YouTubeVideos;
*/
