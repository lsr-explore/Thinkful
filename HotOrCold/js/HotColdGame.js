/**
 * Created by laurie on 11/26/2014.
 */
function HotColdGame () {

    this.correctAnswer = 0,
    this.guesses = [],
    this.lastGuess = 0,
    this.lastDiff = 0,
    this.lastCloseness = 0,
    this.guessCount,

     this.initialize = function() {
        lastGuess = 0;
        lastDiff = 0;
        lastCloseness = 0;
        guessCount = 0;
    }

    this.checkGuess = function(guess, match) {
        var diff = Math.abs(match - guess);
        var closeness = 0;

        if (diff != 0) {
            if (diff >= 1 && diff <= 10) {
                closeness = 1;
            } else if (diff > 10 && diff <= 20) {
                closeness = 2;
            } else if (diff > 20 && diff <= 30) {
                closness = 3;
            } else if (diff > 30 && diff <= 50) {
                closeness = 4;
            } else {
                closeness = 5;
            }
        }

        if (closeness === lastCloseness) {
            if (diff < lastDiff) {
                closeness = lastCloseness * 10;
            } else if (diff > lastDiff) {
                closeness = lastCloseness * 100;
            }
        }


        lastDiff = diff;
        lastGuess = guess;
        lastCloseness = closeness;

        return closeness;
    }

    this.generateRandomNumber = function(min, max) {
        if (min === undefined) {
            min = 1;
        }

        if (max === undefined) {
            max = 100;
        }

        correctAnswer = Math.floor(Math.random() * (max - min + 1)) + min;

        console.log(correctAnswer);
    }

}