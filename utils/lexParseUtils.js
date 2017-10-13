const possibleDimensions = ['friend', 'family', 'stranger']


module.exports.getRange = (rangeResponse) => {
  let startRange
  let regex = /([A-Za-z ]*)(\d*)( [A-Za-z]+)/
  let [sign, period, unit] = rangeResponse.match(regex).slice(1, 4)
  startRange = sign.includes('last') || sign.includes('past') ? 'now' : 'next'
}

module.exports.getDimensionType = (dimensionTypeResponse) => {
    if(dimensionTypeResponse){
      return "d4b04ded4b32361ef6484773c515aad5"
    }
  }
  
module.exports.getDimension = (dimensionResponse) => {
    if(dimensionResponse){
      let dimensionArray = possibleDimensions.filter(dimen => dimensionResponse.contains(dimen))
      return dimensionArray
    }
  }
