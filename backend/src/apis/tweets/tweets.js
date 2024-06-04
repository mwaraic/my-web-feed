import express from 'express';
import withDB from '../../client/mongodb/mongodb';
import getUserTweets from '../../client/twitter.js/twitter';
const router = express.Router();

// Get tweets from Twitter
router.get('/api/tweets/:name', async (req, res) => {
  withDB(async (db) => {
    const currentUser = req.params.name;
    const preferences = await db.collection('preferences').findOne({ name: currentUser });
    const tags = preferences.twitter;
    let final = [];
    var collection = [];

    for (var i = 0;i < tags.length;i++) {

      const userId = tags[i].value;
      final = getUserTweets(userId);
      collection.concat(final);
      
    }

    res.status(200).json(collection);
  }, res);
});

export default router;