import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const URI = process.env.url;

export const connectDB = async () => {
  if (!URI) {
    throw new Error('⚠️ MONGO_URI is not defined in .env file');
  }

  try {
    await mongoose.connect(URI, {
      // Optional configs (TS có thể yêu cầu ép kiểu)
    } as any);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};
