import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './routes';
import connectToDb from './utils/connectToDb';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

// Middleware for handling JSON requests, called before the router
app.use(express.json());

// Express router
app.use(router);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

// Start server on designated port
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// Connect to DB
connectToDb();
