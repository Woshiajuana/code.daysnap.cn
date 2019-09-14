//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage                      from 'wow-wx/lib/page'

WowPage({
    mixins: [
        WowPage.wow$.mixins.base,
        WowPage.wow$.mixins.user,
        WowPage.wow$.mixins.router,
        WowPage.wow$.mixins.jump,
        WowPage.wow$.mixins.sync,
        WowPage.wow$.mixins.input,
    ],
    data: {
        isConfirm: true,
        objData: {},
        objParams: { from: 'bluetooth_index' },
    },
    onShow () {
        this.userGet();
        this.assignmentData();
    },
    assignmentData () {
        let { $BLUE_TOOTH_DATA } = this.wow$.config.store;
        this.wow$.plugins.store.get($BLUE_TOOTH_DATA).then((res) => {
            let { objData } = this.data;
            objData = res[0];
            objData.Bloodsugar = objData.Bloodsugar ? (+objData.Bloodsugar).toFixed(1) : objData.Bloodsugar;
            this.setData({ objData });
        }).catch((err) => {
            console.log('assignmentData', err)
        });
    },
    handleConfirm () {
        let { $BLUE_TOOTH_DEVICE_ID_LIST } = this.wow$.config.store;
        this.wow$.plugins.store.get($BLUE_TOOTH_DEVICE_ID_LIST).then((res) => {
            this.handleSync();
        }).catch((err) => {
            this.setData({ isConfirm: false });
        });
    },
    handleJump (event) {
        this.setData({ isConfirm: true });
        let { url, params = {} } = event.currentTarget.dataset;
        this.routerPush(url, params);
    },
});

