const express = require("express");
const cors = require("cors");
const fetchYouTubeData = require("./utils/fetchYouTubeData");
const fetchNews = require("./utils/fetchNews");
const videosRouter = require("./utils/videosRouter")
const articlesRouter = require("./utils/articlesRouter");
require("dotenv").config();
require("./utils/cronJobs");

const appVideo = express();
const appArticle = express();
const port1 = 4000;
const port2 = 5000;

appVideo.use(express.json());
appVideo.use(cors());
appVideo.use(videosRouter);

appArticle.use(express.json());
appArticle.use(cors());
appArticle.use(articlesRouter);


appVideo.listen(port1, () => {
  console.log("Server is running on port 4000");
});
appArticle.listen(port2, () => {
  console.log("Server is running on port 5000");
});

fetchYouTubeData();
fetchNews();
