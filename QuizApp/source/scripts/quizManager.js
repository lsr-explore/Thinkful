/** @module quiz manager */


var currentQuestionIndex = 0;
var lastQuestionID;
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
    if (currentQuestionIndex <= (numQuestions - 2)) {
        lastQuestionID = currentQuestionData.answer;
        currentQuestionIndex ++;
        showQuestionByIndex(currentQuestionIndex);
    }
}

function showPrevQuestion(event) {
    "use strict";
    if (currentQuestionIndex > 0 ) {
        lastQuestionID = currentQuestionData.answer;
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

    // Event handler for start quiz button
    $(".imageChoiceControl").click(function (event) {
        event.preventDefault();
        choiceSelected(event);
    });

    showSelectedProgressCircle(lastQuestionID, currentQuestionData.answer);

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


    var selectedChoiceText = "";

    for (var i = 0 ; i < currentQuestionData.choices.length; i++) {

        var choice = currentQuestionData.choices[i];
        if (event.currentTarget.id === choice.id) {
            selectedChoiceText = choice.description;
        }
    }

    answers[currentQuestionIndex] = event.currentTarget.id;

    updateProgressCircle(currentQuestionData.answer, isCorrect, selectedChoiceText) ;

    lastQuestionID = currentQuestionData.answer;
    currentQuestionIndex ++;

    showResult(isCorrect, selectedChoiceText);

}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

function quizComplete(numRight, numQuestions) {
    var innerHTML = "You answered " + numRight + " questions out of " + numQuestions + " correctly";
    var waitTime = 3000;
    var statDialog = createDialog(waitTime, "Quiz complete");
    statDialog.dialog("open");
    statDialog.html(innerHTML);

}

function onDialogClose(event, ui) {

    if (currentQuestionIndex === numQuestions)  {
        quizComplete(numRight, numQuestions);
    }   else {
        showQuestionByIndex(currentQuestionIndex) ;
    }
}

function showResult(isCorrect, answer) {

    var titleText;
    var waitTime = 3000;

    if (isCorrect) {
        titleText = "Correct" ;
    } else {
        titleText = "Incorrect";
    }

    var innerHTML = "You answered... <br><br> " + answer;

    var statDialog = createDialogWithCloseEvent(waitTime, titleText);
    statDialog.dialog("open");
    statDialog.html(innerHTML);
}

function createDialogWithCloseEvent(waitTime, titleText) {
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
       },
       close: function( event, ui ) {
           onDialogClose(event, ui);
       }

    });


    return statDialog;
}

function createDialog(waitTime, titleText) {
    var statDialog =  $('#quizComplete').dialog({
        resizable: false,
        autoOpen: false,
        show: "blind",
        hide: "blind",
        modal: true,
        title: titleText,
        dialogClass: 'quizComplete',
        open: function (event, ui) {
            setTimeout(function () {
                $('#quizComplete').dialog('close');
            }, waitTime);
        }
    });


    return statDialog;
}

function showSelectedProgressCircle(previousQuestionId, questionID) {

    if (previousQuestionId != undefined) {

        previousCircle = "#" + previousQuestionId + "progress";
        $(selectorText).toggleClass("selected");
    }

    selectorText = "#" + questionID + "progress";
    $(selectorText).toggleClass("selected");
}

function updateProgressCircle(questionID, isCorrect, selectedChoiceText) {

    var className = "incorrect";
    if (isCorrect) {
        className = "correct";
    }

    selectorText = "#" + questionID + "progress";

    $(selectorText).toggleClass(className);
    $(selectorText).attr("title", "You selected: " + selectedChoiceText);

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

    $("#quizCaption").text(quizEngine.getTitle());

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

    lastQuestionID = undefined;
    currentQuestionIndex = 0;

    showQuestionByIndex(0);
}


$(document).ready(function () {
    "use strict";
    // Main function
    main();

});
