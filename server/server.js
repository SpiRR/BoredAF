const express = require("express");
const app = express();
const port = 9090;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:9090");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD, OPTIONS");
    res.header("Access-Control-Allow-Credentials", true)
    next();
})

// -----------------------------------------------
const { Model } = require("objection")
const knexFile = require("./knexfile.js");
const Knex = require("knex");

const knex = Knex(knexFile.development);

Model.knex(knex);

// -----------------------------------------------
const homepage = require("./routes/homepage.js");
const users = require("./routes/users/users.js");
const activities = require("./routes/activities/activities.js");

app.use("/", homepage);
app.use("/users", users);
app.use("/activities", activities)


app.listen(port, err => {
    if (err) {
        console.log("Error on app");
        return;
    }
    console.log("Server is listening.....")
})