const possibleDimensions = ['friend', 'family', 'stranger']


module.exports.getRange = (rangeResponse) => {
    let startRange
    if (rangeResponse.contains('last') || rangeResponse.contains('past')){
        startRange = 'now'
    } else if (rangeResponse.contains('from')) {

    }
    if(rangeResponse.contains)
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