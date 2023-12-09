const express = require("express");
const connectDB = require("./db");

const router = express.Router();

router.get("/api/youtube-videos", async (req, res) => {
  try {
    const db = await connectDB();
    const videoCollection = db.collection("fetchedvideos");
    const videos = await videoCollection.find().limit(6).toArray();
    res.json(videos);
  } catch (error) {
    console.error("Error fetching videos", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

module.exports = router;
