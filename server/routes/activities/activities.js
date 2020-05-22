const express = require("express");
const router = express.Router();
const Activity = require("../../models/Activity");
const ActivityTypes = require('../../models/ActivityType.js')

// Forst end-point for activities
router.get('/', (req, res) => {
    res.send('activities');
})

// Load activity types
router.get("/activitytypes", async (req, res) => {
    const activityTypes = await ActivityTypes.query().select('*')
    console.log(activityTypes)
    res.json(activityTypes)
});

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

// One route for adding an activity - random and/or specific

// Getting all activities
router.get("/all/:id", async (req, res) => {
    const { id } = req.params;
    const activities = await Activity.query().select().where({user_id: id})
    res.json(activities)
});

// Get all activities that are done
router.get("/all/pending/:id", async (req, res) => {
    // const { id } = req.params;
    const done = false;
    const pendingActivities = await Activity.query().select().where({done})
    res.json(pendingActivities)
});

// Get all activities that are NOT done
router.get("/all/done/:id", async (req, res) => {
    // const { id } = req.params;
    const done = true;
    const doneActivities = await Activity.query().select().where({done})
    res.json(doneActivities)
});


module.exports = router;