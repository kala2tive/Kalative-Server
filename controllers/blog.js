import blog from '../models/blogs.js';
import { uploadToS3 } from '../connections/aws.js';
export const postBlog = async (req, res) => {
  const { title, description, writer } = req.body;
  const file = req.file;
  if (!title) res.status(400).json({ message: 'Title is required' });
  if (!file) res.status(400).json({ message: 'Image is required' });
  if (!description)
    res.status(400).json({ message: 'description is required' });
  if (!writer) res.status(400).json({ message: 'Writer is required' });

  uploadToS3(file.buffer, `blog/${Date.now().toString()}.jpg`)
    .then((data) => {
      try {
        const addedBlog = new blog({
          title,
          image: data.Location,
          description,
          writer,
        });
        addedBlog.save();
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      return res.status(201).json({ message: 'Blog Added' });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

export const getBlogs = async (req, res) => {
  try {
    const allBlogs = await blog.find({});
    res.status(200).json({ Blogs: allBlogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  const { blogId } = req.params;
  try {
    const selectedBlog = await blog.findOne({ _id: blogId });
    res.status(200).json({ Blog: selectedBlog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
