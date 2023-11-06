const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const { MongoClient } = require("mongodb");
const cron = require("node-cron");
const axios = require("axios");
require("dotenv").config();

app.use(express.json());
app.use(cors());

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

// YouTube Data Fetching Logic
async function fetchYouTubeData() {
  const CHANNEL_IDS = [
    "UCAl9Ld79qaZxp9JzEOwd3aA",
    "UCtvTdPZWUwW4whk9CLlCBug",
    "UCTHq3W46BiAYjKUYZq2qm-Q",
  ];
  const videoList = [];

  for (const channelId of CHANNEL_IDS) {
    const response = await axios.get(
      // `https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet&order=date&maxResults=10&type=video`
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&regionCode=IT&type=video&videoDuration=long&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
    );

    const data = response.data;

    for (const video of data.items) {
      const videoId = video.id.videoId;
      const snippet = video.snippet;
      videoList.push({
        id: videoId,
        title: snippet.title,
        channelTitle: snippet.channelTitle,
        description: snippet.description,
        publishedAt: snippet.publishedAt,
      });
    }
  }

  videoList.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  // Store the fetched videos in the MongoDB database
  const videoCollection = db.collection("videos"); // Replace 'videos' with your collection name
  await videoCollection.deleteMany({}); // Clear existing videos
  await videoCollection.insertMany(videoList);
  console.log("Fetched and saved videos to MongoDB");

  // Define a cron job to fetch YouTube data every 12 hours
  // cron.schedule("0 */12 * * *", async () => {
  //   fetchYouTubeData();
  // });
}

fetchYouTubeData();

// Define an Express route to serve the videos
app.get("/api/youtube-videos", async (req, res) => {
  try {
    const videoCollection = db.collection("videos"); // Replace 'videos' with your collection name
    const videos = await videoCollection.find().toArray();
    res.json(videos);
  } catch (error) {
    console.error("Error fetching videos", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

app.listen(port, () => {
  console.log("Server is running on port 4000");
});
