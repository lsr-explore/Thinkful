/**
 * Created by laurie on 11/27/2014.
 */


function generateRandomNumber(min, max) {
    "use strict";
    var randomNumber;
    if (min === undefined) {
        min = 1;
    }

    if (max === undefined) {
        max = 100;
    }

    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomNumber;
}