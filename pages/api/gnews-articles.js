import { db, connectToMongoDB } from '../../utils/db';

export default async function handler(req, res) {
    try {
        if (!db) {
            await connectToMongoDB();
        }
        const articleCollection = db.collection('fetchedarticles');
        const articles = await articleCollection.find().limit(10).toArray();
        res.status(200).json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
