import express from "express";
import withDB from "../../client/mongodb/mongodb";
const router = express.Router();

// Set preferences for a new user
router.post("/api/preferences/:name", (req, res) => {
  const { twitter, reddit, news } = req.body;
  const userName = req.params.name;
  withDB(async (db) => {
    try {
      await db.collection("preferences").insertOne({
        name: userName,
        twitter,
        reddit,
        news,
      });
      res.status(201).json({ message: "Preferences set successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to set preferences", error });
    }
  }, res);
});

export default router;
