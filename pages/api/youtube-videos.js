// pages/api/youtube-videos.js
import { db, connectToMongoDB } from '../../utils/db';

export default async function handler(req, res) {
    try {
        if (!db) {
            await connectToMongoDB();
        }
        const videoCollection = db.collection('fetchedvideos');
        const videos = await videoCollection.find().limit(6).toArray();
        res.status(200).json(videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}