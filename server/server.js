const express = require("express");
const app = express();
const session = require("express-session");
const rateLimit = require("express-rate-limit");
const port = 9090;
const cookie = require("./cookie_config/cookieconfig.js");

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:9090");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE, HEAD, OPTIONS");
    res.header("Access-Control-Allow-Credentials", true)
    next();
})

// -----------------------------------------------
const { Model } = require("objection");
const knexFile = require("./knexfile.js");
const Knex = require("knex");

const knex = Knex(knexFile.development);

Model.knex(knex);

// Rate limiter - to limit requests to api and endpoints! 
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Timeframe for which requests are checked/remembered
    max: 100 // limit each IP to 100 requests per windowMs
})

// Cookie
app.use(session({ // Not saving the cookies in a store (Knex for example)
    secret: cookie.cookieSecret,
    resave: false,
    saveUninitialized: false
}))

// -----------------------------------------------
const homepage = require("./routes/homepage.js");
const users = require("./routes/users/users.js");
const activities = require("./routes/activities/activities.js");

app.use("/", homepage);
app.use("/users", users, authLimiter);
app.use("/activities", activities)


app.listen(port, err => {
    if (err) {
        console.log("Error on app");
        return;
    }
    console.log("Server is listening.....")
})