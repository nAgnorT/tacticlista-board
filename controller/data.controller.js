const path = '../data/data.json'


const pushJsonData = (playerData)=>{
  d3.json(path)
  .then(jsonData => {
      // Example Modification: Add a new item
      playerData = jsonData

      // Send modified data to the server
      fetch('/update_data', {
          method: 'POST', // Or PUT to update existing file
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(playerData) 
      })
      .then(response => { /* Handle server response */ })
      .catch(error => console.error('Error sending to server:', error));
  });
}
const getJsonData = (playerData)=> {
  d3.json(path)
            .then(jsonData => {
              console.log("jsondata: ",jsonData)
              playerData = jsonData
            })
            .then(response => { /* Handle server response */ })
            .catch(error => console.error('Error sending to server:', error));
  return playerData
}
export {
    pushJsonData,
    getJsonData
}