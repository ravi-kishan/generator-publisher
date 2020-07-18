const path = require('path');
const express = require ('express');
var fs = require('fs'); 
const url = require('url'); 
var packageJson = require('../package.json');

const app = express()

app.get('*', (req, res) => {
    var location = req.url;
    if(location == "/favicon.ico")return;
    if(location == "/") {
        res.sendFile(path.join(__dirname, 'index.html'))
        return;
    }

    var version = req.query.v;
    var hash = req.query.hash;
    var route = url.parse(req.url).pathname;

    var entries = (route.slice(1)).split('-');
    var content = "";
    var set = new Set();
    var cached = new Set();
    var stats = fs.readFileSync(path.resolve(__dirname, 'stats.json'))
    stats = JSON.parse(stats);
    entries.forEach((value,index,array) => {
        if(hash[index] == '0' || version != packageJson.version) {
            stats.entrypoints[value].assets.forEach((innerValue,index,array) => {
                set.add(innerValue);
            })
        }
    })

    Object.keys(stats.entrypoints).forEach((value,index,array) => {
        if(hash[index] == '1' && version == packageJson.version) {
            stats.entrypoints[value].assets.forEach((innerValue,index,array) => {
                cached.add(innerValue);
            })
        }
    })
       
    set.forEach((value)=> {
        if(cached.has(value) == false) {
            content += fs.readFileSync(path.resolve(__dirname, value)).toString('utf8')
        }
    })

    res.send(content);
})




const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})