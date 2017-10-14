module.exports.mapData = (data) => {
    var ourData = {
        "visualizations": []
    }

    // console.log(data);
    var value = data.results.value
    var labels = data.results.time

    ourData["visualizations"].push({
        "id": "1",
        "type": "line",
        "label": "name",
        "data": {
            "labels": labels,
            "datasets": [{
                "label": "# of Votes",
                "data": value,
                "borderColor": [
                    "rgba(255,99,132,1)"
                ],
                "borderWidth": 1
            }]
        }
    });
    return ourData
}
