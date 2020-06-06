const express = require("express");
const app = express();
const session = require("express-session");
const port = 9090;
const cookie = require("./cookie_config/cookieconfig.js");
const { Model } = require("objection");
const knexFile = require("./knexfile.js");
const Knex = require("knex");
const cookieParser = require('cookie-parser');
const KnexSessionStore = require('connect-session-knex')(session);

app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.Router());

// KNEX
const knex = Knex(knexFile.development);
Model.knex(knex);


// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:9090");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE, HEAD, OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    next();
})

// KNEX SESSION -> store the sessions in DB via KNEX
const store = new KnexSessionStore({
    knex: knex,
    tablename: "sessions", // optional. Defaults to 'sessions'
    createtable: true
  });

// Session
app.use(session({ 
    secret: cookie.cookieSecret,
    store: store,
    resave: true,
    saveUninitialized: false,
    cookie: {
        domain: 'localhost',
        path: '/',
        maxAge: 24 * 60 * 60 * 1000,
        secure: false
    },
}));

// Endpoint to check session
app.get("/sess", (req, res) => {
    res.send(req.session);
});

// User and Activity routes
const users = require("./routes/users/users.js");
const activities = require("./routes/activities/activities.js");

app.use("/users", users); 
app.use("/activities", activities);

// Server listen
app.listen(port, err => {
    if (err) {
        console.log("Error on app");
        return;
    }
    console.log(`Server is listening on port: ${port}.....`);
});