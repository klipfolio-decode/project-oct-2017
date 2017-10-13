var app = require("express").Router()
var visualizations = require("./api/visualizations");

app.get("/visualizations", function(req, res) {
    res.json(visualizations.get());
});

module.exports = app
