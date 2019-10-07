//logs.js
const util = require('../../utils/util.js');

import BasePage from '@/bases/BasePage.js';

BasePage({
    'data': {
        'logs': []
    },
    'onLoad': function () {
        this.setData({
            'logs': (wx.getStorageSync('logs') || []).map(log => {
                return util.formatTime(new Date(log));
            })
        });
    }
});
