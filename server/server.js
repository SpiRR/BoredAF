const express = require("express");
const app = express();
const session = require("express-session");
const rateLimit = require("express-rate-limit");
const port = 9090;
const cookie = require("./cookie_config/cookieconfig.js");
const { Model } = require("objection");
const knexFile = require("./knexfile.js");
const Knex = require("knex");
const cookieParser = require('cookie-parser')
const KnexSessionStore = require('connect-session-knex')(session);
// -----------------------------------------------
const knex = Knex(knexFile.development);
Model.knex(knex);

app.use(cookieParser())
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.Router());
// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:9090");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE, HEAD, OPTIONS");
    res.header("Access-Control-Allow-Credentials", true)
    next();
})


// Rate limiter - to limit requests to api and endpoints! 
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Timeframe for which requests are checked/remembered
    max: 100 // limit each IP to 100 requests per windowMs
})

// KNEX SESSION -> store the sessions in DB via KNEX
const store = new KnexSessionStore({
    knex: knex,
    tablename: "sessions", // optional. Defaults to 'sessions'
    createtable: true
  });

// Cookie
app.use(session({ 
    secret: cookie.cookieSecret,
    store: store,
    resave: true,
    saveUninitialized: true,
    cookie: {
        domain: 'localhost',
        path: '/',
        maxAge: 24 * 60 * 60 * 1000,
        secure: false
    },
}))

// -----------------------------------------------
const users = require("./routes/users/users.js");
const activities = require("./routes/activities/activities.js");

app.use("/users", users); //authLimiter
app.use("/activities", activities)

app.get("/sess", (req, res) => {
    res.send(req.session);
})

app.listen(port, err => {
    if (err) {
        console.log("Error on app");
        return;
    }
    console.log(`Server is listening on port: ${port}.....`)
})