import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_YOUTUBE_API_ENDPOINT);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
