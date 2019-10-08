import Loading from 'libs/utils/loading.js';
import Toast from 'mp-cz-toast-manager';
import { wxAPIPromise } from 'mp-cz-utils';

// wx扩展
function extendWX () {
    wx.apis = wxAPIPromise();
    Toast.showStrategy = Toast.toastManagerStrategy.Queue;
    wx.toast = Toast;
    wx.loading = Loading;
}

App({
    'onLaunch': function () {
        extendWX();
    }
});