const VideoCard = ({ video }) => {
  return (
    <div class="card col-span-4" key={video.id}>
      <div class="video-container">
        <iframe
          title={video.title}
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${video.id}`}
          allowFullScreen
        ></iframe>
      </div>
      <h3>{video.title}</h3>
      <p>{video.description}</p>
      <h5>
        {video.publishedAt} | {video.channel}
      </h5>
    </div>
  );
};

export default VideoCard;
