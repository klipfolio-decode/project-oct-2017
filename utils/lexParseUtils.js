const possibleDimensions = ['friend', 'family', 'stranger']


module.exports.getRange = (rangeResponse) => {
<<<<<<< Updated upstream
  let startRange
  let regex = /([A-Za-z ]*)(\d*)( [A-Za-z]+)/
  let [sign, period, unit] = rangeResponse.match(regex).slice(1, 4).map(
    e => e.replace(/(^ | $)/g,'')
  )
  startRange = sign.includes('last') || sign.includes('past') ? 'now' : 'next'
  return `${startRange}-${period}${unit[0]}`
=======
    let startRange
    if (rangeResponse.contains('last') || rangeResponse.contains('past')){
        startRange = 'now'
    } else if (rangeResponse.contains('from')) {

    }
>>>>>>> Stashed changes
}

module.exports.getDimensionType = (dimensionTypeResponse) => {
    if(dimensionTypeResponse){
      return "d4b04ded4b32361ef6484773c515aad5"
    }
  }

<<<<<<< Updated upstream
=======
  module.exports.getQuery = (aggregation,periodicity,range,groupby,filter) => {
    let queryString = "{"
    if(aggregation){
      queryString+="aggregation:"+aggregation
    }
    if(periodicity) {
      queryString+="periodicity:"+periodicity
    }
    if(range) {
      queryString+="range:"+range
    }
    if(groupby) {
      queryString+="groupby:"+groupby
    }
    if(filter) {
      queryString+="filter:"+filter
    }
    return encodeURIComponent(queryString+"}")
  }
  
>>>>>>> Stashed changes
module.exports.getDimension = (dimensionResponse) => {
    if(dimensionResponse){
      let dimensionArray = possibleDimensions.filter(dimen => dimensionResponse.contains(dimen))
      return dimensionArray
    }
  }
