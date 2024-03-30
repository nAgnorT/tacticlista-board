import isMobile from "../checking/isMobile.js";
const drawPlayerButton = document.getElementById("draw-player")
let isDrawing = false
drawPlayerButton.onclick= function toggleDrawCircle() {
  isDrawing = !isDrawing;

  const buttonText = isDrawing ? "Dừng vẽ" : "Vẽ cầu thủ";
  drawPlayerButton.textContent = buttonText;


}

const playerDraw = (svg,playerData, ratio,centerX,centerY) => {

    svg.on("click", function(e){
        if (isDrawing) {
          let count = playerData.length +1
          let [baseX,baseY] = d3.pointer(e)
          const r = ratio * 1.5
          const player = svg.append('g').attr("data-id",count).attr("class","player").style("cursor", "pointer")
          const [transX, transY] = translatePlayerPosition(centerX,centerY, ratio, baseX,baseY)
           const playerPoint = {
            id: count,
            x: transX,
            y: transY
           }
            playerData.push(playerPoint)
            player.append("circle")
              .attr("cx", baseX)
              .attr("cy", baseY)
              .attr("r", r)
              .attr("fill", "red");
          
          
            player.append("text")
              .attr("x", baseX)
              .attr("y", baseY)
              .attr("font-size", "1rem")
              .attr("text-anchor", "middle")
              .attr("font", "bold")
              .attr("color", "white")
              .text(count);
          
            player.call(dragPlayer(playerData,centerX,centerY,ratio))
          }
    })
}
const loadPlayerData = (svg, playerData, ratio, centerX,centerY) => {
  const r = 1.5*ratio
  for( let i = 0; i<playerData.length; i++) {
    const d = playerData[i]
    const player = svg.append('g').attr("data-id", d.id).attr("class","player").style("cursor","pointer")
    player.append('circle')
      .attr("cx", centerX - swapDeviceX(d.x,d.y)*ratio )
      .attr("cy", centerY - swapDeviceY(d.x,d.y)*ratio)
      .attr("r",r)
      .attr("fill", "red") 
    player.append('text')
      .attr("x", centerX - swapDeviceX(d.x,d.y)*ratio)
      .attr("y", centerY - swapDeviceY(d.x,d.y)*ratio)
      .attr("font-size", "1 rem")
      .attr("text-anchor", "middle")
      .text(d.id);
    player.call(dragPlayer(playerData,centerX,centerY,ratio))
  }
  
}
const translatePlayerPosition = (centerX, centerY, ratio, x, y) => {
  
  if(isMobile()) {
    return [-(centerY-y)/ratio,(centerX-x)/ratio]
  }
  return [(centerX-x)/ratio, (centerY-y)/ratio]
}

const swapDeviceX = (x,y) => {
  if(isMobile()) return y
  return x
}
const swapDeviceY = (x,y) => {
  if(isMobile()) return -x
  return y
}
const dragPlayer = (playerData,centerX,centerY,ratio) => {
  let baseX, baseY,newX,newY
  function dragStarted (event) {
    // console.log(this)
    [baseX,baseY]= d3.pointer(event)
    d3.select(this).raise().attr("cursor", "grabbing")
  }

  function dragged (event){
    
    // if(isMobile()){
    //   [newX, newY] = [event.clientX, event.clientY]
    //   d3.select(this).attr("transform", `translate(${newX-baseX}, ${newY-baseY})`)
    // } 
    [newX, newY] = [event.x, event.y]
    d3.select(this).attr("transform", `translate(${newX - baseX}, ${newY - baseY})`)
  }

  function dragEnded (event) {
    [newX, newY] = translatePlayerPosition(centerX,centerY,ratio,event.x,event.y)
    const id = d3.select(this).attr("data-id") -1
    playerData[id].x=newX
    playerData[id].y=newY

    d3.select(this).attr("cursor", "default")
  }

  return d3.drag()
            .on("start",dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded)
}
export {
    playerDraw,
    loadPlayerData,
    translatePlayerPosition,
    swapDeviceX,
    swapDeviceY
}