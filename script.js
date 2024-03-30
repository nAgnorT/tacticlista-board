
import {loadHorizontalPitch, loadVerticalPitch} from './drawing/pitchDrawing.js'
import { isHorizontal, isVertical } from './checking/checkPitch.js';
import isMobile from './checking/isMobile.js';
import { loadPlayerData, playerDraw } from './drawing/playerDrawing.js';
import { drawLine, loadLineData } from './drawing/lineDrawing.js';
import { getJsonData, pushJsonData } from './controller/data.controller.js';

let svgWidth= 1,svgHeight= 1;
const svg = d3.select("#svg-container").append("svg")
// const players = svg.append('g').attr("width", 100).attr("height", 100)
let svgSize
let playerData = []
let lineData =[]
let input = 1;

d3.json('./data/data.json')
.then(jsonData => {
    // Example Modification: Add a new item
    playerData = jsonData
})
    .then(response => { /* Handle server response */ })
    .catch(error => console.error('Error sending to server:', error));
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
  d3.json('./data/data.json')
    .then(jsonData => {
        jsonData.length = 0
        jsonData.push(...playerData)
  
        fetch('/update_data', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData) 
        })
        .then(response => { console.log(response)})
        .catch(error => console.error('Error sending to server:', error));
    });
}
window.addEventListener("resize", resize);



resize()
