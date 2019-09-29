const { task, src, dest } = require('gulp');
const addWxmlText = require('../plugins/wxml');

const addParams = {'text': '', 'fileNames': ['index.wxml', 'log.wxml']};

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