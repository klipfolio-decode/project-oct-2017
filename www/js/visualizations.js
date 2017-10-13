import $ from "jquery";
import Chart from "chart.js";

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
