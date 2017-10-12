var express = require("express");
var visualizations = require("./api/visualizations");

module.exports.register = function(app) {
    // set up static routes
    app.use(express.static("./www/html"));
    app.use("/js", express.static("./www/js"));
    app.use("/css", express.static("./www/css"));
    app.use("/build", express.static("./build"))

    // set up routes
    app.get("/", function(req, res) {
        res.render("index");
    });

    app.get("/visualizations", function(req, res) {
        res.json(visualizations.get());
    });
};
