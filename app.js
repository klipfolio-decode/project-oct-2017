const express = require("express");
const app = express();

const routes = require("./server/routes");
const config = require("./config.json");

routes.register(app);

app.listen(config.port);
