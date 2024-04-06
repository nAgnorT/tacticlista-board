const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors()); 
app.use(bodyParser.json());



app.post('/update_player_data', (req, res) => {
    fs.writeFile('data.json', JSON.stringify(req.body), (err) => {
        res.send('Data updated.');
    });
});
app.post('/update_line_data', (req, res) => {
    fs.writeFile('line.data.json', JSON.stringify(req.body), (err) => {
        res.send('Data updated.');
    });
});

app.listen(3000, () => console.log('Server listening'));
