import WXRequest from '@/http/index.js';

function testRequest() {
    WXRequest.getInstance().post('http://localhost:8137/info/allProject.go')
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.log('error');
            console.log(error);
        });
}

export {
    testRequest
};