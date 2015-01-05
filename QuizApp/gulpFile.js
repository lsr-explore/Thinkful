/**
 * Created by laurie on 12/24/2014.
 */
var gulp = require("gulp");
var jshint = require("gulp-jshint");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var mocha = require("gulp-mocha");
var istanbul = require("gulp-istanbul");
var chai = require("chai");
var plato = require('gulp-plato');
var jsdoc = require("gulp-jsdoc");
var del = require("del");

var foreach = require('gulp-foreach'); // https://www.npmjs.org/package/gulp-foreach
var parsePath = require('parse-filepath'); // https://www.npmjs.org/package/parse-filepath
var es = require('event-stream'); // https://www.npmjs.org/package/event-stream

var w3cjs = require('gulp-w3cjs');

gulp.task("default", ["testWithIstanbul", "complexity", "docs", "w3cjs"]);

gulp.task("publish",["clean-publish"], function() {
    "use strict";

    return gulp.src("source/scripts/*.js") // read all of the files that are in script/lib with a .js extension
        .pipe(jshint()) // run their contents through jshint
        .pipe(jshint.reporter("default")) // report any findings from jshint
        .pipe(concat("quizApp.js")) // concatenate all of the file contents into a file titled 'all.js'
        .pipe(gulp.dest("publish/scripts")) // write that file to the dist/js directory
        .pipe(rename("quizApp.min.js")) // now rename the file in memory to 'all.min.js'
        .pipe(uglify()) // run uglify (for minification) on 'all.min.js'
        .pipe(gulp.dest("publish/scripts")); // write all.min.js to the dist/js file

});


gulp.task("testWithIstanbul", function (cb) {
  gulp.src(["source/scripts/quizEngine.js"])
    .pipe(istanbul()) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function () {
      gulp.src(["tests/quizEngineTest.js"])
        .pipe(mocha())
        .pipe(istanbul.writeReports('quality-report/coverage')) // Creating the reports after tests runned
        .on('end', cb);
    });
});

function handleError(err) {
  console.log("error: " + err.toString());
  if (watching) {
    this.emit('end');
  } else {
    // if you want to be really specific
    process.exit(1);
  }
}

gulp.task('complexity', function(){
    "use strict";
    return gulp.src('source/scripts/*.js')
        .pipe(plato('quality-report/complexity', {
            jshint: {
                options: {
                    strict: true
                }
            },
            complexity: {
                trycatch: true
            }
        }));
});

gulp.task("runTests", function () {
    "use strict";
    return gulp.src(["tests/*.js"], { read: false })
        .pipe(mocha({
            reporter: "spec"
        })) ;
});

gulp.task("docs", function() {
    "use strict";
    gulp.src("./source/scripts/*.js")
  .pipe(jsdoc('./quality-report/documentation-output'))  
});

gulp.task("w3cjs", function() {
    "use strict";
    gulp.src('source/*.html')
        .pipe(w3cjs()); 
});

gulp.task("clean", function() {
    "use strict";
    del([
    	"quality-report/reports",
    	"quality-report/documentation-output",
    	"quality-report/coverage"
	]);
    
});

gulp.task("clean-publish", function() {
    "use strict";

    del([
    	"publish/scripts/*.js"
	]);
});
    


