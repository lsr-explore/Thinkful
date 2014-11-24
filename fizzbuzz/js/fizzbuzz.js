
$(document).ready(function() {

    //~~~~~~~~~~~~~~~~~~~~~
    // Main function
    //~~~~~~~~~~~~~~~~~~~~~
    function processInput(){
        clearResults();
        clearError();
        var limit = +($("#limit").val());
        var validInput = verifyInput(limit);
        if (validInput )
        {
            runFizzBuzz(limit);
        }
    }
    //~~~~~~~~~~~~~~~~~~~~~
    // FizzBuzz Algorithm
    //~~~~~~~~~~~~~~~~~~~~~
    var runFizzBuzz = function(limit) {
        for (var i=1; i <= limit; i++) {
            var result = i;
            var foundMatch = false;
            if (i % 3 == 0) {
                result += "...Fizz";
                foundMatch = true;
            }
            if (i % 5 == 0){
                if (!foundMatch) {
                    result += "...";
                }
                result += "Buzz";
            }
            displayResults(result);
        }
    };

    //~~~~~~~~~~~~~~~~~~~~~
    // Manage results
    //~~~~~~~~~~~~~~~~~~~~~

    function clearResults(){
        $("#fizzbuzz").empty();
    }

    function displayResults(result) {
        $("#fizzbuzz").append("<p>" + result + "</p>");
    }

    //~~~~~~~~~~~~~~~~~~~~~
    // Processing input
    //~~~~~~~~~~~~~~~~~~~~~
    function verifyInput(limit)
    {
        var errorString = "";
        var inputValid = true;

        if (!$.isNumeric(limit)) {
            errorString = limit + " is not a number. Please enter a number.";
            inputValid = false;
        }	else if (limit % 1 != 0) {
            errorString = limit + " is not a whole number.  Please enter a whole number.";
            inputValid = false;
        } else if (limit < 1 || limit > 100) {
            errorString = limit + " is outside the range.  Please enter a number between 1 and 100.";
            inputValid = false;
        }

        if (!inputValid) {
            displayError(errorString);
        }
        return inputValid;
    }

    //~~~~~~~~~~~~~~~~~~~~~
    // Manage errors
    //~~~~~~~~~~~~~~~~~~~~~

    function displayError(errorString) {
        $("#errorMessage").append("<p style='color:red'><b><i>" + errorString + "</i></b></p>")   ;
    }

    function clearError()
    {
        $("#errorMessage").empty();
    }

    //~~~~~~~~~~~~~~~~~~~~~
    // Event handlers
    //~~~~~~~~~~~~~~~~~~~~~

    // Submit button handler
    $("#submit").on("click", function() {
         processInput();
    })

    // Clear Results button handler
    $("#reset").on("click", function() {
        clearResults();
    });


    // Key handlers
    $("#limit").keydown(function(event) {
        // Return key
        if (event.keyCode == 13) {
            processInput();
            return false;
        }
    });

});