const gulp = require('gulp');
const { task, src, dest } = gulp;
const fs = require('fs');

task('copy', callback => {
    console.log('复制文件到dist目录')

    // 复制文件到dist目录
    src([
        'app.js', 
        'app.json', 
        'app.wxss',
        'sitemap.json',
        'src/**',
        '!src/**/*.js',
        '!src/**/*.scss',
        '!src/**/*.wxss'
    ]).pipe(dest('dist'));

    // 判断是否存在项目配置文件,如果不存在，则复制项目外的至此
    const isExistConfig = fs.existsSync('dist/project.config.json')
    if (!isExistConfig) src(['project.config.json']).pipe(dest('dist'));

    callback()
})