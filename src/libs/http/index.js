export default class HttpRequest {
    constructor() {
        // 请求唯一id
        this.rID = 0;
        // url地址异常返回的错误数据结构
        this.urlEmptyError = {
            ret: 0,
            error: {
                code: 0,
                msg: 'url为空'
            }
        }
    }

    /**
     * 请求单例
     */
    static getInstance() {
        if(!this.instance) {
            this.instance = new this;
        }
        return this.instance;
    }

    /**
     * POST请求
     * @param {string} url 请求地址
     * @param {object} data 请求数据
     * @param {object} header 请求头
     * @param {object} extra 额外信息: dataType, responseType
     */
    post(url = '', data = {}, header = {}, extra = {}) {
        // 判断请求接口是否存在
        if(url.length > 0) {
            return new Promise( (resolve, reject) => {
                let params = {
                    method: 'POST',
                    url,
                    data,
                    header,
                    dataType: extra['dataType'] || 'json',
                    responseType: extra['responseType'] || 'text',
                    success: resolve,
                    fail: reject
                };
                wx.request(params);
            });
        } else {
            return new Promise( (resolve, reject) => {
                reject(this.urlEmptyError)
            });
        }
    }

    /**
     * 获取statusCode对应的文本信息
     * @param {object} data 返回非200的状态文本信息
     */
    getHttpStatusCodeMsg(data = {}) {
        let code = intval(data['statusCode'] || 0);
        let percentile = code/100;
        let decimals = code%100;
        let codeStr = '';
        switch(percentile) {
            case 1:
                {
                    codeStr = '请求方式待优化';
                }
            break;
            case 2:
                {
                    switch(decimals) {
                        case 0:
                            {
                                codeStr = '请求成功';
                            }
                        break;
                        default:
                            {
                                codeStr = '请求成功，有额外信息返回';
                            }
                        break;
                    }
                }
            break;
            case 3:
                {
                    codeStr = '当前请求重定向等等...';
                }
            break;
            case 4:
                {
                    switch(decimals) {
                        case 0:
                            {
                                codeStr = '请求无法解析，请检查后重试';
                            }
                        break;
                        case 3:
                            {
                                codeStr = '请求拒绝执行';
                            }
                        break;
                        case 4:
                            {
                                codeStr = '当前请求接口不存在';
                            }
                        break;
                        default:
                            {
                                codeStr = '拒绝请求';
                            }
                        break;
                    }
                }
            break;
            case 5:
                {
                    switch(decimals) {
                        case 0:
                            {
                                codeStr = '服务器异常，请稍候重试';
                            }
                        break;
                        default:
                            {
                                codeStr = '服务器异常无法响应请求，请检查后重试';
                            }
                        break;
                    }
                }
            break;
            default:
                {
                    codeStr = '服务器异常，请稍后重试';
                }
            break;
        }
        return codeStr;
    }
}