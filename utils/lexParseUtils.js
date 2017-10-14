const dataService = require('../services/dataService')
const possibleDimensions = ['friend', 'family', 'stranger']


module.exports.getRange = (rangeResponse) => {
  if(rangeResponse){
    let startRange
    let regex = /([A-Za-z ]*)(\d*)( [A-Za-z]+)/
    let [sign, period, unit] = rangeResponse.match(regex).slice(1, 4).map(
      e => e.replace(/(^ | $)/g,'')
    )
    startRange = sign.includes('last') || sign.includes('past') ? 'now' : 'next'
    return `${startRange}-${period}${unit[0]}`
  } else {
    return "now-30d"
  }
}

module.exports.getDimensionType = async (dimensionTypeResponse) => {
    if(dimensionTypeResponse){
      try {
        let dimensionTypeId = await dataService.getDimensionTypeByName(dimensionTypeResponse)
        return dimensionTypeId
      } catch (err) {
        console.log("ERROR:", err)
        res.status(500).send(err)
      }
    }
}


  module.exports.getQuery = (aggregation,periodicity = "1d",range,groupby,filter) => {
    let queryString = "{"
    if(aggregation){
      queryString+="aggregation:"+aggregation+","
    }
    if(periodicity) {
      queryString+="periodicity:"+periodicity+","
    }
    if(range) {
      queryString+="range:"+range+","
    }
    if(groupby) {
      queryString+="groupby:"+groupby+","
    }
    if(filter) {
      queryString+="filter:d4b04ded4b32361ef6484773c515aad5=("+filter.toString()+")"
    }

    return encodeURIComponent(queryString+"}")
  }

module.exports.getDimension = (dimensionResponse) => {
    if(dimensionResponse){
      let dimensionArray = possibleDimensions.filter(dimen => dimensionResponse.includes(dimen))
      return dimensionArray
    }
  }
