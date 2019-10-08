const gulp = require('gulp');
const del = require('del');
const exit = require('exit');

// 删除dist文件夹下所有文件
gulp.task('clean', callback => {
    console.log('删除dist');

    // 不清除项目配置文件
    del([
        'dist/**',
        '!dist/project.config.json'
    ]).then(paths => {
        callback();
    }).catch(error => {
        console.log('删除dist文件失败,请检查后重试');
        exit(0);
        callback();
    });
});