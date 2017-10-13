const dataService = require('../services/dataService')
const lexUtils = require("../utils/lexParseUtils")
const config = require("../config.json")

module.exports.getVisualizations = async (req, res) => {
  let metric = req.body["slots"]["metric"]
  try{
	  let metricId = await dataService.getMetricByName(metric)
	  let aggregation = null
	  let periodicity = "1d"

	  let range = lexUtils.getRange(req.body.slots.period)
	  let groupby = lexUtils.getDimensionType(req.body.slots.dimensionType)
	  let filter = lexUtils.getDimension(req.body.slots.dimension)
	  let query = lexUtils.getQuery(aggregation,periodicity,range,groupby,filter)
	  console.log(query)
	  let data = await dataService.runQuery(metricId, query)
	  res.status(200).json(data)
  } catch(err){
    console.error(err)
    res.status(500).send(err)
  }
}

module.exports.getAllMetrics = async (req, res) => {
	try {
		let metrics = await dataService.getAllMetrics()
		res.status(200).json(metrics)
	} catch (err) {
		res.status(500).send(err)
	}
}

module.exports.getMetricByName = async (req, res) => {
	let metricId = await dataService.getMetricByName(req.query.name)
	res.status(200).json({
		'metricId': metricId
	})
}

module.exports.test = async (req, res) => {
	try {
		let data = await dataService.runQuery('748a65637ad59980a7f9151e2bc12e6f', '{periodicity:1d,range:now-7d,aggregation:sum}')
		await dataService.exportToFirebase(data)
		res.status(200).json({
			'data': data
		})
	} catch (err) {
		res.status(500).send(err)
	}
}
