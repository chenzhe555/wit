import BaseComponent from '@/bases/BaseComponent.js';

BaseComponent({
    'data': {
        'show': false
    },
    'methods': {
        show() {
            this.setData({
                'show': true
            });
        },
        hide() {
            this.setData({
                'show': false
            });
        }
    }
});