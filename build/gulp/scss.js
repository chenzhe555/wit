const gulp = require('gulp');
const { src, dest } = gulp;
const scss = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('scss', function (callback) {
    console.log('scss替换为wxss')

    // scss文件转换
    src(['src/**/*.scss'])
    // outputStyle: nested, expanded, compact, compressed
    .pipe(scss({outputStyle: 'compressed'}).on('error', scss.logError))
    .pipe(autoprefixer())
    .pipe(rename({extname: '.wxss'}))
    .pipe(dest('dist'))
    callback()
})