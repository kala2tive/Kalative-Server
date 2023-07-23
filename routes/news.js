import express from 'express';
import { getNews, getNewsById, postNews } from '../controllers/news.js';
import { upload } from '../connections/aws.js';
const router = express.Router();

router.post('/addNews', upload.single('image'), postNews);
router.get('/', getNews);
router.get('/:newsId', getNewsById);

export default router;
