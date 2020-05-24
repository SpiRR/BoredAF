const express = require("express");
const router = express.Router()
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../../models/User");
const Activity = require("../../models/Activity");

// Forst end-point for users
router.get('/', (req, res) => {
    res.send('users');
})

// User info
router.get("/profile/:id", async (req, res) => {
    let user = await User.query()
    res.send({
        nickname: user[0].nickname,
        email: user[0].email
    })
});

// Register
router.post("/register", async (req, res) => {
    const { email, password, nickname, repeatPassword, region_id } = req.body;

    if (email && password && repeatPassword && region_id && password === repeatPassword) {

        if (password.length < 8) {
            res.send({response: 'Password does not meet the requirements'})

        } else {
            bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
                if (err) {
                    return res.status(500).send({
                        response: 'Internal error'
                    });
                }
                try {
                    const doesUserExists = await User.query().select().where({
                        email: email
                    }).limit(1);

                    console.log(doesUserExists[0])

                    if (doesUserExists[0]) {
                        return res.status(449).send({ response: "User already exists" });

                    } else {
                            const creatingUser = await User.query().insert({
                            email,
                            nickname,
                            password: hashedPassword,
                            region_id
                        })
                        // Not inserting (missing something)
                        return res.status(200).send({
                            email: creatingUser.email,
                            nickname: creatingUser.nickname,
                            region_id: creatingUser.region_id
                        });
                    }
                } catch (error) {
                    return res.send(error)
                }
            })
        }
    } else if (password !== repeatPassword) {
        return res.status(404).send({
            response: "Password and repeat password should match"
        });
    } else {
        return res.status(404).send({
            response: "Missing fields"
        });
    }
});

// Login
router.post("/login", (req, res) => {
    res.send('Login')
});

// Logout
router.post("/logout", (req, res) => {
    res.send('Logging out...')
});

module.exports = router;