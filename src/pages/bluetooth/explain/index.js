//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage                      from 'wow-wx/lib/page'

WowPage({
    mixins: [
        WowPage.wow$.mixins.router,
        WowPage.wow$.mixins.jump,
    ],
    handleAdded (event) {
        let { authorize, modal } = this.wow$.plugins;
        authorize(authorize.SCOPE.userLocation, '添加设备需要地理位置授权').then(() => {
            this.handleJump(event);
        }).catch(() => {
            modal.toast('连接设备需要授权哦');
        });
    },
});

