const express = require("express");
const router = express.Router()
const bcrypt = require("bcrypt");
const saltRounds = 10;
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
router.post("/register", async (req, res) => {
    const { email, password, repeatPassword, region } = req.body;

    if (email && password && repeatPassword && region && password === repeatPassword) {
        const doesUserExists = await User.query().select().where({email: email}).limit(1);
        if (doesUserExists[0]) {
            res.status(449).send('User already exsists');
        } else {
            if ( password.length < 8) {
                res.send('Password does not meet the requirements')
            } else {
                bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
                    if ( err ) { return res.status(500).send({response: 'Internal error'}); }
                    
                    // find region and add via ID
                    try {
                        const region = await Region.query().select().where({id: region_id})
    
                        const creatingUser = await User.query().insert({
                            email,
                            password: hashedPassword,
                            region: region.region
                        })
    
                        return res.status(200).send({
                            email: creatingUser.email,
                            region: creatingUser.region
                        })    
                    } catch (error) {
                        return res.send(error)
                    }
                })
            }
        }
    } else if ( password !== repeatPassword ) {
        return res.status(404).send({ response: "Password and repeat password shoudl match" });
    } else {
        return res.status(404).send({ response: "Missing fields" });
    }
});

// Login

// Logout

module.exports = router;