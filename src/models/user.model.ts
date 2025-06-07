import mongoose from 'mongoose';
import Blog from "~/models/blog.model";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    phone: {
      type: Number,
      required: false,
    },
    role: {
      type: String,
      required: false,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
    updateAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'users',
    timestamp: true,
  },
);


const User =  mongoose.model('User', UserSchema);
export default User;