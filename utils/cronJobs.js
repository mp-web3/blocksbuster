const cron = require("node-cron");
const { fetchYouTubeData } = require("./fetchYouTubeData");
const { fetchNews } = require("./fetchNews");

cron.schedule("0 */12 * * *", async () => {
  await fetchYouTubeData();
  await fetchNews();
});

