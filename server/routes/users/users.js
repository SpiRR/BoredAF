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
    res.send({Nickname: users[0].nickname, Score: users[0].userscore})
});

// Register
router.post("/register", (req, res) => {
    const { email, password, repeatPassword } = req.body;

    if (email && password && repeatPassword && password === repeatPassword) {
        
        let doesUserExists = User.query().select().where({email: email}).limit(1);

        if (doesUserExists[0]) {
            return res.status(449).send('User already exsists');
        }
        res.send('hi')
    }
    
    res.send('end')

});

// Login

// Logout

module.exports = router;