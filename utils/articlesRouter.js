const express = require("express");
const connectDB = require("./db");

const router = express.Router();

router.get("/api/gnews-articles", async (req, res) => {
  try {
    const db = await connectDB();
    const articleCollection = db.collection("fetchedarticles");
    const articles = await articleCollection.find().limit(6).toArray();
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles", error);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

module.exports = router;
