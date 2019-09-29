const through = require('through2');
const fs = require('fs');

/**
 * 判断当前type类型是否进行插入文本操作
 * @param {object} file 文件类
 * @param {int} type
 */
_judgeWhetherInsert = (file, type = 1) => {
    // 文件内容
    let content = fs.readFileSync(file.path, 'utf8');

    if (type === 1 && content.includes('\"component\": true')) {
        return false;
    }
    if (type === 2 && content.includes('\"component\": true')) {
        return false;
    }
    return true;
};

/**
 * 删除文件下特定文本
 * @param {string} path 文件路径
 * @param {string} text 要删除的文本
 */
_deleteText = (path, text) => {
    // 读取，全局删除，再写入
    let wxmlText = fs.readFileSync(path, 'utf8');
    wxmlText = wxmlText.replace(new RegExp(text,'g'), '');
    fs.writeFileSync(path, wxmlText);
};

/**
 *
 * @param {int} type 1.添加 2.删除
 * @param {object} file 文件对象
 * @param {object} params 配置参数
 */
_handleWxmlText = (type = 1, file, params) => {
    if (typeof file === 'object') {
        // 插入的文本
        let insertText = params['text'] || '';
        if (insertText.length <= 0) {
            return;
        }
        // 判断当前要插入的组件类型
        let isInsert = _judgeWhetherInsert(file, params['type'] || 1);
        if (isInsert) {
            // 文件路径
            let paths = file.path.split('/');
            // 逐一替换，并进行判断
            let fileNames = params['fileNames'] || ['index.wxml'];
            for (let i = 0; i < fileNames.length; ++i) {
                // 替换成wxml路径
                paths[paths.length - 1] = fileNames[i];
                let wxmlPath = paths.join('/');
                // 筛选 wxml 文件
                let pathExist = fs.existsSync(wxmlPath);
                if (pathExist) {
                    if (type === 1) {
                        let existDelete = params['exist'] || 1;
                        if (existDelete === 1) {
                            _deleteText(wxmlPath, insertText);
                        }
                        // 拼接文本
                        fs.appendFileSync(wxmlPath, insertText, error => {
                            if (error) {
                                throw error;
                            }
                        });
                    } else {
                        _deleteText(wxmlPath, insertText);
                    }
                    break;
                }
            }
        }
    }
};


/**
 * 添加Loading的wxml
 * @param {object} params
 * text: 要插入的文本
 * type: 1. page 2. component 3. page&component
 * exist 1.如果存在相同文本，删除掉 2.如果存在相同文本，不删除
 */
addWxmlText = (params = { 'text': '', 'type': 1, 'exist': 1, 'fileNames': ['index.wxml']}) => {
    let stream = through.obj(function(file, encode, callback){
        // 添加文本信息
        _handleWxmlText(1, file, params);
        // 确保文件进入下一个 gulp 插件
        this.push(file);
        callback();
    });
    return stream;
};

module.exports = addWxmlText;


