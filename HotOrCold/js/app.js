

/* global res, HotColdGame, console : true */

$(document).ready(function(){
    "use strict";
    var responses = [];
    var game = new HotColdGame();
    var previousGuesses = [];
    var guessCount = 0;


    function newGame() {
        var target = game.newGame();
        console.log(target);
        previousGuesses.length = 0;
        clearFields();
        guessCount = 0;
        displayFeedback(res.Prompt) ;
    }

    function initializeResponses() {

        responses[game.responses.FeedbackDone] = res.FeedbackDone;

        responses[game.responses.FeedbackVeryHot] = res.FeedbackVeryHot;
        responses[game.responses.FeedbackHot] = res.FeedbackHot;
        responses[game.responses.FeedbackWarm] = res.FeedbackWarm;
        responses[game.responses.FeedbackCold] = res.FeedbackCold;
        responses[game.responses.FeedbackIceCold] = res.FeedbackIceCold;

        responses[game.responses.FeedbackVeryHotHotter] = res.FeedbackVeryHotHotter;
        responses[game.responses.FeedbackHotHotter] = res.FeedbackHotHotter;
        responses[game.responses.FeedbackWarmWarmer] = res.FeedbackWarmWarmer;
        responses[game.responses.FeedbackColdWarmer] = res.FeedbackColdWarmer;
        responses[game.responses.FeedbackIceColdWarmer] = res.FeedbackIceColdWarmer;

        responses[game.responses.FeedbackVeryHotColder] = res.FeedbackVeryHotColder;
        responses[game.responses.FeedbackHotColder] = res.FeedbackHotColder;
        responses[game.responses.FeedbackWarmColder] = res.FeedbackWarmColder;
        responses[game.responses.FeedbackColdColder] = res.FeedbackColdColder;
        responses[game.responses.FeedbackIceColdColder] = res.FeedbackIceColdColder;
    }

    function processInput(){
        var guess = getUserGuess();

        var validInput = verifyInput(guess);
        if (validInput )
        {
            guessCount ++;
            previousGuesses[guess] = 1;

            var closeness = game.checkGuess(guess);
            var message = responses[closeness];
            message = guess + " is " + message;

            updateDisplay(guess, guessCount, message);
        }
    }


    //~~~~~~~~~~~~~~~~~~~~~
    // Verify Input
    //~~~~~~~~~~~~~~~~~~~~~
    function verifyInput(guess) {
        var errorString = "";
        var inputValid = true;

        if (previousGuesses[guess] === 1) {
            errorString = "'" + guess + "'" + res.ErrorDuplicate;
            inputValid = false;
        } else {


            if (!$.isNumeric(guess)) {
                errorString = "'" + guess + "'" + res.ErrorNotAWholeNumber;
                inputValid = false;
            } else if (guess % 1 !== 0) {
                errorString = "'" + guess + "'" + res.ErrorNotNumber;
                inputValid = false;
            } else if (guess < 1 || guess > 100) {
                errorString = "'" + guess + "'" + res.ErrorOutsideRange;
                inputValid = false;
            }
        }

        if (!inputValid) {
            displayFeedback(errorString);
        }
        return inputValid;
    }

    //~~~~~~~~~~~~~~~~~~~~~
    // Get UI Input
    //~~~~~~~~~~~~~~~~~~~~~

    function getUserGuess() {
        var guess;
        guess = $("#userGuess").val();
        return guess;
    }

    //~~~~~~~~~~~~~~~~~~~~~
    // UI Updates
    //~~~~~~~~~~~~~~~~~~~~~

    function clearFields()
    {
        clearUserGuess();
        clearCount();
        clearGuessList();
        clearFeedback();
    }

    function updateDisplay(guessVal, guessCountVal, message) {
        displayFeedback(message);
        updateGuessList(guessVal)   ;
        displayCount(guessCountVal);
        clearUserGuess();
        setFocusUserGuess();

    }

    function clearFeedback() {
        $('#feedback').text('');
    }

    function displayFeedback(message) {
        $('#feedback').text(message);
    }

    function clearGuessList() {
        $("#guessList").text('');
    }

    function updateGuessList(guess) {
        $("ul#guessList").append("<li>" + guess + "</li>");
    }

    function clearCount()
    {
        $("#count").text('0');
    }

    function displayCount(guessCountVal){
        $('#count').text(guessCountVal);
    }

    function clearUserGuess() {
        $("#userGuess").val('');
    }

    // Move focus to UserGuess
    function setFocusUserGuess() {
        document.getElementById("userGuess").focus();
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~
    // Event Handlers
    // ~~~~~~~~~~~~~~~~~~~~~~~~
    $(".new").click(function(){
        newGame();
    });


    $("#guessButton").on("click", function() {
        event.preventDefault();
        processInput();
    });

    // Key handlers
    $("#userGuess").keydown(function(event) {
        // Return key
        if (event.keyCode === 13) {
            processInput();
            return false;
        }
    });

    /*--- Display information modal box ---*/
    $(".what").click(function(){
        $(".overlay").fadeIn(1000);

    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function(){
        $(".overlay").fadeOut(1000);
    });

    // ~~~~~~~~~~~~~~~~~~~~~~~~
    // Main
    // ~~~~~~~~~~~~~~~~~~~~~~~~
    function main() {
        initializeResponses();
        newGame();
    }

    main();
});


