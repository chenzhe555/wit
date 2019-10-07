import WXRequest from '@/http/index.js';

function test() {
    WXRequest.getInstance().post('http://localhost:8138/info/allProject.gos')
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error);
        });
}

export {
    test
};