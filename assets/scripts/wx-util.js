let WXUtil = {
  /**
   * 微信登录
   * @param success 回调函数，接收一个 code 参数：code 临时登录凭证
   * @param fail    回调函数，登录失败调用
   */
  login(success, fail) {
    wx.login({
      success(res) {
        if (res.code) {
          if (success) {
            success(res.code);
          }
        } else {
          if (fail) fail();
          cc.log("登录失败：" + res.errMsg);
        }
      },
      fail() {
        if (fail) fail();
        cc.log("登录失败！");
      }
    });
  },

  /**
   * 获取微信授权状态
   * @param success 回调函数，接收一个state参数：0  未询问过授权，1  已授权，2  已拒绝授权
   * @param fail    回调函数，获取授权状态失败调用
   */
  getAuthState(success, fail) {
    wx.getSetting({
      success(res) {
        let state = 0;   // 未询问过用户授权
        let authSetting = res.authSetting;
        if (authSetting["scope.userInfo"] === true) {
          state = 1;
        } else if (authSetting["scope.userInfo"] === false) {
          state = 2;
        }
        if (success) {
          success(state);
        }
      },
      fail() {
        if (fail) fail();
        cc.log("获取微信授权状态失败");
      }
    })
  },

  /**
   * 创建授权按钮
   * @param callback 回调函数，接收一个info参数：info 用户信息
   */
  createAuthButton(callback) {
    var button = wx.createUserInfoButton({
      type: 'text',
      text: '获取授权',
      style: {
        left: wx.getSystemInfoSync().screenWidth / 2 - 60,
        top: 100,
        width: 120,
        height: 40,
        lineHeight: 40,
        backgroundColor: '#00aa00',
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 16,
        borderRadius: 4
      }
    });

    button.show();

    button.onTap(res => {
      if (res.errMsg === "getUserInfo:ok") {
        if (callback) {
          callback(res);
        }
        button.destroy();
      } else {
        cc.log("用户拒绝授权！");
      }
    });
  },

  /**
   * 获取用户信息
   * @param success  回调函数，接收一个info参数：info 用户信息
   * @param fail     回调函数，获取用户信息失败调用
   */
  getUserInfo(success, fail) {
    wx.getUserInfo({
      success(res) {
        if (success) {
          success(res);
        }
      },
      fail() {
        if (fail) fail();
        cc.log("获取用户信息失败！");
      }
    });
  },

  /**
   * 分享
   * @param title    标题
   * @param imageUrl 图片链接
   */
  share(title, imageUrl) {
    wx.shareAppMessage({
      title: title,
      imageUrl: imageUrl
    });
  },

  /**
   * 启用右上角菜单分享
   * @param title   标题 
   * @param mageUrl 图片链接 
   */
  enableMenuShare(title, imageUrl) {
    wx.showShareMenu({
        withShareTicket: true
    });
    wx.onShareAppMessage(() => {
        return {
            title: title,
            imageUrl: imageUrl
        }
    });
  }
}

module.exports = WXUtil;