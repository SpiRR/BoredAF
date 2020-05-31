const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const saltRounds = 10;

// Forst end-point for users
router.get('/', (req, res) => {
    res.send('users');
});

// Register
router.post("/register", async (req, res) => {
    const { email, nickname, password, repeatPassword } = req.body;

    if (email && nickname && password && repeatPassword && password === repeatPassword) {

        if (password.length < 8) {
            res.status(404).send({response: 'Password does not meet the requirements'});

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

                    console.log(doesUserExists[0]);

                    if (doesUserExists[0]) {
                        return res.status(449).send({ response: "User already exists" });

                    } else {
                            const creatingUser = await User.query().insert({
                            email,
                            nickname,
                            password: hashedPassword
                        });

                        return res.status(200).send({
                            email: creatingUser.email,
                            nickname: creatingUser.nickname
                        });
                    }

                } catch (error) {
                    return res.send(error)
                }
            });
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
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if ( email && password ) {
        const doesUserExists = await User.query().select().where({ email: email }).limit(1);
        const foundUser = doesUserExists[0];

        if ( !foundUser ) {
            return res.status(404).send({response: 'Invalid login'});
        }

        await bcrypt.compare( password, foundUser.password, ( error, isSame ) => {
            if (error) {
                return res.status(500).send({response: 'Internal error'});
            }

            if ( !isSame ) {
                return res.status(404).send({response: 'Invalid login!'});

            } else {

                const userObj = {
                    email: foundUser.email,
                    auth : true,
                    user_id : foundUser.id
                }

                return res.status(200).send({ user: userObj });
            }
        });

    } else {
        return res.status(404).send({ response: 'Missing credentials!' });
    }

});



// User info
router.get("/profile/:id", async (req, res) => {
    const { id } = req.params;

    let user = await User.singleOrDefault({ id: id });
    res.status(200).send({
        email: user.email,
        nickname: user.nickname
    }); 
});


// Change password
router.patch("/changepw/:id", async (req, res) => {
    const id = req.params.id;
    const { newPassword, repeatNewPassword } = req.body;

      if ( newPassword && repeatNewPassword && newPassword === repeatNewPassword ) {
            if ( newPassword.length < 8 ) {
                return res.status(400).send({ response: "Password does not fulfill the requirements" });
            } else {
            
            bcrypt.hash(newPassword, saltRounds, async (error, hashedNewPassword) => {
                if (error) {
                    return res.status(500).send({ });
                }

                try {
                    const user_id = id;

                    const updatePassword = await User.query().update({
                        password: hashedNewPassword
                    }).where({id : user_id});
     
                    console.log(user_id);

                    if (updatePassword < 1) {
                        return res.send({response: 'Ups..'});
                    }

                    res.status(200).send({
                        response: 'Password has succeccfully been updated!',
                        updatePassword: updatePassword,
                        user_id: user_id 
                    });

                } catch (error) {
                    console.log(error)
                    return res.status(500).send({ response: "Something went wrong with the database" });
                }
            })
        }
    } else if (newPassword !== repeatNewPassword) {
        return res.status(404).send({ response: "Password and repeat password are not the same" });

    } else if (!newPassword || !repeatNewPassword) {
        return res.status(404).send({ response: "No input value" });

    } else {
        return res.status(404).send({ response: "Missing fields" });

    }
});

// Logout
router.post("/users/logout", function(req, res) {
    const session = req.session;

    if (session) {
        session.destroy(function(err) {
            if(err) {
                return next(err);

            } else {
                req.session = null; 
                console.log("logout successful");
                return res.redirect("/");
            }
        });
    }  
});

module.exports = router;