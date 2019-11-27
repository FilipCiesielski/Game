var sourcemaps=require("gulp-sourcemaps");
var jshint = require("gulp-jshint");
var sass = require("gulp-sass");
var gulp=require("gulp");

gulp.task("dupa",function(done){
    console.log("Hello world");
    done()
});

/* Wymagamy użycia wtyczki jshint */
gulp.task("checkjs", function() {
    return gulp.src("js/app.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
});



gulp.task("sass", function() {
    return gulp.src("scss/main.scss")
        .pipe(sourcemaps.init())
        .pipe(sass(({
            outputStyle: 'expanded',
            sourceComments: 'map'
        })).on("error", sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("css"))
});

gulp.task("watch", function() {
    gulp.watch("scss/*.scss", gulp.series("sass"));
});