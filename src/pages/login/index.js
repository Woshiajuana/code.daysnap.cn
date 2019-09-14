//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage                      from 'wow-wx/lib/page'

WowPage({
    mixins: [
        WowPage.wow$.mixins.user,
        WowPage.wow$.mixins.router,
    ],
    data: {
        isLoading: true,
        sceneid: '',
    },
    onLoad (options) {
        console.log('入口页 options =>', options);
        this.assignmentData(options);
        this.judgeUserLoginStatus();
    },
    // 赋值
    assignmentData (options) {
        let { sceneid, to, params } = options;
        if (options.scene) sceneid = decodeURIComponent(options.scene);
        typeof sceneid === 'undefined' && (sceneid = '');
        typeof to === 'undefined' && (to = '');
        typeof params === 'undefined' && (params = '');
        this.setData({ sceneid, to, params });
    },
    judgeUserLoginStatus () {
        this.userGet().then((res) => {
            this.routerRoot('home_index');
        }).catch((err) => {
            this.setData({ isLoading: false });
        });
    },
    handleGetUser (event) {
        let { userInfo } = event.detail;
        if (!userInfo) return null;
        this.userLogin().then((code) => {
            let { nickName, avatarUrl } = userInfo;
            let { http } = this.wow$.plugins;
            return http(http.API.DO_USER_LOGIN, {
                code,
                NickName: nickName,
                AvatarUrl: avatarUrl,
                sceneid: this.data.sceneid,
            }, {
                useAuth: false,
            });
        }).then((res) => {
            return this.userUpdate({...userInfo, ...res});
        }).then(() => {
            this.routerRoot('home_index');
        }).toast();
    },
});

