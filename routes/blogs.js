import express from 'express';
import { getBlogById, getBlogs, postBlog } from '../controllers/blog.js';
import { upload } from '../connections/aws.js';

const router = express.Router();
router.post('/addBlog', upload.single('image'), postBlog);
router.get('/', getBlogs);
router.get('/:blogId', getBlogById);
export default router;
