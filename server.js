const fetchYouTubeData = require("./utils/fetchYouTubeData");
const fetchNews = require("./utils/fetchNews");
require("dotenv").config();
require("./utils/cronJobs");

fetchYouTubeData();
fetchNews();
