const gulp = require('gulp');
const { src, dest } = gulp;
const scss = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
const px2rpx = require('wx-px2rpx');

gulp.task('scss', function (callback) {
    console.log('scss替换为wxss');

    // scss文件转换
    src(['src/**/*.scss'])
    // outputStyle: nested, expanded, compact, compressed
        .pipe(scss({'outputStyle': 'nested'}).on('error', scss.logError))
    // px转rpx
        .pipe(postcss([px2rpx({'proportion': 2})]))
    // 补齐前缀
        .pipe(autoprefixer())
    // 文件后缀重命名
        .pipe(rename({'extname': '.wxss'}))
    // 输出
        .pipe(dest('dist'));

    callback();
});