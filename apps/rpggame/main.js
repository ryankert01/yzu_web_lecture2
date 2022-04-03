let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;




const gridLength = 50;

$(function () {
    mapArray = [ //0-可走,1-障礙,2-終點,3-敵人
        [0, 3, 1, 0, 3, 0, 0, 0, 0, 3, 1, 1, 1, 3, 1, 3],
        [0, 1, 3, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 3, 3, 3],
        [0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 3],
        [1, 0, 3, 0, 0, 1, 1, 3, 1, 0, 0, 1, 0, 3, 0, 0],
        [0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 0, 3, 3, 1, 1, 0],
        [1, 3, 0, 1, 0, 0, 1, 0, 3, 3, 0, 0, 0, 3, 0, 0],
        [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 3, 3, 0],
        [0, 0, 0, 1, 1, 1, 1, 0, 3, 0, 1, 0, 3, 3, 3, 1],
        [1, 1, 1, 0, 1, 0, 3, 0, 3, 1, 0, 0, 0, 3, 1, 3],
        [1, 3, 0, 1, 0, 3, 3, 1, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 3, 0, 0, 1, 1, 0, 0, 0, 3, 0, 0, 3, 3, 0, 1],
        [1, 3, 3, 1, 1, 0, 0, 1, 1, 0, 3, 3, 0, 1, 3, 0],
        [1, 3, 0, 0, 0, 0, 1, 3, 3, 1, 1, 3, 3, 3, 1, 3],
        [1, 3, 1, 1, 0, 3, 3, 0, 0, 3, 0, 0, 0, 3, 3, 0],
        [0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1],
        [0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 2]
    ];
    ctx = $("#myCanvas")[0].getContext("2d");
    imgMain = new Image();
    imgMain.src = "images/spriteSheet.png";
    currentImgMain = {
        "x": 0,
        "y": 0
    };
    imgMain.onload = function () {
        ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
    }

    imgMountain = new Image();
    imgMountain.src = "images/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "images/Enemy.png";

    imgMountain.onload = function () {
        imgEnemy.onload = function () {
            for (var x in mapArray) {
                for (var y in mapArray[x]) {
                    if (mapArray[x][y] == 1) {
                        ctx.drawImage(imgMountain, 32, 65, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                    } else if (mapArray[x][y] == 3) {
                        ctx.drawImage(imgEnemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);
                    } else if (mapArray[x][y] == 2) {
                        ctx.drawImage(imgMountain, 32, 0, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                    }
                }
            }
        }
    };

});

//modals
// var myModal1 = new bootstrap.Modal(document.getElementById('staticBackdrop1'), {
//     keyboard: false
//   })
// var myModal2 = new bootstrap.Modal(document.getElementById('staticBackdrop2'), {
//     keyboard: false
//   })
var myModal3 = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
    keyboard: false
})

$(document).on("keydown", function (event) {
    //debugger;
    let targetImg, targetBlock, cutImagePositionX;
    targetImg = {
        "x": -1,
        "y": -1
    };
    targetBlock = {
        "x": -1,
        "y": -1
    };

    event.preventDefault();

    switch (event.code) {
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 175;
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            cutImagePositionX = 355;
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540;
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 0;
            break;
        default:
            return;
    }

    if (targetImg.x <= 750 && targetImg.x >= 0 && targetImg.y <= 750 && targetImg.y >= 0) {
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    } else {
        targetBlock.x = -1;
        targetBlock.y = -1;
    }

    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);

    if (targetBlock.x != -1 && targetBlock.y != -1) {
        switch (mapArray[targetBlock.x][targetBlock.y]) {
            case 0:
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1:
                break;
            case 2:
                $("#staticBackdropLabel").text("Congratulations!");
                document.querySelector('.modal-body').innerHTML = `<p>You just finish this game safely. You're so genious!</p>
                <p>Now, just enjoy this interseting song!</p><br><iframe width="700" height="470"
                src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1">
                </iframe>`;
                myModal3.show();
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 3:
                $("#staticBackdropLabel").text("You have been killed!");
                document.querySelector('.modal-body').innerHTML = "Poor you. You just encountered the great warrior and have been slaughtered. Good luck for your next try~";
                myModal3.show();
                break;
        }
    } else {
        $("#talkBox").text("邊界");
    }

    ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
});

// //testing
// myModal3.show();