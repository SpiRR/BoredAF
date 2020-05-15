const express = require("express");
const router = express.Router()
const Region = require("../../models/Region");

// Forst end-point for activities
router.get('/', (req, res) => {
    res.send('activities');
})


router.get("/regions", async (req, res) => {
    let region = await Region.query()
    res.json(region)
});


module.exports = router;