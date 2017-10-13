const dataService = require('../services/dataService')

module.exports.getVisualizations = (req, res) => {
	res.status(200).json(dataService.get())
}
