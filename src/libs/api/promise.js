
const defaultAPIs = [
    'showToast'
]

function wxAPIPromise(funcs = defaultAPIs) {
    let obj = {}
    // wx存在并且 APIs是数组
    if(typeof wx !== 'undefined' && Array.isArray(funcs)) {
        funcs.forEach(item => {
            // 如果存在该方法
            if(wx[item] && typeof wx[item] === 'function') {
                obj[item] = (argvs = {}) => {
                    return new Promise((resolve, reject) => {
                        argvs['success'] = resolve;
                        argvs['fail'] = reject;
                        wx[item](argvs);
                    })
                }
            }
        })
    }
    return obj;
}

export default wxAPIPromise;

