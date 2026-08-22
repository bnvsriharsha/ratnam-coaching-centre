import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer = null;

export const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI;

    if (!uri) {
      console.log('⚡ No MONGODB_URI found in environment. Initializing embedded MongoMemoryServer for instant execution...');
      mongoMemoryServer = await MongoMemoryServer.create();
      uri = mongoMemoryServer.getUri();
      console.log(`📦 Embedded MongoDB initialized at: ${uri}`);
    }

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`⚠️ Initial DB connection attempt failed: ${error.message}`);
    // If external DB fails, fallback to embedded MongoMemoryServer
    try {
      console.log('🔄 Falling back to embedded MongoMemoryServer...');
      mongoMemoryServer = await MongoMemoryServer.create();
      const fallbackUri = mongoMemoryServer.getUri();
      const conn = await mongoose.connect(fallbackUri);
      console.log(`✅ Embedded MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (memErr) {
      console.error(`❌ Critical DB connection error: ${memErr.message}`);
      process.exit(1);
    }
  }
};

export const closeDB = async () => {
  await mongoose.connection.close();
  if (mongoMemoryServer) {
    await mongoMemoryServer.stop();
  }
};
