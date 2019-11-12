"use srtict";

const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const beeper = require("beeper");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

function serve() {
  browserSync.init({
    server: "source"
  });
  watch("source/sass/**/*.scss", style);
  watch("source/*.html").on("change", reload);
};

function style() {
  return src("source/sass/main.scss")
    .pipe(plumber(errorHandler))
    .pipe(sass())
    .pipe(dest("source/css"))
    .pipe(browserSync.stream());
};

function errorHandler(error) {
  beeper();
  return true;
}

exports.style = style;
exports.serve = serve;