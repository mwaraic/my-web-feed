import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan'; // Import morgan for logging
import newsRouter from './apis/news/news.js';
import redditRouter from './apis/reddit/reddit.js';
import tweetsRouter from './apis/tweets/tweets.js';
import getPreferences from './apis/preferences/get.js';
import postPreferences from './apis/preferences/post.js';
import updatePreferences from './apis/preferences/update.js';
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Logger middleware for logging requests
app.use(morgan('dev'));

// Load environment variables
const PORT = process.env.PORT || 8000;

// Middleware for generic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(newsRouter);
app.use(redditRouter);
app.use(tweetsRouter);
app.use(getPreferences);
app.use(updatePreferences);
app.use(postPreferences);

// Enable CORS for specific origin and methods
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
