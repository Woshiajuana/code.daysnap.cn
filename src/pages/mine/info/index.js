//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage                      from 'wow-wx/lib/page'
import DataMixin                    from './data.mixin'

WowPage({
    mixins: [
        DataMixin,
        WowPage.wow$.mixins.user,
        WowPage.wow$.mixins.input,
        WowPage.wow$.mixins.router,
    ],
    onLoad (options) {
        this.userGet();
        this.routerGetParams(options);
        this.assignmentData();
        this.reqUserInfo();
    },
    assignmentData () {
        let { date } = this.wow$.utils;
        this.setData({ 'formData.Brithday.end': date.formatData('yyyy-MM-dd') });
    },
    // 保存提交
    handleSubmit () {
        let { valid } = this.wow$.utils;
        let { formData, params$ } = this.data;
        if (valid.check(formData)) return null;
        let data = valid.input(formData);
        console.log(data);
        let { http } = this.wow$.plugins;
        http(http.API.DO_SUB_USER_INFO, data).then((res) => {
            let { to } = params$;
            to ? this.routerPush(to, {}, true) : this.routerPop();
        }).toast();
    },
    reqUserInfo () {
        let { http } = this.wow$.plugins;
        let { valid, date } = this.wow$.utils;
        let { formData } = this.data;
        http(http.API.REQ_USER_INFO).then((res) => {
            if (res.Brithday)
                res.Brithday = date.formatTime(res.Brithday);
            valid.assignment(this, res, formData);
        }).toast();
    },
});

