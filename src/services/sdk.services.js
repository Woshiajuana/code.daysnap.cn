
import SDK                      from 'utils/sdk.util'
import Loading                  from 'wow-wx/plugins/loading.plugin'
import Authorize                from 'wow-wx/plugins/authorize.plugin'

export default {
    // 搜索
    searchRoche: () => new Promise((resolve, reject) => {
        Loading.showNav();
        Authorize(Authorize.SCOPE.userLocation).then(() => {
            SDK.searchRoche({
                success: (res) => {
                    resolve(res);
                },
                fail: (err) => {
                    reject(err);
                },
                complete: () => {
                    Loading.hideNav();
                }
            });
        }).catch((err) => {
            Loading.hideNav();
            reject(err);
        });
    }),

    // 配对
    pairRoche: (deviceId) => new Promise((resolve, reject) => {
        Loading.showNav();
        SDK.pair({
            deviceId,
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                Loading.hideNav();
            }
        });
    }),

    // 同步数据
    syncData: (deviceId) => new Promise((resolve, reject) => {
        Loading.showNav();
        SDK.syncData({
            deviceId,
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                Loading.hideNav();
            }
        });
    }),

    // 断开与设备的链接
    disconnectDevice: (deviceId) => new Promise((resolve, reject) => {
        Loading.showNav();
        SDK.disconnectDevice({
            deviceId,
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                Loading.hideNav();
            }
        });
    }),

    // 监听事件
    on(event_name, callback) {
        SDK.on(event_name, callback);
        return this;
    },

    // 取消事件
    off(event_name, callback) {
        SDK.off(event_name, callback);
        return this;
    },
}

export const EVENT_NAME = {
    ERROR: 'EVENT\_BLE\_TRANSFER\_FAILED',          // 异常
    END: 'EVENT\_BLE\_TRANSFER\_END',               // 成功结束
    CHANGE: 'EVENT\_BLE\_STATE\_CHANGE',            // 连接状态的改变事件
    INFO: 'EVENT\_GLYCEMIA\_DATA\_RECEIVED',        // 详情
    CONTEXT: 'EVENT\_GLYCEMIA\_CONTEXT\_RECEIVED',  // 附加信息
};
