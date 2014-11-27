
$(document).ready(function(){

    var responses = [];
    var game = new HotColdGame();
    var previousGuesses = [];


    function newGame() {
        game.initialize();
        game.generateRandomNumber();
        previousGuesses.length = 0;
        clearFields();
        displayFeedback("Guess a number between 1 and 100") ;
    }

    function initializeResponses() {

        responses[0] = " correct!  You guessed it!"

        responses[1] = "very hot";
        responses[2] = "hot";
        responses[3] = "warm";
        responses[4] = "cold";
        responses[5] = "ice cold";

        responses[10] = "very hot - getting hotter";
        responses[20] = "hot - getting hotter";
        responses[30] = "warm - getting warmer";
        responses[40] = "cold - getting warmer";
        responses[50] = "ice cold - getting warmer";

        responses[100] = "very hot - getting colder";
        responses[200] = "hot - getting colder";
        responses[300] = "warm - getting colder";
        responses[400] = "cold - getting colder";
        responses[500] = "ice cold - getting colder";
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
            errorString = "'" + guess + "' was already entered.  Please enter a different number.";
            inputValid = false;
        } else {


            if (!$.isNumeric(guess)) {
                errorString = "'" + guess + "' is not a number. Please enter a number.";
                inputValid = false;
            } else if (guess % 1 != 0) {
                errorString = "'" + guess + "' is not a whole number.  Please enter a whole number.";
                inputValid = false;
            } else if (guess < 1 || guess > 100) {
                errorString = "'" + guess + "' is outside the range.  Please enter a number between 1 and 100.";
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
        var guess = $("#userGuess").val();
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

    // ~~~~~~~~~~~~~~~~~~~~~~~~
    // Main
    // ~~~~~~~~~~~~~~~~~~~~~~~~
    function main() {
        initializeResponses();
        newGame();
    }

    main();
});


