const config = require("../config.json")
const admin = require("firebase-admin");
const serviceAccount = config.firebase_admin;
const endpoint = `https://${config.external_api}:${config.external_api_port}/api/v1/metrics/`
const request = require("async-request")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://klipfolio-e40dd.firebaseio.com"
});

const db = admin.database().ref('/')

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

module.exports.getDimensionTypeByName = async (DimensionType = 'follower_type') => {
    DimensionType = DimensionType.toLowerCase()
    let res = await this.getAllMetrics()
    let metrics = res['metrics']
    for (var i in metrics) {
        let dimensions = metrics[i]["dimensions"]
        for(var j in dimensions){
            if(dimensions[i]['name'].indexOf(DimensionType) !== -1) {
                return dimensions[i]['publicId']
            }
        }
    }
    return -1
}


module.exports.runQuery = async (metricId, query) => {
    console.log("Running query on external API".green)
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

module.exports.exportToFirebase = async (data) => {
    console.log("Exporting data to Firebase".green)
    var test_data = db.child('data')

    return test_data.set(data)
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
