/**
 * WX toast管理器类
 */
export default class ToastManager {
  /*************************************************************属性*************************************************************/
  //显示策略: 1.有新的toast文本，则直接显示 2.有新的toast文本，排入队列
  static toastManagerStrategy = {
    Immediately: 1,
    Queue: 2
  }
  //失败策略: 1.忽略 2.重试
  static toastManagerFailStrategy = {
    Immediately: 1,
    Queue: 2
  }
  // 当前是否有toast文本正在显示
  static isShowingToast = false;
  // Toast显示默认时间
  static defaultDuring = 1500;
  //显示队列
  static showQueue = [];
  //显示策略
  static showStrategy = ToastManager.toastManagerStrategy.Immediately;
  //显示失败策略
  static showFailStrategy = ToastManager.toastManagerFailStrategy.Continue;
  //定时器
  static showTimeoutCallback;

  /*************************************************************对外提供的方法*************************************************************/
  
  /**
   * 显示Toast
   * @param {string} msg 显示的Toast文本信息
   * @param {object} config 配置信息 {icon, image, duration, mask, key}, 其中key不是官方提供的值，是用于隐藏特定Key对应的Toast
   */
  static show = (msg = '', config = {}) => {
    //空串 返回
    if (msg.length <= 0) return;

    //设置Toast相关配置信息
    let toastConfig = Object.assign({ title: msg, icon: 'none', duration: this.defaultDuring }, config);

    // 显示策略判断
    switch (this.showStrategy) {
      case this.toastManagerStrategy.Immediately:
        {
          //如果是立即，则直接执行微信Toast显示方法
          wx.showToast(toastConfig);
        }
        break;
      case this.toastManagerStrategy.Queue:
        {
          //如果是走队列，则把配置文件放入队列，执行显示Toast操作
          this.showQueue.push(toastConfig);
          if (!this.isShowingToast) {
            this._showToastFunc();
          }
        }
        break;
      default:
        break;
    }
  };

  /**
   * 隐藏Toast
   * @param {string} key 隐藏特定key值的Toast, 如果key不存在，则忽略
   */
  static hide = (key = '') => {
    switch (this.showStrategy) {
      case this.toastManagerStrategy.Immediately:
        {
          //如果是立即，则直接执行微信Toast隐藏方法
          wx.hideToast();
        }
        break;
      case this.toastManagerStrategy.Queue:
        {
          // 如果是走队列，则清除定时器和第一个配置信息或者特定key对应的
          if (this.showQueue.length > 0) {
            // 默认清除第一个配置信息
            let cleanIndex = 0;
            // 如果存在特定key，找出是否有符合的, cleanIndex设置为-1
            if (key.length > 0) {
              cleanIndex = -1;
              let config = null;
              //筛选元素
              for (let i = 0; i < this.showQueue.length; ++i) {
                config = this.showQueue[i];
                if (config['key'] === key) {
                  cleanIndex = i;
                  break;
                }
              }
            }

            // 清除并重新显示,如果是第一个，停止定时；如果不是第一个，直接删除数组元素即可
            if (cleanIndex !== -1) {
              this.showQueue.splice(cleanIndex, 1);
              if (cleanIndex == 0) {
                this._clean();
                this._showToastFunc();
              }
            }
          } else {
            wx.hideToast();
            this._clean();
          }
        }
        break;
      default:
        break;
    }
  };

  /*************************************************************内部调用方法*************************************************************/
  /**
   * 显示Toast业务逻辑
   */
  static _showToastFunc = () => {
    //如果队列里没有，则返回
    if (this.showQueue.length <= 0) {
      this._clean();
      return;
    }

    //取出队列中第一个配置文件
    let config = this.showQueue[0];

    // TODO:失败暂未实测
    if (this.showFailStrategy == this.toastManagerFailStrategy.Retry) {
      //如果选择失败重试，则实现Fail方法
      config['fail'] = this.showToastFail;
    }

    //显示Toast
    this.isShowingToast = true;
    wx.showToast(config);

    //设置定时器
    this.showTimeoutCallback && clearTimeout(this.showTimeoutCallback);
    this.showTimeoutCallback = setTimeout(() => {
      //移除第一个配置
      this.showQueue.shift();
      this._showToastFunc();
    }, config['duration']);
  };

  /**
   * 清理环境
   */
  static _clean = () => {
    this.showTimeoutCallback && clearTimeout(this.showTimeoutCallback);
    this.isShowingToast = false;
  }

  /*
  wx.showToast调用失败，目前只对retry做处理
  */
  static showToastFail = () => {
    //如果失败，清除定时器，并重新显示第一个配置
    this._clean();
    this._showToastFunc();
  };
}
