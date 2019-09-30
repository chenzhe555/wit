const { task, src, dest } = require('gulp');
const webpack = require('webpack-stream');

task('npm', function (callback) {
    console.log('构建npm');

    src(['src/libs/npm/index.js'])
        .pipe(webpack({
            'mode': 'production',
            'output': {
                'libraryTarget': 'commonjs2',
                'filename': 'index.js'
            }
        }))
        .pipe(dest('dist/libs/npm'));
    callback();
});