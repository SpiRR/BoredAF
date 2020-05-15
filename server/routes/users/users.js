const express = require("express");
const router = express.Router()
const User = require("../../models/User");
const Region = require("../../models/Region");
const Activity = require("../../models/Activity");

// Forst end-point for users
router.get('/', (req, res) => {
    res.send('users');
})

// User info
router.get("/scoreboard", async (req, res) => {
    let users = await User.query()
    res.json(users)
});

// Register

// Login

// Logout

module.exports = router;