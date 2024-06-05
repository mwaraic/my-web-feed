import express from "express";
import withDB from "../../client/mongodb/mongodb";
const router = express.Router();

// Update preferences for a user
router.put("/api/preferences/:name", (req, res) => {
  const { twitter, reddit, news } = req.body;
  const userName = req.params.name;
  withDB(async (db) => {
    try {
      const result = await db.collection("preferences").updateOne(
        { name: userName },
        {
          $set: { twitter, reddit, news },
        },
      );
      if (result.modifiedCount === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json({ message: "Preferences updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update preferences", error });
    }
  }, res);
});

export default router;
