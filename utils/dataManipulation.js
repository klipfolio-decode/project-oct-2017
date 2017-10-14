module.exports.mapData = (data) => {
    const renderDimension = (label, values, color) => ({
        "label": label,
        "data": values,
        "borderColor": [color],
        "borderWidth": 2,
        fill: false
    });

    const renderDimensions = (metricName, dimensionValues, values) => {
        if (dimensionValues) {
            const colors = ["rgba(52,152,219,1)","rgba(230,126,34,1)","rgba(46,204,113,1)"];
            const uniqueDimensionValues = new Set(dimensionValues);
            return [...uniqueDimensionValues].map((dimensionValue,pos) => (
                renderDimension(dimensionValue,values.filter(
                    (value,i) => (dimensionValues[i] === dimensionValue)
                ), colors[pos])
            ))

        } else {
            return renderDimension(metricName, values, "rgba(52,152,219,1)");
        }
    }

    var ourData = {
        "visualizations": []
    }
    var typeMap = new Set(data.results.d4b04ded4b32361ef6484773c515aad5)
    ourData["visualizations"].push(
        {
            "type": "line",
            "label": "Social Media Likes",
            "data": {
                "labels": [...new Set(data.results.time)],
                "datasets":  renderDimensions("Like", data.results.d4b04ded4b32361ef6484773c515aad5, data.results.value)
            }
        }
    )
    return ourData
}
