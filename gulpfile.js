/**
 * Gulp tasks for openslides.org
 *
 * Run $ ./node_modules/.bin/gulp
 *
 */
// TODO: Remove the next line when support for Node 0.10.x is dropped.
// See https://github.com/postcss/postcss#nodejs-010-and-the-promise-api
require('es6-promise').polyfill();

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    gettext = require('gulp-angular-gettext'),
    jshint = require('gulp-jshint'),
    mainBowerFiles = require('main-bower-files'),
    nodemon = require('gulp-nodemon'),
    path = require('path'),
    uglify = require('gulp-uglify');

// Directory where the results go to
var output_directory = path.join('public', 'static');


/**
 * Default tasks to be run before start.
 */

// Catches all JavaScript files from all bower components and concats and uglify
// them to js/openslides-libs.js.
gulp.task('js-libs', function () {
    return gulp.src(mainBowerFiles({
            filter: /\.js$/
        }))
        .pipe(concat('openslides-libs.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.join(output_directory, 'libs', 'js')));
});

// Catches all CSS files from all bower components and concats and uglify
// them to css/openslides-libs.css.
gulp.task('css-libs', function () {
    return gulp.src(mainBowerFiles({
            filter: /\.css$/
        }))
        .pipe(concat('openslides-libs.css'))
        .pipe(cssnano({discardUnused: false}))
        .pipe(gulp.dest(path.join(output_directory, 'libs', 'css')));
});

// Catches all font files from all bower components.
gulp.task('fonts-libs', function() {
    return gulp.src(mainBowerFiles({
            filter: /\.(eot)|(svg)|(ttf)|(woff)|(woff2)$/
        }))
        .pipe(gulp.dest(path.join(output_directory, 'libs', 'fonts')));
});


// Compiles translation files (*.po) to *.json and saves them in the directory i18n.
gulp.task('translations', function () {
    return gulp.src(path.join('locale', '*.po'))
        .pipe(gettext.compile({
            format: 'json'
        }))
        .pipe(gulp.dest(path.join(output_directory, 'i18n')));
});

// Gulp default task. Runs all other tasks before.
gulp.task('default', ['js-libs', 'css-libs', 'fonts-libs', 'translations'], function () {});


/**
 * Extra tasks that have to be called manually.
 */

// Extracts translatable strings using angular-gettext and saves them in file
// locale/template-en.pot.
gulp.task('pot', function () {
    return gulp.src(['public/index.html',
                     'public/static/views/*.html',
                     'public/static/js/*.js'])
        .pipe(gettext.extract('template-en.pot', {}))
        .pipe(gulp.dest('locale'));
});

// Checks JavaScript using JSHint
gulp.task('jshint', function () {
    return gulp.src([ 'gulpfile.js', path.join('public', 'static', 'js', '*.js' ) ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Run http express server
gulp.task('serve', function () {
    nodemon({
        script: 'server.js'
    });
});
