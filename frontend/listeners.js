const Helper = require('./helper')

document.getElementById('playButton').onclick = function() {
    Helper.playgame()
}

document.getElementById('downloadgame').onclick = function() {
    Helper.downloadgame()
}

document.getElementById("closelauncher").onclick = function() {
    Helper.closelauncher()
}