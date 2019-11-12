"use srtict";

const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass");
const csso = require("gulp-csso");
const htmlmin = require("gulp-htmlmin");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const plumber = require("gulp-plumber");
const beeper = require("beeper");
// const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
// const posthtml = require("gulp-posthtml");
const stylelint = require("gulp-stylelint");
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
  return src("source/sass/*.scss")
    .pipe(plumber(errorHandler))
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(dest("source/css"))
    .pipe(browserSync.stream());
};

function lint() {
  return src("source/sass/**/*.scss")
    .pipe(stylelint({
      reporters: [{ formatter: 'string', console: true }]
  }))
};

function errorHandler(error) {
  beeper();
  return true;
}

// function html() {
//   return gulp.src("./source/*.html")
//     .pipe(posthtml([
//       include()
//     ]))
//     .pipe(gulp.dest("./source"));
// };

function htmlminify() {
  return src("source/*.html")
    .pipe(htmlmin())
    .pipe(dest("source"));
};

// function jsminify() {
//   return gulp.src("/source/js/script.js")
//     .pipe(uglify())
//     .pipe(rename("script.min.js"))
//     .pipe(gulp.dest("/source/js"))
//     .pipe(browserSync.stream());
// };

exports.style = style;
exports.lint = lint;
// exports.html = html;
exports.htmlminify = htmlminify;
// exports.jsminify = jsminify;
exports.serve = serve;