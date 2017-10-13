const request = require("async-request")
const config = require("../config.json")

module.exports.getAllMetrics = async () => {
    const endpoint = `https://${config.external_api}:${config.external_api_port}/api/v1/metrics/`
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
