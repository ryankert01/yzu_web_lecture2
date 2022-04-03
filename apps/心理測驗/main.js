$(function(){
    var currentquiz=null;
    $("#startbutton").on("click",function(){
        //debugger;
        if(currentquiz==null){
            currentquiz=0;
            $("#question").text(questions[0].question);
            $("#option").empty();
            questions[0].answers.forEach(
                function(element,index,array){
                    $("#option").append(
                        `<div class="form-check">
                        <input class="form-check-input" name='options' type='radio' value='${index}' id="exampleRadios2">
                        <label class="form-check-label" for="exampleRadios2">
                            ${element[0]}
                        </label>
                      </div>`
                    );
                });
            $("#startbutton").attr("value","Next");  
        }else{
            $.each($(":radio"),function(i,val){
                if(val.checked){
                    if(isNaN(questions[currentquiz].answers[i][1])){
                        var finalResult = questions[currentquiz].answers[i][1];
                        $("#question").text(finalAnswers[finalResult][0]);
                        $("#option").empty();
                        $("#option").append(`${finalAnswers[finalResult][1]}<br><br>`);
                        currentquiz=null;
                        $("#startbutton").attr("value","重新輸入");
                    }else{
                        currentquiz=questions[currentquiz].answers[i][1]-1;
                        $("#question").text(questions[currentquiz].question);
                        $("#option").empty();
                        questions[currentquiz].answers.forEach(
                            function(element,index,array){
                                $("#option").append(
                                    `<div class="form-check">
                        <input class="form-check-input" name='options' type='radio' value='${index}' id="exampleRadios2">
                        <label class="form-check-label" for="exampleRadios2">
                            ${element[0]}
                        </label>
                      </div>`
                                );
                            });
                    }
                    return false;
                }
            });
        }
    });
});