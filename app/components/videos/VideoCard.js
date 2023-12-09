import { format } from "date-fns";

const VideoCard = ({ video }) => {
  
  const formattedDate = format(new Date(video.publishedAt), "d MMMM yyyy");

  return (
    <div className="card col-span-4" key={video.id}>
      <div className="content-container">
        <iframe
          title={video.title}
          src={`https://www.youtube.com/embed/${video.id}`}
          allowFullScreen
        ></iframe>
      </div>
      <h3>{video.title}</h3>
      <p>{video.description}</p>
      <h5>
        {formattedDate} | {video.channel}
      </h5>
    </div>
  );
};

export default VideoCard;
