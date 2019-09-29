/**
 * WX Loading 管理类: 暂未加入调用fail
 * 不是目前不想做，是
 * wx.showLoading 和 wx.showToast 同时只能显示一个
 * 这个恶心的原因，为此要做一些状态位及通知等事，与toast强关联来，目前没必要，后续看如果加入全局loading视图再来处理这块
 * TODO: 引用计数记在谁身上!? 暂时先不加引用计数 Key后续加
 */
export default class LoadingManager {

    /**
     * 显示Loading
     * @param {string} text 显示的文本信息
     * @param {int} type 1.系统loading 2.自定义loading
     * @param {object} params type:1.系统loading 2.自定义loading； loading_name:自定义loading名称；  mask:是否有蒙版，防止触摸穿透； key: Loading唯一标识
     */
    static show = (text = '', params = { 'type': 1, 'loading_name': 'cz-custom-loading', 'mask': false, 'key': '' }) => {
        let pages = getCurrentPages();
        if (pages.length) {
            let type = params['type'] || 1;
            let mask = params['mask'] || false;
            if (type === 1) {
                return new Promise( (resolve, reject) => {
                    wx.showLoading({
                        'title': text,
                        mask,
                        'success': resolve,
                        'fail': reject
                    });
                });
            } else if (type === 2) {
                return new Promise( (resolve) => {
                    this._handleLoading(pages, 'show');
                    resolve(null);
                });
            }
        }
    }

    /**
     * 隐藏Loading
     * @param {object} params type:1.系统loading 2.自定义loading； key: 对应的key值
     */
    static hide = (params = {'type': 1, 'key': '', 'loading_name': 'cz-custom-loading'}) => {
        let pages = getCurrentPages();
        if (pages.length) {
            let type = params['type'] || 1;
            if (type === 1) {
                return new Promise( (resolve, reject) => {
                    wx.hideLoading({
                        'success': resolve,
                        'fail': reject
                    });
                });
            } else if (type === 2) {
                return new Promise( (resolve) => {
                    this._handleLoading(pages, 'hide');
                    resolve(null);
                });
            }
        }
    }

    static _handleLoading = (pages, funcName = 'show',params = {}) => {
        let loadingName = params['loading_name'] || 'cz-custom-loading';
        let page = pages[pages.length - 1];
        if (!page['loading-count']) {
            page['loading-count'] = 0;
        }
        let loading = page.selectComponent('#' + loadingName);
        if (loading[funcName]) {
            page['loading-count'] += 1;
            loading[funcName]();
        }
    }

    /**
     * 显示系统Loading
     * @param {string} text 显示文本
     * @param {boolean} mask 是否显示蒙版
     */
    static showSystem = (text = '', mask = false) => {
        return new Promise( (resolve, reject) => {
            this.show(text, {'type': 1, mask}).then(res => {
                resolve(res);
            }).catch(error => {
                reject(error);
            });
        });
    }

    /**
     * 隐藏系统Loading
     */
    static hideSystem = () => {
        return new Promise( (resolve, reject) => {
            this.hide({'type': 1}).then(res => {
                resolve(res);
            }).catch(error => {
                reject(error);
            });
        });
    }

    /**
     * 显示自定义Loading
     * @param {string} text 显示文本
     * @param {boolean} mask 是否显示蒙版
     */
    static showCustomLoading = (text = '', mask = false) => {
        return new Promise( (resolve, reject) => {
            this.show(text, {'type': 2, mask}).then(res => {
                resolve(res);
            }).catch(error => {
                reject(error);
            });
        });
    }

    /**
     * 隐藏自定义Loading
     */
    static hideCustomLoading = () => {
        return new Promise( (resolve, reject) => {
            this.hide({'type': 2}).then(res => {
                resolve(res);
            }).catch(error => {
                reject(error);
            });
        });
    }
}