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
    xhr.open("GET", "http://localhost:3000/download", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById('extractedFile').innerHTML = 'Status: Recieved Compressed Files...'
            // alert("Failed to download:" + xhr.status + "---" + xhr.statusText);
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
                        // var moveFile = (file, dir2)=>{
                        //     var f = path.basename(file);
                        //     var dest = path.resolve(dir2, f);
                        
                        //     fs.rename(file, dest, (err)=>{
                        //     if(err) throw err;
                        //     else document.getElementById('extractedFile').innerHTML = 'Status: Download Complete!'
                        //     });
                        // };
                        
                        // //move file1.htm from 'test/' to 'test/dir_1/'
                        // moveFile('./bin/temp/TestBuild', './bin/');
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
            
            // var fileName = "Test.zip";
 
            // var a = document.createElement("a");
            // document.body.appendChild(a);
            // a.style = "display: none";

            //         url = window.URL.createObjectURL(blob);
            //     a.href = url;
            //     a.download = fileName;
            //     a.click();
            //     window.URL.revokeObjectURL(url);
            
        }
    }
    xhr.responseType = "arraybuffer";
    xhr.send();
    
    // var buf = Buffer.from(response.data);   
    // fs.writeFile('./Test.zip', buf, () => {
    //     var stats = fs.statSync('./Test.zip')
    //     var fileSizeInBytes = stats["size"]
    //     var fileSizeInMegabytes = fileSizeInBytes / 1000000.0
    //     console.log('Size (mb): ' + fileSizeInMegabytes)
            
    // }) 


        // fs.writeFile('./Test.zip',response.data,() => {
            
        //      console.log("Wrote to file!")
        // })
    //})
    //window.open('http://localhost:3000/download');
}

exports.closelauncher = () => {
    var window = remote.getCurrentWindow();
    window.close();
}

exports.minimizelauncher = () => {
    var window = remote.getCurrentWindow();
    window.minimize(); 
}