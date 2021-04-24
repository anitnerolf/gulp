//Gulp functions
const { src, dest, watch, series, parallel } = require("gulp");

//Gulp plugin imports
const sass = require("gulp-sass");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("autoprefixer");

const minify = require("gulp-minify");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

//Files
const files = {
    stylesPath: "./src/scss/**/*.scss",
    scriptsPath: "./src/js**/*.js",
};

//gulp Tasks

function cssTask() {
    return src(files.stylesPath)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([cssnano(), autoprefixer()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest('./dist/scss'))
}

// minify js
function jsTask() {
    return src(files.scriptsPath)
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(dest('./dist/js'))
}

//watcher

function watchTask() {
    watch([files.stylesPath, files.scriptsPath], {
        interval: 1000,
        usePolling: true,
    },
    series(parallel(cssTask, jsTask))
    );
}

//Individual tasks
exports.css = series(
    parallel(cssTask)
);

exports.js = series(
    parallel(jsTask)
);

//default tasks
exports.default = series(
    parallel(cssTask, jsTask),
    watchTask
);

