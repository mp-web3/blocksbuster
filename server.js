const express = require("express");
const app = express();
const port1 = 4000;
const port2 = 5000;
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
    db = client.db("blocksbuster"); // Replace with your database name
    console.log("Connected to MongoDB");

    // fetch YouTube Data
    //fetchYouTubeData();
    // fetch Gnews articles
    fetchNews();
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
  const videoCollection = db.collection("fetchedvideos"); // Replace 'videos' with your collection name
  await videoCollection.deleteMany({}); // Clear existing videos
  await videoCollection.insertMany(videoList);
  console.log("Fetched and saved videos to MongoDB");

  // Define a cron job to fetch YouTube data every 12 hours
  cron.schedule("0 */12 * * *", async () => {
    fetchYouTubeData();
  });
}

// Define an Express route to serve the videos
app.get("/api/youtube-videos", async (req, res) => {
  try {
    const videoCollection = db.collection("fetchedvideos"); // Replace 'videos' with your collection name
    const videos = await videoCollection.find().toArray();
    res.json(videos);
  } catch (error) {
    console.error("Error fetching videos", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

app.listen(port1, () => {
  console.log("Server is running on port 4000");
});

const articleList = [];
// GNews Data Fetching Logic
async function fetchNews() {
  const response = await axios.get(
    `https://gnews.io/api/v4/search?q=blockchain&lang=en&country=us&max=10&in=title&sortby=publishedAt&apikey=${process.env.NEXT_PUBLIC_GNEWS_API_KEY}`
  );

  const data = response.data;

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

  // Define a cron job to fetch GNews data every 12 hours
  cron.schedule("0 */12 * * *", async () => {
    fetchNews();
  });
}

// Define an Express route to serve the articles
app.get("/api/gnews-articles", async (req, res) => {
  try {
    const articleCollection = db.collection("fetchedarticles");
    const articles = await articleCollection.find().toArray();
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles", error);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

app.listen(port2, () => {
  console.log("Server is running on port 5000");
});
