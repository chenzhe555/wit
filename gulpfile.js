// npm install --save-dev gulp exit gulp-sass minimist require-dir gulp-autoprefixer gulp-rename @babel/core gulp-babel gulp-uglify gulp-postcss wx-px2rpx 


// 拆分gulpfile
const requireDir = require('require-dir');
requireDir('./build/gulp');
// 命令行参数
const commandParams = require('./build/command/params').default;
console.log(commandParams);


// main
const gulp = require('gulp');
const { task, series, parallel } = gulp;
task('default', series(['clean', 'copy', 'scss', 'js']))