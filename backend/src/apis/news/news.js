import express from "express";
import withDB from "../../client/mongodb/mongodb";
import googleNewsAPI from "google-news-json"; // Change import syntax
const router = express.Router();

// Get news from Google News API
router.get("/api/news/:name", async (req, res) => {
  withDB(async (db) => {
    const currentUser = req.params.name;
    const preferences = await db
      .collection("preferences")
      .findOne({ name: currentUser });
    const tags = preferences.news;
    let final = [];
    for (let i = 0; i < tags.length; i++) {
      const news = await googleNewsAPI.getNews(
        googleNewsAPI.SEARCH,
        tags[i].value,
        "en-GB",
      );
      final = final.concat(news.items);
    }
    res.status(200).json(final);
  }, res);
});

export default router;
