module.exports.map = async(data) => {
  try {
    var ourData = {
      "visualizations": []
    }
    var value = data.data.results.value
    var labels = data.data.results.time

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

    return JSON.parse(ourData)
    
  } catch (err) {
    res.status(500).send(err)
  }
}
