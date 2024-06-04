import { MongoClient } from 'mongodb';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/';

// Database connection function
const withDB = async (operations, res) => {
  try {
    const client = await MongoClient.connect(MONGO_URI, {
      directConnection: true,
      serverSelectionTimeoutMS: 2000,
      appName: 'mongosh+2.2.6',
      tls: false,
    });
    const db = client.db('local');
    await operations(db);
    client.close();
  } catch (error) {
    res.status(500).json({ message: 'Error connecting to the database', error });
  }
};

export default withDB;