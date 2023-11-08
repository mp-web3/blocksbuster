const VideoCard = ({ video }) => {
  return (
    <div class="card col-span-4" key={video.id}>
      <div class="content-container">
        <iframe
          title={video.title}
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
