import express from 'express';
import withDB from '../../client/mongodb/mongodb';
const reddit = require('scrap-reddit');
const router = express.Router();

// Get Reddit posts
router.get('/api/reddit/:name', async (req, res) => {
  withDB(async (db) => {
    const currentUser = req.params.name;
    const preferences = await db
      .collection('preferences')
      .findOne({ name: currentUser });
    const tags = preferences.reddit;
    var collection = [];
    for (var i = 0; i < tags.length; i++) {
      const post = await reddit.topPost(tags[i].value);
      collection.push(post.data);
    }
    var final = [];
    for (var i = 0; i < tags.length; i++) {
      final = final.concat(collection[i]);
    }
    res.status(200).json(final);
  }, res);
});

export default router;
  