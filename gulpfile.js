// 拆分gulpfile
const requireDir = require('require-dir');
requireDir('./build/gulp');
// 命令行参数
const commandParams = require('./build/command/params').default;
console.log(commandParams);

const gulp = require('gulp');
gulp.task('default', gulp.series(['clean', 'copy']))