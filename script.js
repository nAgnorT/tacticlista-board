
import {loadHorizontalPitch, loadVerticalPitch} from './drawing/pitchDrawing.js'
import { isHorizontal, isVertical } from './checking/checkPitch.js';
import isMobile from './checking/isMobile.js';
import { loadPlayerData, playerDraw } from './drawing/playerDrawing.js';
import { drawLine, loadLineData } from './drawing/lineDrawing.js';
import interactDrag from './drawing/interactDrag.js';


let svgWidth= 1,svgHeight= 1;
const svg = d3.select("#svg-container").append("svg")
// const players = svg.append('g').attr("width", 100).attr("height", 100)
let svgSize
let playerData = []
let lineData =[]


getLineData()
getPlayerData()

const resize = () =>{

  setTimeout(()=>{
    if(isMobile()){
      svgSize = isVertical(svgWidth, svgHeight)
    }
    else{
      svgSize = isHorizontal(svgWidth, svgHeight)
    }
    svgWidth = svgSize.svgWidth
    svgHeight = svgSize.svgHeight
    let ratio = 1
    const centerX = svgWidth/2
    const centerY = svgHeight / 2
    svg.selectAll("*").remove()
    svg
        .attr("width", svgWidth)
        .attr("height", svgHeight)
    if (svgHeight>svgWidth) {
      const pitchHeight = svgHeight*0.95
      ratio = pitchHeight/100
      loadVerticalPitch(svg,pitchHeight,centerX,centerY)
    }
    else {
      const pitchWidth = svgWidth * 0.95
      ratio = pitchWidth/100
      loadHorizontalPitch(svg,pitchWidth,centerX,centerY)
    }
    svg.call(loadPlayerData,playerData, ratio, centerX,centerY)
    svg.call(playerDraw, playerData, ratio,centerX,centerY)
    svg.call(drawLine,ratio, lineData,centerX,centerY)
    svg.call(loadLineData, ratio, lineData,centerX,centerY)


  },500)

}
window.addEventListener("resize", resize);
interactDrag('line')
interactDrag('player')
const saveButton = document.getElementById("save")

saveButton.addEventListener("click", savePlayerData)
saveButton.addEventListener("click", saveLineData)

function savePlayerData() {
  return d3.json('./data/data.json')
  .then(jsonData => {
      jsonData.length = 0
      jsonData.push(...playerData)
  
      fetch('http://127.0.0.1:3000/update_player_data', {
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jsonData) 
      })
      .then(response => { })
      .catch(error => console.error('Error sending to server:', error));
  });
}
function saveLineData() {
  console.log('line saved', lineData)
  return d3.json('./data/line.data.json')
  .then(jsonData => {
      jsonData.length = 0
      jsonData.push(...lineData)
  
      fetch('http://127.0.0.1:3000/update_line_data', {
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jsonData) 
      })
      .then(response => { })
      .catch(error => console.error('Error sending to server:', error));
  });
}
function getPlayerData() {
  return d3.json('./data/data.json')
.then(jsonData => {
    // Example Modification: Add a new item
    playerData = jsonData
})
    .then(response => { /* Handle server response */ })
    .catch(error => console.error('Error sending to server:', error));
}
function getLineData() {
  d3.json('./data/line.data.json')
.then(jsonData => {
    // Example Modification: Add a new item
    lineData = jsonData
})
    .then(response => { /* Handle server response */ })
    .catch(error => console.error('Error sending to server:', error));
}
resize()
