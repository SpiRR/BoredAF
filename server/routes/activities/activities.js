const express = require("express");
const router = express.Router()
const Activity = require("../../models/Activity");

// Forst end-point for activities
router.get('/', (req, res) => {
    res.send('activities');
})


router.get("/all-activities", async (req, res) => {
    let activities = await Activity.query()
    res.json(activities)
});


module.exports = router;