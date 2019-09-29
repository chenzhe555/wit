const through = require('through2');
const fs = require('fs');

/**
 * 判断当前type类型是否进行插入文本操作
 * @param {int} type
 */
function judgeWhetherInsert(file, type = 1) {
    // 文件内容
    let content = fs.readFileSync(file.path, 'utf8');

    if (type === 1 && content.includes('\"component\": true')) {
        return false;
    }
    if (type === 2 && content.includes('\"component\": true')) {
        return false;
    }
    return true;
}

/**
 * 添加Loading的wxml
 * @param {object} params
 * text: 要插入的文本
 * type: 1. page 2. component 3. page&component
 * exist 1.如果存在相同文本，删除掉 2.如果存在相同文本，不删除
 */
function addLoadingWxml (params = { 'text': '1111', 'type': 1, 'exist': 1, 'fileNames': ['index.wxml']}) {
    let stream = through.obj(function(file, encode, callback){
        if (typeof file === 'object') {
            // 判断当前要插入的组件类型
            let isInsert = judgeWhetherInsert(file, params['type'] || 1);
            if (isInsert) {
                // 插入的文本
                let insertText = params['text'] || '';
                // 文件路径
                let paths = file.path.split('/');
                // 逐一替换，并进行判断
                let fileNames = params['fileNames'] || ['index.wxml'];
                fileNames.forEach(name => {
                    // 替换成wxml路径
                    paths[paths.length - 1] = name;
                    let wxmlPath = paths.join('/');
                    // 筛选 wxml 文件
                    let pathExist = fs.existsSync(wxmlPath);
                    if (pathExist) {
                        let existDelete = params['exist'] || 1;
                        if (existDelete === 1) {
                            // 读取，全局删除，再写入
                            let wxmlText = fs.readFileSync(wxmlPath, 'utf8');
                            wxmlText = wxmlText.replace(new RegExp(insertText,'g'), '');
                            fs.writeFileSync(wxmlPath, wxmlText);
                        }
                        // 拼接文本
                        fs.appendFileSync(wxmlPath, insertText, error => {
                            if (error) {
                                throw error;
                            }
                        });
                    }
                });
            }
        }
        // 确保文件进入下一个 gulp 插件
        this.push(file);
        callback();
    });
    return stream;
}

module.exports = addLoadingWxml;


