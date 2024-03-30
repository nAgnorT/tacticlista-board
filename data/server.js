const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

app.post('/update_data', (req, res) => {
    fs.writeFile('./data.json', JSON.stringify(req.body), (err) => {
        console.log(err)
        res.send('Data updated.');
    });
});

app.listen(3000, () => console.log('Server listening'));
