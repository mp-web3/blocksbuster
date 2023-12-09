import VideoCard from './VideoCard';
import useVideos from '@/app/custom-hooks/useVideos';

const VideoList = () => {
    const { videos, loading, error } = useVideos();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error... {error}</div>;

    return (
        <main id="videos" className='rounded-md grid grid-cols-4 m-2 gap-4 md:grid-cols-12 md:m-32 md:gap-6'>
            {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
            ))}
        </main>
    );
}

export default VideoList;
