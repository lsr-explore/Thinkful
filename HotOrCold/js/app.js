
$(document).ready(function(){


    var responses = [];
    var game = new HotColdGame();

    initializeResponses();
    newGame();

    function newGame() {
        game.initialize();
        game.generateRandomNumber();

        clearFields();

    }

    function initializeResponses() {

        responses[0] = "You guessed it!"

        responses[1] = "very hot";
        responses[2] = "hot";
        responses[3] = "warm";
        responses[4] = "cold";
        responses[5] = "ice cold";

        responses[10] = "very hot - closer";
        responses[20] = "hot - closer";
        responses[30] = "warm - closer";
        responses[40] = "cold - closer";
        responses[50] = "ice cold - closer";

        responses[100] = "very hot - farther";
        responses[200] = "hot - farther";
        responses[300] = "warm - farther";
        responses[400] = "cold - farther";
        responses[500] = "ice cold - farther";
    }

    function processInput(){
        var guess = getUserGuess();

        var validInput = verifyInput(guess);
        if (validInput )
        {
            guessCount ++;
            var message = processGuess(guess)  ;
            updateDisplay(guess, guessCount, message);

        }
    }

    function processGuess(guess) {

        var closeness = game.checkGuess(guess, correctAnswer);

        var message = responses[closeness];
        message = message + " guess: " + guess + ", match: " + correctAnswer;
        return message;

    }

    //~~~~~~~~~~~~~~~~~~~~~
    // Verify Input
    //~~~~~~~~~~~~~~~~~~~~~
    function verifyInput(guess)
    {
        var errorString = "";
        var inputValid = true;

        if (!$.isNumeric(guess)) {
            errorString = guess + " is not a number. Please enter a number.";
            inputValid = false;
        }	else if (guess % 1 != 0) {
            errorString = guess + " is not a whole number.  Please enter a whole number.";
            inputValid = false;
        } else if (guess < 1 || guess > 100) {
            errorString = guess + " is outside the range.  Please enter a number between 1 and 100.";
            inputValid = false;
        }

        if (!inputValid) {
            displayError(errorString);
        }
        return inputValid;
    }

    function getUserGuess() {
        var guess = $("#userGuess").val();
        return guess;
    }

    //~~~~~~~~~~~~~~~~~~~~~
    // UI Updates
    //~~~~~~~~~~~~~~~~~~~~~


    function clearFields()
    {
        $("#userGuess").val('Enter your guess');
        $("#count").text('0');
        $("#guessList").text('');
        $('#feedback').text('');
    }

    function addGuessToList(guess) {
        $("ul#guessList").append("<li>" + guess + "</li>");
    }

    function updateDisplay(guessVal, guessCountVal, message) {
        $('#feedback').text(message);
        addGuessToList(guessVal)   ;
        $('#count').text(guessCountVal);
        setFocusUserGuess();

    }

    // Move focus to UserGuess
    function setFocusUserGuess() {
        document.getElementById("userGuess").focus();
    }


        //~~~~~~~~~~~~~~~~~~~~~
    // Manage errors
    //~~~~~~~~~~~~~~~~~~~~~

    function displayError(errorString) {
        $("#guessList").append("<p style='color:red'><b><i>" + errorString + "</i></b></p>")   ;
    }

    function clearError()
    {
        $("#guessList").empty();
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
        if (event.keyCode == 13) {
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
});


