const express = require("express");
const router = express.Router();

const {
  createActivity,
  getActivities,
  deleteActivity
} = require("../controllers/ActivityController");

router.post("/", createActivity);
router.get("/", getActivities);
router.delete("/:id", deleteActivity);

module.exports = router;