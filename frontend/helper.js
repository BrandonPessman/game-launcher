const exec = require('child_process').execFile;
const axios = require('axios')
const fs = require('fs')
const DecompressZip = require('decompress-zip');
const remote = require('electron').remote;
const path = require('path');

exports.playgame = () => {
    console.log("Initiating the Game...");
    exec('./bin/TestBuild/Nightfall.exe', function(err, data) {  
        console.log(err)
        console.log(data.toString());                       
    });  
     
}

exports.downloadgame = () => {
    var fs = require('fs');
    var dir = './bin/temp';

    if (!fs.existsSync(dir)){
        fs.mkdir('./bin/temp', {recursive: true}, err => {})
    }

    document.getElementById('extractedFile').innerHTML = 'Status: Downloading files...'
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://165.227.115.42:3001/download", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById('extractedFile').innerHTML = 'Status: Recieved Compressed Files...'
            var blob = new Blob([xhr.response], {type: "octet/stream"});
            
            var fileReader = new FileReader();
            fileReader.onload = function () {
                document.getElementById('extractedFile').innerHTML = 'Status: Unzipping files...'
                fs.writeFile('./bin/temp/build.zip', Buffer.from(new Uint8Array(this.result)), function(err) {
                    var unzipper = new DecompressZip('./bin/temp/build.zip')
 
                    unzipper.on('error', function (err) {
                        console.log(err);
                    });
                    
                    unzipper.on('extract', function (log) {
                        document.getElementById('extractedFile').innerHTML = 'Status: Download Complete'
                    });
                    
                    unzipper.on('progress', function (fileIndex, fileCount) {
                        document.getElementById('extractedFile').innerHTML = 'Status: Extracted file ' + (fileIndex + 1) + ' of ' + fileCount;
                    });
                    
                    unzipper.extract({
                        path: './bin/',
                        filter: function (file) {
                            return file.type !== "SymbolicLink";
                        },
                        restrict: false
                    });
                });
            };
            fileReader.readAsArrayBuffer(blob);
        }
    }
    xhr.responseType = "arraybuffer";
    xhr.send();
}

exports.closelauncher = () => {
    var window = remote.getCurrentWindow();
    window.close();
}

exports.minimizelauncher = () => {
    var window = remote.getCurrentWindow();
    window.minimize(); 
}