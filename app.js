const express = require("express");
const app = express();
const config = require("./config.json");
const bodyParser = require('body-parser')
const colors = require('colors')

app.use(bodyParser.json())

// set up static routes
app.use(express.static("./www/html"));
app.use("/js", express.static("./www/js"));
app.use("/css", express.static("./www/css"));
app.use("/build", express.static("./build"))

app.get("/", function(req, res) {
	res.render("index");
});

app.use("/api", require("./server/routes"))

app.listen(config.port);

console.log("=====================================".bold.red)
console.log("====  SERVER OPEN FOR BUSINESS   ====".bold.red);
console.log(`====         PORT ${config.port}           ====`.bold.red);
console.log("=====================================".bold.red)
