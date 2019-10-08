import { testRequest } from '@/http/account.js';
import BasePage from '@/bases/BasePage.js';

BasePage({
    onLoad: function() {
        this.count = 1;
    },
    //事件处理函数
    tapShowToast: function() {
        // wx.apis.showToast({'title': 'cc21kdabdbs12'});
        wx.toast.show('1333', {'key': 'chenzhe'});
    },
    tapShowLoading: function() {
        // wx.showLoading({
        //     'title': '加载中'
        // });


        if (this.count%2 === 1) {
            wx.loading.showCustomLoading('aaaaaa');
        } else {
            wx.loading.hideCustomLoading();
        }
        this.count++;
    },
    goToNewPage: function() {
        wx.navigateTo({
            'url': '../detail/index'
        });
    },
    requestTest: function() {
        testRequest();
    }
});
