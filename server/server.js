const express = require("express");
const app = express();
const port = 9090;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// -----------------------------------------------
const { Model } = require("objection")
const knexFile = require("./knexfile.js");
const Knex = require("knex");

const knex = Knex(knexFile.development);

Model.knex(knex);

// -----------------------------------------------

const homepage = require("./routes/homepage.js")

app.use("/", homepage);


app.listen(port, err => {
    if (err) {
        console.log("Error on app");
        return;
    }
    console.log("Server is listening.....")
})