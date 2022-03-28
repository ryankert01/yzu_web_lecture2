//embed queue
class Queue {
    constructor() {
        this.elements = {};
        this.head = 0;
        this.tail = 0;
    }
    enqueue(element) {
        this.elements[this.tail] = element;
        this.tail++;
    }
    dequeue() {
        const item = this.elements[this.head];
        delete this.elements[this.head];
        this.head++;
        return item;
    }
    peek() {
        return this.elements[this.head];
    }
    get length() {
        return this.tail - this.head;
    }
    get isEmpty() {
        return this.length === 0;
    }
}








var playList = new Queue();


var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '200',
        width: '300',
        videoId: 'gZlDn4EmTvo',
        playerVars: {
            'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}



function onPlayerStateChange(event) {
    document.querySelector('#OnPlay').innerHTML = player.getVideoData().title;
    if (event.data == YT.PlayerState.ENDED && !playList.isEmpty) {
        //player.getPlayerState()
        var videoId_now = playList.elements[0];
        player.loadVideoById(videoId_now, 15);
        playList.dequeue();
        console.log(playList.length);
        console.log(playList.elements);
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
    for (var i = 0; i < playList.length; i++) {
        console.log(playList.elements[i]);
        idToTitleOut(playList.elements[i]);
    }
}

function stopVideo() {
    player.stopVideo();
}
//https://www.googleapis.com/youtube/v3/videos?id=%3CYOUR%20VIDEO%20ID%20HERE%3E&key=AIzaSyBqJACmsSoWHgeV-M7J6uAzCf8cm2f-8us%20&part=snippet


function idToTitle(id) {
    $.getJSON('https://www.googleapis.com/youtube/v3/videos?id='+ id +'&key=AIzaSyBqJACmsSoWHgeV-M7J6uAzCf8cm2f-8us%20&part=snippet', function (data) {
        // JSON result in `data` variable
        var rett = JSON.stringify(data.items["0"].snippet.localized.title);
        console.log(rett);
        return rett;
    });
}

function idToTitleOut(id) {
    $.getJSON('https://www.googleapis.com/youtube/v3/videos?id='+ id +'&key=AIzaSyBqJACmsSoWHgeV-M7J6uAzCf8cm2f-8us%20&part=snippet', function (data) {
        // JSON result in `data` variable
        var rett = JSON.stringify(data.items["0"].snippet.localized.title);
        document.querySelector('#printNext').innerHTML += rett+ "<br>";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#add').onclick = () => {
        console.log("add!");
        console.log(document.querySelector('#addUrl').value);
        playList.enqueue(youtubeIdGenerator(document.querySelector('#addUrl').value));
        console.log(playList.elements[playList.length - 1]);
        printNext();
    }
});