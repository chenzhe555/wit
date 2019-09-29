const { task, src, dest } = require('gulp');

task('images', callback => {
    console.log('拷贝图片');

    src(['src/assets/images/**/*.gif'])
        .pipe(dest('dist/assets/images'));

    callback();
});

