import { observercom } from '@/mp-cz-mobx/observercom.js';

export default function BaseComponent(originPageOptions) {
    // 提取原始值
    const {
        /**
         * created: 在组件实例刚刚被创建时执行
         * attached: 在组件实例进入页面节点树时执行
         * ready: 在组件在视图层布局完成后执行
         * moved: 在组件实例被移动到节点树另一个位置时执行
         * detached: 在组件实例被从页面节点树移除时执行
         */
        lifetimes: {created = null, attached = null, ready = null, moved = null, detached = null, error = null} = {},
        /**
         * show: 组件所在的页面被展示时执行
         * hide: 组件所在的页面被隐藏时执行
         * resize: 组件所在的页面尺寸变化时执行
         */
        pageLifetimes: {show = null, hide = null, resize = null} = {}
    } = originPageOptions;

    function _created() {
        console.log('component_created');
        created && created.apply(this);
    }

    function _attached() {
        console.log('component_attached');
        attached && attached.apply(this);
    }

    function _ready() {
        console.log('component_ready');
        ready && ready.apply(this);
    }

    function _moved() {
        console.log('component_moved');
        moved && moved.apply(this);
    }

    function _detached() {
        console.log('component_detached');
        detached && detached.apply(this);
    }

    function _error(info) {
        console.log('component_error', info);
        error && error.apply(this);
    }

    function _show() {
        console.log('component_show');
        show && show.apply(this);
    }

    function _hide() {
        console.log('component_hide');
        hide && hide.apply(this);
    }

    function _resize() {
        console.log('component_resize');
        resize && resize.apply(this);
    }

    // 合并属性值
    const injectPageOptions = Object.assign({}, originPageOptions, {
        created: _created,
        attached: _attached,
        ready: _ready,
        moved: _moved,
        detached: _detached,
        error: _error,
        show: _show,
        hide: _hide,
        resize: _resize
    });

    return Component(observercom(injectPageOptions));
}