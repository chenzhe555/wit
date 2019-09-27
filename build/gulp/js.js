const gulp = require('gulp');
const { task, src, dest } = gulp;
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const aliases = require('gulp-wechat-weapp-src-alisa');

task('js', callback => {
    console.log('处理js文件')

    src(['src/**/*.js', '*.js'])
    // 地址别名替换
    .pipe(aliases(require('../config/alias').default))
    // babel,语法转换
    .pipe(babel())
    // 代码压缩
    // .pipe(uglify({}))
    // 输出
    .pipe(dest('dist'));

    callback()
});