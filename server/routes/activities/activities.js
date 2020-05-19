const express = require("express");
const router = express.Router()
const Activity = require("../../models/Activity");

// Forst end-point for activities
router.get('/', (req, res) => {
    res.send('activities');
})

// Add own activity
router.post("/add/:id", async (req, res) => {
    const { activity, activity_type_id } = req.body;
    const { id } = req.params;
    const done = false;

    const newActivity = await Activity.query().insert({
        activity, // input 
        activity_type_id, // dropdown
        user_id: id,
        done
    })
    res.status(200).send({
        activity: newActivity.activity
    });

});
// Add a random activity

// Add specific type of activity

// Getting all activities
router.get("/all/:id", async (req, res) => {
    const { id } = req.params;
    const activities = await Activity.query().select().where({user_id: id})
    res.json(activities)
});


module.exports = router;