import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      minLength: 5,
    },
    description: {
      type: String,
      required: true,
      maxLength: 2000,
    },
    image: {
      type: String,
      required: true,
    },
    writer: {
      type: String,
      required: true,
      default: 'Unknown',
    },
  },
  {
    timestamps: true,
  }
);
const blogModl = mongoose.model('Blog', blogSchema);
export default blogModl;
