import { observer } from '@/mp-cz-mobx/observer';

function BasePage(originPageOptions) {
    /**
     * onLoad: 页面创建时执行
     * onShow: 页面出现在前台时执行
     * onReady: 页面首次渲染完毕时执行
     * onHide: 页面从前台变为后台时执行
     * onUnload: 页面销毁时执行
     */
    const { onLoad = null, onShow = null, onReady = null, onHide = null, onUnload = null} = originPageOptions;

    function _onLoad(options) {
        console.log('page_onLoad');
        onLoad && onLoad.apply(this, options);
    }

    function _onShow() {
        console.log('page_onShow');
        onShow && onShow.apply(this);
    }

    function _onReady() {
        console.log('page_onReady');
        onReady && onReady.apply(this);
    }

    function _onHide() {
        console.log('page_onHide');
        onHide && onHide.apply(this);
    }

    function _onUnload() {
        console.log('page_onUnload');
        onUnload && onUnload.apply(this);
    }

    // 合并属性值
    const injectPageOptions = Object.assign({}, originPageOptions, {
        onLoad: _onLoad,
        onShow: _onShow,
        onReady: _onReady,
        onHide: _onHide,
        onUnload: _onUnload
    });

    // 返回Page对象
    return Page(observer(injectPageOptions));
}

export default BasePage;