//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage                      from 'wow-wx/lib/page'

WowPage({
    mixins: [
        WowPage.wow$.mixins.router,
        WowPage.wow$.mixins.jump,
        WowPage.wow$.mixins.sync,
    ],
    data: {
        objBlueTooth: '',
    },
    onLoad () {
        this.searchRoche();
    },
    searchRoche () {
        let { sdk } = this.wow$.services;
        let { objBlueTooth } = this.data;
        sdk.searchRoche().then((res) => {
            objBlueTooth = res || '';
        }).catch(this.errorHandle.bind(this)).finally(() => {
            this.setData({ objBlueTooth });
        });
    },
    confirmOpen () {
        let { modal } = this.wow$.plugins;
        modal.confirm({
            content: '链接设备需要打开蓝牙，请确认手机蓝牙是否已打开？',
        }).then((res) => {
            let { cancel, confirm } = res;
            setTimeout( () => {
                confirm && this.searchRoche();
            }, 1000);
            cancel && this.routerPop();
        });
    },
    handlePairRoche () {
        let { deviceId } = this.data.objBlueTooth;
        let { modal, loading, store} = this.wow$.plugins;
        if (!deviceId) {
            modal.toast('没有发现设备，请先搜索设备');
            this.setData({ objBlueTooth: '' });
            return this.searchRoche();
        }
        let { sdk } = this.wow$.services;
        loading.show();
        let result = {};
        sdk.pairRoche(deviceId).then((res) => {
            result = { errCode: 0 };
        }).catch(this.errorHandle.bind(this)).finally(() => {
            loading.hide();
            let { errCode } = result;
            if (errCode !== 0 && errCode !== -1)
                return modal.toast(result);
            modal.confirm({
                content: '是否配对成功？',
            }).then((res) => {
                let { confirm } = res;
                let { $BLUE_TOOTH_DEVICE_ID_LIST } = this.wow$.config.store;
                confirm && store.set($BLUE_TOOTH_DEVICE_ID_LIST, [this.data.objBlueTooth]);
                confirm && this.routerPush('bluetooth_transfer_index', { from: 'bluetooth_added_index'});
            });
        })
    },
});

