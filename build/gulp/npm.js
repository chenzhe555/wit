const { task, src, dest } = require('gulp');
const del = require('del');
const exit = require('exit');

task('npm', function(callback) {
    console.log('复制npm文件');

    // 复制构建后的npm包
    src(['miniprogram_npm/**/*'])
        .pipe(dest('dist/miniprogram_npm'))
        .on('end', function() {
            del([
                'miniprogram_npm'
            ]).then(paths => {
                callback();
            }).catch(error => {
                console.log('删除miniprogram_npm文件失败,请检查后重试');
                exit(0);
                callback();
            });
        });
});