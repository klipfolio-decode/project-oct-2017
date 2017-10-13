import $ from "jquery";
import Chart from "chart.js";

var mockData = {
    "visualizations": [
        {
            "id": "1",
            "type": "line",
            "label": "name",
            "data":{
                "labels": ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                "datasets": [{
                    "label": "# of Votes",
                    "data": [12, 19, 3, 5, 2, 3],
                    "borderColor": [
                        "rgba(255,99,132,1)"],
                    "borderWidth": 1
                },{
                    "label": "# of Whatever;",
                    "data": [11, 18, 2, 4, 1, 2],
                    "borderColor": [
                        "rgba(255,99,132,1)"],
                    "borderWidth": 1
                }]
            }
        },
        {
            "id": "2",
            "type": "line",
            "label": "name2",
            "data":{
                "labels": ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                "datasets": [{
                    "label": "# of Votes",
                    "data": [5, 12, 10, 1, 26, 3],
                    "borderColor": [
                        "rgba(255,99,132,1)"],
                    "borderWidth": 1
                },{
                    "label": "# of Whatever;",
                    "data": [11, 18, 2, 4, 1, 2],
                    "borderColor": [
                        "rgba(255,99,132,1)"],
                    "borderWidth": 1
                }]
            }
        }
    ]};

export function renderAll(data){
    $("#visualizationContainer").html("")

    data.visualizations.forEach(function(visualization){
        renderChart("visualizationContainer", visualization);
    })
}

export function renderTo(target) {
    $.get("/api/visualizations")
    .done(function(res) {
        $("#" + target).html("Request response: " + JSON.stringify(res));
    })
    .fail(function(err) {
        console.log("error: ", err);
    });
};

export function renderChart(target, visualization) {
    var canvas = $("<canvas>");

    var context = canvas.get(0).getContext("2d");
    var myChart = new Chart(context, {
        type: visualization.type,
        data: visualization.data,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

    canvas.appendTo($("#" + target))
}
