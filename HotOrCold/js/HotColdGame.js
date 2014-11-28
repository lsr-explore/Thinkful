/**
 * Created by laurie on 11/26/2014.
 */

/* global generateRandomNumber : true */

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // This is the Hot Cold game engine
    // Usage:
    //     var game = new HotColdGame(); - Initialize the game
    //                Future versions may want to keep track of how many times a person has played in one
    //                 session and what was the shortest number of guesses it took to guess the value.
    //     var target = game.newGame(); - Reset local counters
    //                  newGame generates a number between 1 and 100 using the random generator utility.
    //                    This can be overridden by passing in a target value.  Use the override, if you
    //                    want to use this in a multiplayer model where one person specifies the target and
    //                    the other person guesses.
    //
    //
    //     for each guess
    //          var returnVal = game.checkGuess(guess); - Check the guess
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function HotColdGame () {
    "use strict";

    var correctAnswer = 0;
    var guesses = [];
    var lastGuess = 0;
    var lastDiff = 0;
    var lastCloseness = 0;

    this.responses = {

        FeedbackDone : 0,

        FeedbackVeryHot : 1,
        FeedbackHot : 2,
        FeedbackWarm: 3,
        FeedbackCold : 4,
        FeedbackIceCold : 5,

        FeedbackVeryHotHotter: 6,
        FeedbackHotHotter: 7,
        FeedbackWarmWarmer: 8,
        FeedbackColdWarmer : 9,
        FeedbackIceColdWarmer : 10,

        FeedbackVeryHotColder: 11,
        FeedbackHotColder : 12,
        FeedbackWarmColder: 13,
        FeedbackColdColder: 14,
        FeedbackIceColdColder : 15

    };

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //     var target = game.newGame(); - Reset local counters
    //                  newGame generates a number between 1 and 100 using the random generator utility.
    //                    This can be overridden by passing in a target value.  Use the override, if you
    //                    want to use this in a multiplayer model where one person specifies the target and
    //                    the other person guesses.
    //
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    this.newGame = function(targetVal) {


        lastGuess = 0;
        lastDiff = 0;
        lastCloseness = 0;
        guesses.length = 0;

        if (targetVal === undefined) {
            correctAnswer = generateRandomNumber();
        } else {
            correctAnswer = targetVal;
        }

        return correctAnswer;
    }   ;

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  var returnVal = game.checkGuess(guess); - Check the guess
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    this.checkGuess = function(guess) {



        // Initializations - Initialize to a winning response.
        var closeness = this.responses.FeedbackDone;

        var diff = Math.abs(correctAnswer - guess);

        // Not a match - calculate the closeness value
        if (diff !== 0) {
            if (diff >= 1 && diff <= 10) {
                closeness = this.responses.FeedbackVeryHot;
            } else if (diff > 10 && diff <= 20) {
                closeness = this.responses.FeedbackHot;
            } else if (diff > 20 && diff <= 30) {
                closeness = this.responses.FeedbackWarm;
            } else if (diff > 30 && diff <= 50) {
                closeness = this.responses.FeedbackCold;
            } else {
                closeness = this.responses.FeedbackIceCold;
            }
        }

        // Set the return value to the current closeness;
        var returnVal = closeness;

        // Compare to the last answer to see if the guess is further away or closer and
        // update the return value accordingly.
        if (closeness === lastCloseness) {
            if (diff < lastDiff) {
                if (closeness === this.responses.FeedbackVeryHot) {
                    returnVal = this.responses.FeedbackVeryHotHotter;
                }   else if (closeness === this.responses.FeedbackHot)  {
                    returnVal = this.responses.FeedbackHotHotter;
                }   else if (closeness === this.responses.FeedbackWarm ) {
                    returnVal = this.responses.FeedbackWarmWarmer;
                }   else if (closeness === this.responses.FeedbackCold)  {
                    returnVal = this.responses.FeedbackColdWarmer;
                }   else {
                    returnVal = this.responses.FeedbackIceColdWarmer;
                }
            } else if (diff > lastDiff) {
                if (closeness === this.responses.FeedbackVeryHot) {
                    returnVal = this.responses.FeedbackVeryHotColder;
                }   else if (closeness === this.responses.FeedbackHot)  {
                    returnVal = this.responses.FeedbackHotColder;
                }   else if (closeness === this.responses.FeedbackWarm ) {
                    returnVal = this.responses.FeedbackWarmColder;
                }   else if (closeness === this.responses.FeedbackCold)  {
                    returnVal = this.responses.FeedbackColdColder;
                }   else {
                    returnVal = this.responses.FeedbackIceColdColder;
                }
            }
        }

        lastDiff = diff;
        lastGuess = guess;
        lastCloseness = closeness;

        return returnVal;
    };


}