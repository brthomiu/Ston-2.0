import mongoose from 'mongoose';
import dotenv from 'dotenv';
import log from './logger';

dotenv.config();

export async function connectToDb() {
  const dbUri = process.env.TEST_DB_URI!;
  try {
    await mongoose.connect(dbUri);
    log.info('Connected to DB');
  } catch (e) {
    process.exit(1);
  }
}

export const db = mongoose.connection;
