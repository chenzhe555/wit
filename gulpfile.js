// npm install --save-dev gulp exit gulp-sass minimist require-dir gulp-autoprefixer gulp-rename @babel/core gulp-babel gulp-uglify gulp-postcss wx-px2rpx gulp-wechat-weapp-src-alisa webpack-stream


// 拆分gulpfile
const requireDir = require('require-dir');
requireDir('./build/gulp');
// 命令行参数
const commandParams = require('./build/command/params').default;
const gulp = require('gulp');
const { task, series, parallel, watch } = gulp;


// watch
function watchProject() {
    watch(['src/**'], series('copy'));
    watch(['src/**/*.scss'], series('scss'));
    watch(['src/**/*.js', 'app.js'], series('js'));
    watch(['src/**/*.wxml', 'app.js'], series('modifywxml'));
    watch(['miniprogram_npm/**'], series('npm'));
}

// main
if (commandParams.watch) {
    task('default', series(['clean', parallel('copy', 'images', 'scss', 'js', 'npm'), 'modifywxml', watchProject]));
} else {
    task('default', series(['clean', parallel('copy', 'images', 'scss', 'js', 'npm'), 'modifywxml']));
}