const path = require('path');
const express = require ('express');
var fs = require('fs'); 

const app = express()

app.get('*', (req, res) => {
    var location = req.url;
    if(location == "/") {
        res.sendFile(path.join(__dirname, 'index.html'))
        return;
    }
    var entries = (location.slice(1)).split('-');
    var content = "";
    var set = new Set();
    var stats = fs.readFileSync(path.resolve(__dirname, 'stats.json'))
    stats = JSON.parse(stats);
    entries.forEach((value,index,array) => {
        stats.entrypoints[value].assets.forEach((innerValue,index,array) => {
            set.add(innerValue);
        })
    })
       
    set.forEach((value)=> {
        content += fs.readFileSync(path.resolve(__dirname, value)).toString('utf8')
    })

    res.send(content);
})




const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})