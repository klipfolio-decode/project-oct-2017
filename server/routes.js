var app = require("express").Router()
const dataController = require('../controllers/dataController')
var visualizations = require("./api/visualizations");

app.get("/visualizations", dataController.getVisualizations);

app.get("/metrics", dataController.getAllMetrics)

module.exports = app
