const express = require("express");
const app = express();
const port = 4000; // Choose the port you prefer
const { MongoClient } = require("mongodb");
const cron = require("node-cron");
const axios = require("axios");
require("dotenv").config();

// const path = require("path");
// require("dotenv").config({ path: path.join(__dirname, "../.env") });

app.use(express.json());

// Define MongoDB URI and create a MongoDB client
const uri = `mongodb+srv://mpweb3t:${process.env.NEXT_MONGODB_PASSWORD}@cluster1.4qofdqd.mongodb.net/?retryWrites=true&w=majority`; // Replace with your MongoDB URI
const client = new MongoClient(uri, { useNewUrlParser: true });
let db; // A reference to the MongoDB database

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    db = client.db("fetchedvideos"); // Replace with your database name
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connectToMongoDB();

const parseISO8601Duration = (duration) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;

  return hours * 3600 + minutes * 60 + seconds;
};

// YouTube Data Fetching Logic
async function fetchYouTubeData() {
  const CHANNEL_IDS = ["UCAl9Ld79qaZxp9JzEOwd3aA", "UCtvTdPZWUwW4whk9CLlCBug"];
  const videoList = [];

  for (const channelId of CHANNEL_IDS) {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet&order=date&maxResults=10&type=video`
    );

    const data = response.data;

    for (const video of data.items) {
      const videoId = video.id.videoId;
      const snippet = video.snippet;

      if (snippet.description != "") {
        videoList.push({
          id: videoId,
          title: snippet.title,
          channelTitle: snippet.channelTitle,
          description: snippet.description,
          publishedAt: snippet.publishedAt,
        });
      }
    }
  }

  videoList.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  // Store the fetched videos in the MongoDB database
  const videoCollection = db.collection("videos"); // Replace 'videos' with your collection name
  await videoCollection.deleteMany({}); // Clear existing videos
  await videoCollection.insertMany(videoList);
  console.log("Fetched and saved videos to MongoDB");

  // Define a cron job to fetch YouTube data every 12 hours
}

fetchYouTubeData();
