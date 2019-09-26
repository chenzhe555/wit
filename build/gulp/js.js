const gulp = require('gulp');
const { task, src, dest } = gulp;
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

task('js', callback => {
    console.log('处理js文件')

    // 压缩js
    src(['src/**/*.js'])
    .pipe(babel())
    // .pipe(uglify())
    .pipe(dest('dist'));

    callback()
});