const server = require("express")();
const path = require("path")
const port = 9090;

const homepage = require(
    path.join(__dirname, "routes", "homepage.js")
)

server.use(homepage, function (err) {
    if (err) {
        console.log('Error in homepage route');
        return
    }
})


server.listen(port, err => {
    if (err) {
        console.log("Error on server");
        return
    }
    console.log("Server is listening.....")
})