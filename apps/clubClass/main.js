$(function () {
    $("#courseTable").append(`<thead><tr><th scope="col">#</th><th scope="col">Time</th><th scope="col">Subject</th></tr></thead>`);
    var topicCount = topic.length;
    let millisecsPerDay = 24 * 60 * 60 * 1000;
    $("#courseTable").append(
        `<tbody>`
    );
    for (var x = 0; x < topicCount; x++) {
        //debugger;
        let text1 = (new Date(startDate.getTime()+7*x*millisecsPerDay)).toLocaleDateString();
        const myArray = text1.split("/");
        $("#courseTable").append(
            `<tr><th scope="row">${x+1}</th><td>${myArray[1]}/${myArray[0]}</td><td>${topic[x]}</td></tr>`
        );
    }
    $("#courseTable").append(
        `</tbody>`
    );
});
