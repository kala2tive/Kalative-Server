import express from 'express';
import dotenv from 'dotenv';
import blogRoutes from './routes/blogs.js';
import newsRoutes from './routes/news.js';
import detailsRoute from './routes/details.js';
import connectMongoDB from './connections/mongoDB.js';
import cors from 'cors';

dotenv.config();
connectMongoDB();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/api/blogs', blogRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/details', detailsRoute);

app.listen(PORT, () => {
  console.log(`Server listening at Port - ${PORT}`);
});
