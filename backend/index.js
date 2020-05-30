const express = require('express')
const app = express()
const fs = require('fs');

var cors = require('cors')

app.use(cors());

app.get("/download", (req, res) => {
    console.log("Downloading File...")
    var stats = fs.statSync("TestBuild.zip")
    var fileSizeInBytes = stats["size"]
    var fileSizeInMegabytes = fileSizeInBytes / 1000000.0
    console.log('Size (mb): ' + fileSizeInMegabytes)

    res.set('Content-Type', 'application/zip')
    res.set('Content-Disposition', 'attachment; filename=file.zip');
    res.set('Content-Length', fileSizeInBytes);
    //const zip = fs.createReadStream('./TestBuild.zip');

    res.sendFile(__dirname + '/TestBuild.zip')
})

app.listen(3001, () => {
    console.log("App listening on Port: " + 3001)
})
