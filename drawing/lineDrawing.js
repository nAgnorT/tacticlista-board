
import { swapDeviceX, swapDeviceY, translatePlayerPosition } from "./playerDrawing.js";

const drawLineButton = document.getElementById("draw-line")
let isDrawing = false
drawLineButton.onclick= function toggleDrawCircle() {
  isDrawing = !isDrawing;

  const buttonText = isDrawing ? "Dừng vẽ" : "Vẽ đường thẳng";
  drawLineButton.textContent = buttonText;


}
function drawLine(svg, ratio, lineData, centerX, centerY){

    // generate variables
    let startPoint, g, startX, startY, marker
    let drawing = false
    let count = lineData.length

    // event listeners on the svg
    svg.on("mouseup",(event) => {

        // check if the left mouse button is clicked
        if(isDrawing) {
            if(event.button === 0){
                // if the drawing is true, then we are in the middle of drawing a line, so we need to end the drawing
                if(drawing){
                    // remove the g element that contains the line of status drawing
                    count++
                    svg.select("g.draw-line").remove()
    
                    // get the x and y coordinates of the mouse pointer
                    let x2 = d3.pointer(event)[0]
                    let y2 = d3.pointer(event)[1]
                    let x1 = startPoint[0]
                    let y1 = startPoint[1]
    
                    // create the line
                    let line = svg.append("g").append("line").attr('data-line-id',count)
                        .attr('x1', x1)
                        .attr('y1', y1)
                        .attr('x2', x2)
                        .attr('y2', y2)
                        .attr('stroke', '#53DBF3')
                        .attr('stroke-width', 0.3* ratio)
                        .attr("marker-end", "url(#triangle)")
                        .style("cursor", "pointer")
                        .call(dragLine(ratio,lineData,centerX,centerY))
                    const [firstX,firstY]= translatePlayerPosition(centerX,centerY,ratio,x1,y1)
                    const [secondX,secondY]= translatePlayerPosition(centerX,centerY,ratio,x2,y2)
                    const linePoints = {
                        id: count,
                        startX: firstX,
                        startY: firstY,
                        endX:secondX,
                        endY:secondY
                    }
                    lineData.push(linePoints)
                    console.log(lineData)
    
                    // set variables to default
                        drawing = false
                        startPoint.splice(0)
                        return
                }
    
                // if the drawing is false, then we are not in the middle of drawing a line, so we need to start drawing
                if(!drawing){
                    startPoint = d3.pointer(event) 
                    g = svg.append("g").attr("class","draw-line")
                    drawing = true
                }
            
            }
        }
    })

    // event listener for the mouse move when user moves the mouse to stretch the line
    svg.on("mousemove", (event) => {
        if(!drawing) return // if the drawing is false, do nothing

        let [x2, y2] = d3.pointer(event)
        
        if(!marker){
            marker = svg.append("g:defs").append("g:marker")
            .attr("id", "triangle")
            .attr("refX", 0)
            .attr("refY", 2)
            .attr("markerWidth", 6)
            .attr("markerHeight", 4)
            .attr("orient", "auto")
            .style("fill", "#53DBF3")
            .append("path")
            .attr("d", "M 0 0 3 2 0 4")
            .attr("stroke", "53DBF3");
        }
            g.select("line").remove()

            g.append("line")
            .attr("x1", startPoint[0])
            .attr("y1", startPoint[1])
            .attr("x2", x2)
            .attr("y2", y2)
            .attr('stroke',"#53DBF3")
            .attr('stroke-width', 0.3*ratio)
            .attr("marker-end", "url(#triangle)");

    })
}
const loadLineData =  (svg, ratio, lineData,centerX,centerY) => {
    let marker = svg.append("g:defs").append("g:marker")
    .attr("id", "triangle")
    .attr("refX", 0)
    .attr("refY", 2)
    .attr("markerWidth", 6)
    .attr("markerHeight", 4)
    .attr("orient", "auto")
    .style("fill", "#53DBF3")
    .append("path")
    .attr("d", "M 0 0 3 2 0 4")
    .attr("stroke", "53DBF3");

    let x1,y1,x2,y2
    for(let i =0; i<lineData.length; i++) {
        const d = lineData[i]
        x1 = centerX - swapDeviceX(d.startX,d.startY)*ratio
        x2 = centerX - swapDeviceX(d.endX, d.endY)*ratio
        y1 = centerY - swapDeviceY(d.startX,d.startY) *ratio
        y2 = centerY- swapDeviceY(d.endX,d.endY)*ratio
        let line = svg.append("g").append("line").attr('data-line-id',d.id).attr("class", "line")
        .attr('x1', x1)
        .attr('y1', y1)
        .attr('x2', x2)
        .attr('y2', y2)
        .attr('stroke', '#53DBF3')
        .attr('stroke-width', 0.3* ratio)
        .attr("marker-end", "url(#triangle)")
        .style("cursor", "pointer")
        .call(dragLine(ratio,lineData,centerX,centerY))
    }

   


    
}

const dragLine = (ratio,lineData,centerX,centerY) => {


    let startX,startY
    function dragstarted(event) { 
        startX = event.x
        startY = event.y
    }

    function dragged(event) {
        let offSetX = event.x - startX
        let offSetY = event.y - startY
        d3.select(this.parentNode).select("line").attr("transform", `translate(${offSetX}, ${offSetY})`)    
    }
    function dragended(event) {
        let offSetX = event.x - startX
        let offSetY = event.y - startY
        const id = d3.select(this).attr("data-line-id") -1
        let line = d3.select(this)

        let g = d3.select(this.parentNode)
        let x1 = parseFloat(line.attr("x1"))
        let y1 = parseFloat(line.attr("y1"))
        let x2 = parseFloat(line.attr("x2"))
        let y2 = parseFloat(line.attr("y2"))
        
        x1 = x1 + offSetX
        y1 = y1 + offSetY
        x2 = x2 + offSetX
        y2 = y2 + offSetY
        console.log(id)
        lineData[id].startX = translatePlayerPosition(centerX,centerY,ratio,x1,y1)[0]
        lineData[id].startY = translatePlayerPosition(centerX,centerY,ratio,x1,y1)[1]
        lineData[id].endX=translatePlayerPosition(centerX,centerY,ratio,x2,y2)[0]
        lineData[id].endY= translatePlayerPosition(centerX,centerY,ratio,x2,y2)[1]
        line.remove()
        g.append("line").attr('data-line-id',id+1)
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr('stroke', '#53DBF3')
        .attr('stroke-width', 0.3*ratio)
        .attr("marker-end", "url(#triangle)")
        .style("cursor", "pointer")
        .call(dragLine(ratio,lineData,centerX,centerY))

    }

    return d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended)


}
export {
    drawLine,
    loadLineData
}