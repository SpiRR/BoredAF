const express = require("express");
const router = express.Router();
const Activity = require("../../models/Activity");

// Forst end-point for activities
router.get('/', (req, res) => {
    res.send('activities');
});

// Add own activity (sess added, not tested)
router.post("/add/:id", async (req, res) => {
    const { activity, type } = req.body;
    const { id } = req.params;
    const sess = req.session;
    const done = false;

    if ( sess.authenticated && id == sess.userId ) {
        try {
            const newActivity = await Activity.query().insert({
                activity, 
                type,
                done,
                user_id: id
            });

            return res.status(200).send({
                activity: newActivity.activity
            });

        } catch (error) {
            if (err) {console.log("error in adding ectivity"); return}
            console.log("Success");
        }

    } else {
        res.status(404).send({response: 'Could not add activity'});
    }
});

// Update an activity from pending to complete (done = true)
router.patch("/completed/:activityid", async (req, res) => {
    const { activityid } = req.params;
    const done = true;

    const completedActivity = await Activity.query().where({
        id: activityid
    }).update({done}).limit(1);

    return res.status(200).send({response: completedActivity});
});

// Delete an activity
router.delete("/deleteactivity/:activityid", async (req, res) => {
    const { activityid } = req.params;

    const deletedActivity = await Activity.query().where({
        id: activityid
    }).del().limit(1);

    return res.status(200).send({deletedActivity});
});

// Getting all activities
router.get("/all/:id", async (req, res) => {
    const { id } = req.params;
    const activities = await Activity.query().select().where({
        user_id: id
    });

    res.status(200).json(activities);
});

// Get all completed activities
router.get("/pending/:id", async (req, res) => {
    const { id } = req.params;
    const done = false;
    const pendingActivities = await Activity.query().select().where({
        user_id: id, 
        done
    });

    return res.status(200).json(pendingActivities);
});

// Get all pending activities
router.get("/done/:id", async (req, res) => {
    const { id } = req.params;
    const done = true;
    const doneActivities = await Activity.query().select().where({
        user_id: id, 
        done
    });

    return res.status(200).json(doneActivities);
});


module.exports = router;