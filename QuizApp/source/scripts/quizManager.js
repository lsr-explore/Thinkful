/** @module quiz manager */


var currentQuestionIndex = 0;
var quizEngine;
var numQuestions = 0;
var currentQuestionData;
var answers;
var numRight = 0;
var numAnswered = 0;

function initializeQuiz(id) {
    "use strict";

    var quizData;

    switch (id) {
        case "bridges":
            quizData = bridgeQuiz;
            break;
        case "herbs":
            quizData = herbQuiz;
            break;
    }
    var quiz = new QuizEngine(quizData);
    var title = quiz.getTitle();
    console.log(title);

    return quiz;
}

function showNextQuestion(event) {
    "use strict";
    if (currentQuestionIndex <= (numQuestions - 1)) {
        currentQuestionIndex ++;
        showQuestionByIndex(currentQuestionIndex);
    }
}

function showPrevQuestion(event) {
    "use strict";
    if (currentQuestionIndex > 0 ) {
        currentQuestionIndex--;
        showQuestionByIndex(currentQuestionIndex);
    }
}

function isStringEmptyOrNull(stringToCheck) {
    "use strict";
    var isEmptyOrNull = true;

    if (stringToCheck !== undefined) {
        if (stringToCheck.trim().length > 0) {
            isEmptyOrNull = false;
        }
    }

    return isEmptyOrNull;
}

function showQuestion(currentQuestion) {
    "use strict";

    var questionTemplateSource;
    var data;
    if (isStringEmptyOrNull(currentQuestion.image)) {
        // Get the quiz div
        questionTemplateSource = $("#questionTemplate").html();

        // update the template
        data = {
            "question": currentQuestion.question
        };

    } else {

        // Get the quiz div
        questionTemplateSource = $("#questionImageTemplate").html();

        // update the template
        data = {
            "image": currentQuestion.image,
            "question": currentQuestion.question
        };
    }
    runDust(questionTemplateSource, "question", renderQuestion, data);
}

function showChoices(currentQuestion){
    "use strict";

    var choiceTemplateSource;

    if (currentQuestion.choicesHaveImages)  {
        choiceTemplateSource = $("#choiceImageTemplate").html();
    }   else {
        choiceTemplateSource = $("#choiceTemplate").html();
    }
    runDust(choiceTemplateSource, "quizChoice", renderChoice, currentQuestion);
}

function showQuestionByIndex(index){
    "use strict";
    currentQuestionData = quizEngine.getQuestion(index);
    clearQuestion();
    showQuestion(currentQuestionData);
    showChoices(currentQuestionData);

    // Event handler for start quiz button
    $(".quizChoiceControl").click(function (event) {
        event.preventDefault();
        choiceSelected(event);
    });

}

// renderer for the compiled dust template
function renderQuestion(out) {
    "use strict";
    $("#questionArea").html(out);
}


// renderer for the compiled dust template
function renderChoice(out) {
    "use strict";
    $("#choiceArea").html(out);
}


function clearQuestion() {
    "use strict";
    $("#questionArea").empty();
    $("#choiceArea").empty();
}


function choiceSelected(event) {
    "use strict";

    event.preventDefault();
    //event.currentTarget.id

    var isCorrect;

    if (event.currentTarget.id === currentQuestionData.answer) {
        isCorrect = true;

        numRight++;
    } else {

        isCorrect = false;
    }
    updateProgressCircle(currentQuestionData.answer, isCorrect) ;
    showResult(isCorrect, event.currentTarget.id);

    answers[currentQuestionIndex] = event.currentTarget.id;

    currentQuestionIndex ++;

    if (currentQuestionIndex === numQuestions)  {
        alert("Quiz complete - you answered " + numRight + " questions out of " + numQuestions + " correctly");
    }   else {
        showQuestionByIndex(currentQuestionIndex) ;
    }
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

function showResult(isCorrect, answer) {

    var titleText;

    if (isCorrect) {
        titleText = "Correct" ;
    } else {
        titleText = "Incorrect";
    }

    var innerHTML = "<p>" + answer + " is "  + titleText + "</p>";

    var waitTime = 3000;

    var statDialog = createDialog(waitTime, titleText);
    statDialog.dialog("open");
    statDialog.html(innerHTML);
}

function createDialog(waitTime, titleText) {
    var statDialog =  $('#results').dialog({
        resizable: false,
        autoOpen: false,
        show: "blind",
        hide: "blind",
        modal: true,
        title: titleText,
        dialogClass: 'results',
        open: function (event, ui) {
           setTimeout(function () {
                $('#results').dialog('close');
            }, waitTime);
       }
    });
    return statDialog;
}

function updateProgressCircle(questionID, isCorrect) {

    var className = "incorrect";
    if (isCorrect) {
        className = "correct";
    }

    selectorText = "#" + questionID + "progress";

    $(selectorText).toggleClass(className);

}

function addProgressCircles(numQuestions) {

    for (var i = 0; i < numQuestions; i++) {
        var questionID = quizEngine.getQuestion(i).answer;
        $("#progress_circles").append("<li id = \"" + questionID + "progress\">&nbsp;</li>");
    }
}


//************************************
// Main routine called at runtime
//************************************
function main() {

    "use strict";

    // Retrieve the quiz id selected in the previous page
    var id = amplify.store(CONFIG.get("ID_STORE"));

    if (id === undefined) {
        alert("Unable to retrieve a quiz selection, defaulting to Bridge Quiz");
        id = "bridges";
    }

    // initialize the quiz for the selected quiz
    quizEngine = initializeQuiz(id);

    numQuestions = quizEngine.numQuestions();

    answers = new Array(numQuestions);

    addProgressCircles(numQuestions);

    // Event handler for start quiz button
    $("#prev").click(function (event) {
        event.preventDefault();
        showPrevQuestion(event);
    });

    // Event handler for start quiz button
    $("#next").click(function (event) {
        event.preventDefault();
        showNextQuestion(event);
    });

    showQuestionByIndex(0);
}


$(document).ready(function () {
    "use strict";
    // Main function
    main();

});
