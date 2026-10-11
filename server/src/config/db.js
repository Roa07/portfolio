import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
  
  if (process.env.NODE_ENV === 'test') {
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2000,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to MongoDB at ${mongoUri}. Contact messages will use resilient in-memory storage fallback. Error: ${error.message}`);
    isConnected = false;
    return false;
  }
};

export const getDBStatus = () => isConnected;
