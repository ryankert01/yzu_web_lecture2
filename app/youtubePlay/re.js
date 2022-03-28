var playList = new Array();
var playListSize = 0;


var player = null;
var currentPlay = 0;

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onPlayerReady(event) {
    event.target.playVideo();
}

function playV() {
    
    if (player == null) {
        player = new YT.Player("player", {
            videoId: "75LR-wnXfoA",
            playerVars: {
                autoplay: 1, //是否自動撥放
                controls: 0, //是否顯示控制項
                iv_load_policy: 3
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
        currentPlay++;
        document.getElementById("playBtn").setAttribute("value", "換下一首");
    } else {
        player.loadVideoById({
            videoId: playList[currentPlay],
            suggestedQuality: "hd720",
        });
        currentPlay++;
    }
    printNext();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED && !playList.isEmpty) {
        playV();
    }
    printNext();
}

function youtubeIdGenerator(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}



function printNext() {
    document.querySelector('#printNext').innerHTML = "";
    for (var i = currentPlay; i < playList.length; i++) {
        console.log(playList[i]);
        idToTitleOut(playList[i]);
    }
}

//https://www.googleapis.com/youtube/v3/videos?id=%3CYOUR%20VIDEO%20ID%20HERE%3E&key=AIzaSyBqJACmsSoWHgeV-M7J6uAzCf8cm2f-8us%20&part=snippet


function idToTitle(id) {
    console.log("idtotitle........")
    $.getJSON('https://www.googleapis.com/youtube/v3/videos?id=' + id + '&key=AIzaSyD3wPsqaETcZLKc7XNQo2azqDmaoreVH38&part=snippet', function (data) {
        // JSON result in `data` variable
        var rett = JSON.stringify(data.items["0"].snippet.localized.title);
        console.log(rett);
        return rett;
    });
}

function idToTitleOut(id) {
    $.getJSON('https://www.googleapis.com/youtube/v3/videos?id=' + id + '&key=AIzaSyD3wPsqaETcZLKc7XNQo2azqDmaoreVH38&part=snippet', function (data) {
        // JSON result in `data` variable
        var rett = JSON.stringify(data.items["0"].snippet.localized.title);
        document.querySelector('#printNext').innerHTML += rett + "<br>";
    });
}

function idToHeadOut(id){
    $.getJSON('https://www.googleapis.com/youtube/v3/videos?id=' + id + '&key=AIzaSyBqJACmsSoWHgeV-M7J6uAzCf8cm2f-8us%20&part=snippet', function (data) {
        // JSON result in `data` variable
        var rett = JSON.stringify(data.items["0"].snippet.localized.title);
        document.querySelector('#OnPlay').innerHTML == rett ;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#add').onclick = () => {
        playList[playListSize++] = youtubeIdGenerator(document.querySelector('#addUrl').value);
        console.log(playList[playListSize-1]);
        printNext();
        if(playList.length != 0 && currentPlay == 0){
            playV();
        }
    }
});