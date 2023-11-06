/*const getEpisodes = async () => {
  const showId = "41TNnXSv5ExcQSzEGLlGhy";
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/shows/${showId}/episodes?market=US&limit=50`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SPOTIFY_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export default getEpisodes;
*/

/*

const getEpisodes = async () => {
  const showId = "41TNnXSv5ExcQSzEGLlGhy";
  const response = await fetch(
    `https://api.spotify.com/v1/shows/${showId}/episodes?market=US&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SPOTIFY_API_KEY}`,
      },
    }
  );
  const data = await response.json();
  const episodes = data.items;
  const rollupEpisode = episodes.find((episode) =>
    episode.name.startsWith("ROLLUP")
  );

  if (rollupEpisode) {
    console.log(
      `The latest episode starting with ROLLUP is: ${rollupEpisode.name}`
    );
  } else {
    console.log("No episode starting with ROLLUP found.");
  }
}

*/

/*
var client_id = "CLIENT_ID";
var client_secret = "CLIENT_SECRET";

var authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " +
      new Buffer.from(client_id + ":" + client_secret).toString("base64"),
  },
  form: {
    grant_type: "client_credentials",
  },
  json: true,
};

request.post(authOptions, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    var token = body.access_token;
  }
});


<iframe
  style="border-radius:12px"
  src="https://open.spotify.com/embed/show/41TNnXSv5ExcQSzEGLlGhy/video?utm_source=generator&theme=0"
  width="624"
  height="351"
  frameBorder="0"
  allowfullscreen=""
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"
></iframe>;

*/