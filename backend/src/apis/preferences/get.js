import express from 'express';
import withDB from '../../client/mongodb/mongodb';
const router = express.Router();

// Get preferences for a user
router.get('/api/preferences/:name', async (req, res) => {
  withDB(async (db) => {
    const userName = req.params.name;
    const preferences = await db.collection('preferences').findOne({ name: userName });
    if (!preferences) {
      res.status(404).json({ message: 'Preferences not found for the user' });
      return;
    }
    res.status(200).json(preferences);
  }, res);
});

export default router;