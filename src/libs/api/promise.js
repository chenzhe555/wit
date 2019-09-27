
const defaultAPIs = [
    'showToast'
]

/**
 * 将微信中的API转换成Promise实现
 * @param {array}} funcs WX的API数组
 */
function wxAPIPromise(funcs = defaultAPIs) {
    let obj = {}
    // wx存在并且 APIs是数组
    if(typeof wx !== 'undefined' && Array.isArray(funcs)) {
        funcs.forEach(item => {
            // 如果存在该方法
            if(wx[item] && typeof wx[item] === 'function') {
                obj[item] = (params = {}) => {
                    return new Promise((resolve, reject) => {
                        params['success'] = resolve;
                        params['fail'] = reject;
                        wx[item](params);
                    })
                }
            }
        })
    }
    return obj;
}

export default wxAPIPromise;

