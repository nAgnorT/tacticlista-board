const loadHorizontalPitch = (svg,pitchWidth,centerX, centerY) => {
    const pitchHeight = pitchWidth*0.64
    const bigCircle = pitchWidth*0.0915
    const penaltyKick = pitchWidth * 0.11
    const penaltyAreaHeight = pitchWidth * 0.403
    const penaltyAreaWidth = pitchWidth * 0.165
    const goalAreaHeight = pitchWidth * 0.183
    const goalAreaWidth = pitchWidth * 0.055
    const goalWidth = pitchWidth*0.02
    const goalHeight = pitchWidth*0.0732

    //Khung sân
    svg.append('rect')
        .attr("x", centerX - pitchWidth/2)
        .attr("y", centerY - pitchHeight/2)
        .attr("width", pitchWidth)
        .attr("height", pitchHeight)
    
    //Đường giữa sân
    svg.append("line")
        .attr("x1", centerX)
        .attr("y1", centerY - pitchHeight/2)
        .attr("x2", centerX)
        .attr("y2", centerY + pitchHeight/2)

    //Chấm và vòng giữa sân
    svg.append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("r", 2)
        .attr("fill", "black")
    svg.append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("r", bigCircle)
        .attr("fill","none" )
    //Vòng cấm
    svg.append('rect')
        .attr("x",centerX - pitchWidth/2)
        .attr("y", centerY - penaltyAreaHeight/2)
        .attr("width", penaltyAreaWidth)
        .attr("height", penaltyAreaHeight)
    svg.append('rect')
        .attr("x",centerX + pitchWidth/2 -penaltyAreaWidth)
        .attr("y", centerY - penaltyAreaHeight/2)
        .attr("width", penaltyAreaWidth)
        .attr("height", penaltyAreaHeight)

    //Vòng bán nguyệt trước vòng cấm    
    const startAngle = Math.asin(5.5/9.15);
    const endAngle = (Math.PI / 2 + Math.acos(5.5/9.15));
        
    svg.append("path")
        .attr("d", d3.arc()({
            innerRadius: bigCircle,
            outerRadius: bigCircle,
            startAngle: startAngle,
            endAngle: endAngle,
        }))
        .attr("transform", `translate(${centerX-pitchWidth/2+penaltyKick}, ${centerY})`)
    svg.append("path")
        .attr("d", d3.arc()({
            innerRadius: bigCircle,
            outerRadius: bigCircle,
            startAngle: -startAngle,
            endAngle: -endAngle,
        }))
        .attr("transform", `translate(${centerX + pitchWidth/2 - penaltyKick}, ${centerY})`)
    
    //Chấm penalty
    svg.append("circle")
        .attr("cx", centerX - pitchWidth/2 + penaltyKick)
        .attr("cy", centerY)
        .attr("r", 2)
        .attr("fill", "black")
    svg.append("circle")
        .attr("cx", centerX + pitchWidth/2 - penaltyKick)
        .attr("cy", centerY)
        .attr("r", 2)
        .attr("fill", "black")

    //Vòng 5m50
    svg.append('rect')
        .attr("x", centerX- pitchWidth/2)
        .attr("y", centerY - goalAreaHeight/2)
        .attr("width", goalAreaWidth)
        .attr("height", goalAreaHeight)
    svg.append('rect')
        .attr("x", centerX + pitchWidth/2 - goalAreaWidth)
        .attr("y", centerY - goalAreaHeight/2)
        .attr("width", goalAreaWidth)
        .attr("height", goalAreaHeight)
    
    //Cầu môn
    svg.append("rect")
        .attr("x", centerX-pitchWidth/2-goalWidth)
        .attr("y", centerY-goalHeight/2)
        .attr("width", goalWidth)
        .attr("height", goalHeight)
    svg.append("rect")
        .attr("class", "goal")
        .attr("x", centerX+pitchWidth/2)
        .attr("y", centerY-goalHeight/2)
        .attr("width", goalWidth)
        .attr("height", goalHeight)

}
const loadVerticalPitch = (svg,pitchHeight,centerX, centerY) => {
    const pitchWidth = pitchHeight*0.64
    const bigCircle = pitchHeight*0.0915
    const penaltyKick = pitchHeight * 0.11
    const penaltyAreaHeight = pitchHeight * 0.165
    const penaltyAreaWidth = pitchHeight * 0.403
    const goalAreaHeight = pitchHeight * 0.055
    const goalAreaWidth = pitchHeight * 0.183
    const goalWidth = pitchHeight*0.0732
    const goalHeight = pitchHeight*0.02
        //Khung sân
        svg.append('rect')
        .attr("x", centerX - pitchWidth/2)
        .attr("y", centerY - pitchHeight/2)
        .attr("width", pitchWidth)
        .attr("height", pitchHeight)
    
    //Đường giữa sân
    svg.append("line")
        .attr("x1", centerX - pitchWidth/2)
        .attr("y1", centerY)
        .attr("x2", centerX + pitchWidth/2)
        .attr("y2", centerY)

    //Chấm và vòng giữa sân
    svg.append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("r", 2)
        .attr("fill", "black")
    svg.append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("r", bigCircle)
        .attr("fill","none" )
    //Vòng cấm
    svg.append('rect')
        .attr("x",centerX - penaltyAreaWidth/2)
        .attr("y", centerY -pitchHeight/2)
        .attr("width", penaltyAreaWidth)
        .attr("height", penaltyAreaHeight)
    svg.append('rect')
        .attr("x",centerX - penaltyAreaWidth/2)
        .attr("y", centerY + pitchHeight/2- penaltyAreaHeight)
        .attr("width", penaltyAreaWidth)
        .attr("height", penaltyAreaHeight)

    //Vòng bán nguyệt trước vòng cấm Math.asin(5.5/9.15)    
    const startAngle = (Math.PI / 2 + Math.asin(5.5/9.15));
    const endAngle = (Math.PI  + Math.acos(5.5/9.15));
        
    svg.append("path")
        .attr("d", d3.arc()({
            innerRadius: bigCircle,
            outerRadius: bigCircle,
            startAngle: startAngle,
            endAngle: endAngle,
        }))
        .attr("transform", `translate(${centerX}, ${centerY-pitchHeight/2+penaltyKick})`)
    svg.append("path")
        .attr("d", d3.arc()({
            innerRadius: bigCircle,
            outerRadius: bigCircle,
            startAngle: -startAngle + Math.PI,
            endAngle: -endAngle + Math.PI,
        }))
        .attr("transform", `translate(${centerX}, ${centerY + pitchHeight/2 - penaltyKick})`)
    
    //Chấm penalty
    svg.append("circle")
        .attr("cx", centerX )
        .attr("cy", centerY- pitchHeight/2 + penaltyKick)
        .attr("r", 2)
        .attr("fill", "black")
    svg.append("circle")
        .attr("cx", centerX )
        .attr("cy", centerY+ pitchHeight/2 - penaltyKick)
        .attr("r", 2)
        .attr("fill", "black")

    //Vòng 5m50
    svg.append('rect')
        .attr("x", centerX- goalAreaWidth/2)
        .attr("y", centerY - pitchHeight/2)
        .attr("width", goalAreaWidth)
        .attr("height", goalAreaHeight)
    svg.append('rect')
        .attr("x", centerX - goalAreaWidth/2)
        .attr("y", centerY + pitchHeight/2 - goalAreaHeight)
        .attr("width", goalAreaWidth)
        .attr("height", goalAreaHeight)
    
    //Cầu môn
    svg.append("rect")
        .attr("x", centerX-goalWidth/2)
        .attr("y", centerY-pitchHeight/2-goalHeight)
        .attr("width", goalWidth)
        .attr("height", goalHeight)
    svg.append("rect")
        .attr("class", "goal")
        .attr("x", centerX-goalWidth/2)
        .attr("y", centerY+pitchHeight/2)
        .attr("width", goalWidth)
        .attr("height", goalHeight)
}

export {
    loadHorizontalPitch,
    loadVerticalPitch
}