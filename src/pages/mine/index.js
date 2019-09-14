//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage                      from 'wow-wx/lib/page'

WowPage({
    mixins: [
        WowPage.wow$.mixins.user,
        WowPage.wow$.mixins.router,
        WowPage.wow$.mixins.jump,
    ],
    data: {
        objData: {},
    },
    onShow () {
        this.userGet();
        this.reqMineSugar();
    },
    handleConfirm (event) {
        let { url } = event.currentTarget.dataset;
        let { IsPerfect } = this.data.objData;
        IsPerfect ? this.handleJump(event) : this.routerPush('mine_info_index', { to: url });
    },
    reqMineSugar () {
        let { http } = this.wow$.plugins;
        http(http.API.REQ_MINE_SUGAR).then((res) => {
            this.setData({ objData: res });
        }).toast();
    },
});

