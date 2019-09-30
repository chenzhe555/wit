const { task, src, dest } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const aliases = require('gulp-wechat-weapp-src-alisa');
const exit = require('exit');

task('js', callback => {
    console.log('处理js文件');

    src(['src/**/*.js', '*.js', '!gulpfile.js', '!src/libs/npm/index.js'])
        // 地址别名替换
        .pipe(aliases(require('../config/alias').default))
        // babel,语法转换
        .pipe(babel().on('error', function(error) {
            if (error) {
                console.log(error);
            // exit(0)
            }
        }))
        // 代码压缩
        // .pipe(uglify({}))
        // 输出
        .pipe(dest('dist'));
    callback();
});