const WXUtil = require("wx-util");

cc.Class({
    extends: cc.Component,

    properties: {

    },

    start () {
        WXUtil.login(code => {
            console.log("临时登录凭证: " + code);
        });

        WXUtil.getAuthState(state => {
            if (state === 1) {
                WXUtil.getUserInfo(info => {
                    console.log(info);
                    this.setUserInfo(info);
                })
            } else {
                WXUtil.createAuthButton(info => {
                    console.log(info);
                    this.setUserInfo(info);
                })
            }
            console.log("授权状态：" + state);
        });

        // 点击按钮后分享
        cc.find("ShareButton", this.node).on("click", button => {
            WXUtil.share("这是一个非常好玩的游戏，你也来加入吧！", "http://i1.sinaimg.cn/ent/d/2008-06-04/U105P28T3D2048907F326DT20080604225106.jpg");
        });

        // 点击右上角菜单分享
        WXUtil.enableMenuShare("这是一个非常好玩的游戏，你也来加入吧！", "http://i1.sinaimg.cn/ent/d/2008-06-04/U105P28T3D2048907F326DT20080604225106.jpg");
    },

    setUserInfo(info) {
        let nameLabel = cc.find("Name", this.node).getComponent(cc.Label);
        nameLabel.string = info.userInfo.nickName;
        let headSprite = cc.find("Head", this.node).getComponent(cc.Sprite);
        cc.loader.load({url: info.userInfo.avatarUrl, type: "jpg"}, (err, texture) => {
            if (!err) {
                headSprite.spriteFrame = new cc.SpriteFrame(texture);
            } else {
                console.log("加载头像失败！");
            }
        });
    }
});
