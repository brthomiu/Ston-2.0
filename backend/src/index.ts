/* eslint-disable import/no-extraneous-dependencies */
import express, { Express } from 'express';
import dotenv from 'dotenv';
import path = require('path');
import cookieParser from 'cookie-parser';
import router from './routes';
import { connectToDb } from './utils/connectToDb';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

// Middleware for handling JSON requests, called before the router
app.use(express.json());

// Add the cookie-parser middleware
app.use(cookieParser());

// Express router
app.use(router);

// Serve frontend
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.get('*', (req, res) =>
  res.sendFile(
    path.resolve(__dirname, '../', '../', 'frontend', 'dist', 'index.html')
  )
);

// Start server on designated port
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// Connect to DB
connectToDb();
