const { task, src, dest } = require('gulp');
const addWxml = require('../plugins/wxml');

task('test', callback => {
    console.log('复制文件到dist目录');

    src(['src/**/*.json'], { 'buffer': false })
        .pipe(addWxml({'text': '<include aaa>', 'fileNames': ['index.wxml', 'log.wxml']}))
        .pipe(dest('src'));
    callback();
});