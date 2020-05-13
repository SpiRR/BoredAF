const express = require("express");
const app = express();
const port = 9090;

app.use(express.urlencoded({extended: false}));
app.use(express.json());


const homepage = require("./routes/homepage.js")

app.use("/", homepage);


app.listen(port, err => {
    if (err) {
        console.log("Error on app");
        return
    }
    console.log("Server is listening.....")
})