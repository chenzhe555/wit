const gulp = require('gulp');
const { src, dest } = gulp;

gulp.task('copy', callback => {
    console.log('复制文件到dist目录')

    // 复制文件到dist目录
    src(['src/**']).pipe(dest('dist'));
    callback();
})