const isVertical = (svgWidth, svgHeight) => {
    let height = window.innerHeight * 0.95
    let width = height * 0.64
    if(width > window.innerWidth){
        width = window.innerWidth *0.9
        height = width * 100/64
    }
    do {
        if(svgWidth < width && svgHeight < height ){
            svgHeight = height
            svgWidth = svgHeight*0.64
            }
        else if (svgHeight > height) {
            svgHeight = height
            svgWidth = svgHeight * 0.64
        }
        else {
            svgWidth = width
            svgHeight = svgWidth * 100/64
        }
    } while (svgWidth>width)
    return {
        svgWidth: svgWidth,
        svgHeight: svgHeight
    }

}
const isHorizontal = (svgWidth, svgHeight) =>{
    let width = window.innerWidth*0.95
    let height = width*0.64
    if(height> window.innerHeight){
        height = window.innerHeight*0.95
        width = height * 100/64
    }
    do {
          if(svgWidth < width && svgHeight < height ){
              svgWidth = width
              svgHeight = svgWidth*0.64
              }
          else if (svgHeight > height) {
              svgHeight = height
              svgWidth = svgHeight * 100/64
          }
          else {
              svgWidth = width
              svgHeight = svgWidth*0.64
          }
    } while(svgHeight > height)

    return {
        svgWidth: svgWidth,
        svgHeight: svgHeight
    }

}

export {
    isHorizontal,
    isVertical
}