var app = require("express").Router()
const dataController = require('../controllers/dataController')
var visualizations = require("./api/visualizations");

app.get("/visualizations", dataController.getVisualizations);

app.get("/metrics", dataController.getAllMetrics)

app.get("/getMetricByName", dataController.getMetricByName)

app.get("/test", dataController.test)

module.exports = app
