import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    paragraph: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
      data: Buffer,
    },
    type: {
      type: String,
      required: true,
    },
    // Removed createAt and updateAt fields since timestamps: true will create createdAt and updatedAt automatically
  },
  {
    collection: 'blogs',
    timestamps: true, // This will add createdAt and updatedAt fields automatically
  }
);

const Blog = mongoose.model('Blog', BlogSchema);
export default Blog;