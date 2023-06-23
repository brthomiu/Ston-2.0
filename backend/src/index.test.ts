import mongoose from 'mongoose';
import { beforeAll, afterAll, describe, expect, it, vi } from 'vitest';
import { connectToDb } from './utils/connectToDb';

describe('Server Connection to MongoDB', () => {
  beforeAll(() => {
    // Connect to a mock MongoDB server
    const mongoUri = 'mongodb://localhost:27017/testdb';
    mongoose.connect = vi.fn().mockResolvedValue(undefined); // Mock the connect function

    process.env.TEST_DB_URI = mongoUri;
  });

  afterAll(() => {
    // Disconnect from the mock MongoDB server
    mongoose.disconnect();
  });

  it('should connect to the database', async () => {
    // Call the connectToDb function
    await connectToDb();

    // Expect the mongoose.connect function to have been called with the correct URI
    expect(mongoose.connect).toHaveBeenCalledWith(process.env.TEST_DB_URI);
  });
});
