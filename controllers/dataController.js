const dataService = require('../services/dataService')

module.exports.getVisualizations = (req, res) => {
	res.status(200).json(dataService.get())
}

module.exports.getAllMetrics = async (req, res) => {
	try {
		let metrics = await dataService.getAllMetrics()
		res.status(200).json(metrics)
	} catch (err) {
		res.status(500).send(err)
	}
}
