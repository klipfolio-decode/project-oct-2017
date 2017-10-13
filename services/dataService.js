const request = require("async-request")
const config = require("../config.json")
const endpoint = `https://${config.external_api}:${config.external_api_port}/api/v1/metrics/`

module.exports.getAllMetrics = async () => {
    let res = await request(endpoint, {
        method: 'GET',
        headers: {
            'company-id': '1a6786090f557ec5774da0d71adbddef',
            'kf-api-key': '53b9c1eac8cc70b5c795a5578730037673c4ccbe',
            'Content-Type': 'application/json'
        }
    })

    if (res.statusCode !== 200)
        throw new Error(`${endpoint} responded with ${res.statusCode}`)

    return JSON.parse(res.body)
}

module.exports.getMetricByName = async (metricName = 'Likes') => {
    metricName = metricName.toLowerCase()
    let res = await this.getAllMetrics()
    let metrics = res['metrics']
    for (var i in metrics) {
        if(metrics[i]['name'].indexOf(metricName) !== -1) {
            return metrics[i]['publicId']
        }
    }
    return -1
}

module.exports.runQuery = async (metricId, query) => {
    const endpoint = `https://${config.external_api}:${config.external_api_port}/api/v1/metrics/`
    let res = await request(`${endpoint}/${metricId}/values?q=${query}`, {
        method: 'GET',
        headers: {
            'company-id': '1a6786090f557ec5774da0d71adbddef',
            'kf-api-key': '53b9c1eac8cc70b5c795a5578730037673c4ccbe',
            'Content-Type': 'application/json'
        }
    })

    if (res.statusCode !== 200)
        throw new Error(`${endpoint} responded with ${res.statusCode}`)

    return JSON.parse(res.body)
}

module.exports.get = () => {
    return {
        visualizations: [
            {
                id: "1",
                name: "Viz 1"
            },
            {
                id: "2",
                name: "Viz 2"
            }
        ]
    };
};