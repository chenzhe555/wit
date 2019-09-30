const { task, src, dest } = require('gulp');
const addWxmlText = require('gulp-mp-modify-wxml');

const addParams = {'text': '<cz-custom-loading id=\"cz-custom-loading\"/>', 'fileNames': ['index.wxml', 'log.wxml']};

task('modifywxml', callback => {
    console.log('修改wxml文件');

    src(['src/**/*.json', 'src/**/*.wxml'])
        .pipe(dest('dist'))
        .on('end', function() {
            src(['dist/**/*.json'])
                .pipe(addWxmlText(addParams))
                .pipe(dest('dist'));
            callback();
        });
});