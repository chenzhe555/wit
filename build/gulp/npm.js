const { task, src, dest } = require('gulp');
const path = require('path');

const webpack = require('webpack-stream');

task('npm', function(callback) {
    // const projectPath = path.join(__dirname, '../../');
    // console.log('tag', projectPath);
    // const aaa = src('app.js', { read: false })
    //     .pipe(shell(['/Applications/wechatwebdevtools.app/Contents/MacOS/cli --build-npm ' + projectPath]));
    // console.log('这里是什么', aaa);

    // 复制构建后的npm包
    src(['miniprogram_npm/**/*'])
        .pipe(dest('dist/miniprogram_npm'));
    callback();
});


// const webpack = require('webpack-stream');

// task('npm', function (callback) {
//     console.log('构建npm');

//     src(['src/libs/npm/index.js'])
//         .pipe(webpack({
//             'mode': 'production',
//             'output': {
//                 'libraryTarget': 'commonjs2',
//                 'filename': 'index.js'
//             }
//         }))
//         .pipe(dest('dist/libs/npm'));
//     callback();
// });