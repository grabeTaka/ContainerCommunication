import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;

export const connect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
};

export const clearDatabase = async () => {
  await mongoose.connection.dropDatabase();
};

export const disconnect = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};