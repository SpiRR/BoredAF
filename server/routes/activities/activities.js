const express = require("express");
const router = express.Router();
const Activity = require("../../models/Activity");

// Forst end-point for activities
router.get('/', (req, res) => {
    res.send('activities');
})

// Add own activity
router.post("/add/:id", async (req, res) => {
    const { activity, type } = req.body;
    const { id } = req.params;
    const done = false;

    const newActivity = await Activity.query().insert({
        activity, // input 
        type,
        done,
        user_id: id
    })
    res.status(200).send({
        activity: newActivity.activity
    });

});

// Update an activity from pending to complete (done = true)
router.patch("/completed/:activityid", async (req, res) => {
    const { activityid } = req.params;
    const completedActivity = await Activity.query().where({id: activityid}).update({done:true})
    res.status(200).send({response: `Activity with id ${activityid} is now ${completedActivity}`})
});

// Delete an activity
router.delete("/deleteactivity/:activityid", async (req, res) => {
    // res.send('delete')
    const { activityid } = req.params;
    const deleteActivity = await Activity.query().where({id: activityid}).del()
    res.status(200).send({response: `Activity deleted with id: ${deleteActivity}`})
});

// Getting all activities
router.get("/all/:id", async (req, res) => {
    const { id } = req.params;
    const activities = await Activity.query().select().where({user_id: id})
    res.json(activities)
});

// Get all completed activities
router.get("/pending/:id", async (req, res) => {
    // const { id } = req.params;
    const done = false;
    const pendingActivities = await Activity.query().select().where({done})
    res.json(pendingActivities)
});

// Get all pending activities
router.get("/done/:id", async (req, res) => {
    // const { id } = req.params;
    const done = true;
    const doneActivities = await Activity.query().select().where({done})
    res.json(doneActivities)
});


module.exports = router;