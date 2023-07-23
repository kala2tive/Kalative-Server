import news from '../models/news.js';
import { uploadToS3 } from '../connections/aws.js';
export const postNews = async (req, res) => {
  const { title, description, writer } = req.body;
  const file = req.file;
  if (!title) res.status(400).json({ message: 'Title is required' });
  if (!file) res.status(400).json({ message: 'Image is required' });
  if (!description)
    res.status(400).json({ message: 'description is required' });
  if (!writer) res.status(400).json({ message: 'Writer is required' });

  uploadToS3(file.buffer, `News/${Date.now().toString()}.jpg`)
    .then((data) => {
      try {
        const addedNews = new news({
          title,
          image: data.Location,
          description,
          writer,
        });
        addedNews.save();
        return res.status(201).json({ message: 'News Added' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

export const getNews = async (req, res) => {
  try {
    const allNews = await news.find({});
    res.status(200).json({ News: allNews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNewsById = async (req, res) => {
  const { newsId } = req.params;
  try {
    const selectedNews = await news.findOne({ _id: newsId });
    res.status(200).json({ News: selectedNews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
