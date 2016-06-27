var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var sass = require('gulp-sass');
var rollup = require('gulp-rollup');
var rename = require('gulp-rename');
var util = require('gulp-util');
var rollupBabel = require('rollup-plugin-babel');

gulp.task('sass', function () {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass({
            style: "compressed"
        }).on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', () => {
    return gulp.src('src/scripts/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(rollup({
            entry: 'src/scripts/index.js',
            sourceMap: true,
            plugins: [
                rollupBabel({
                    exclude: "node_modules",
                })
            ]
        })).on('error', util.log)
        .pipe(rename('bundle.js'))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('watch', ['sass', 'scripts'], function () {
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch("src/**/*.js", ['scripts']);
});

gulp.task("default", ['sass', 'scripts']);