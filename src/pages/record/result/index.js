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
    ],
    data: {
        objCalendar: {},
        objData: {},
        curDate: '',
    },
    onLoad (options) {
        this.routerGetParams(options);
        this.userGet();
        this.assignmentData();
        this.reqRecordMonth();
    },
    assignmentData () {
        let { calendar } = this.wow$.utils;
        let { curDate, nextDate, objCalendar } = this.data;
        objCalendar = calendar({curDate: curDate ? new Date(curDate) : ''});
        curDate = objCalendar.date;
        nextDate = calendar.getNextMonth(curDate);
        this.setData({ curDate, objCalendar });
    },
    reqRecordMonth () {
        let { http } = this.wow$.plugins;
        http(http.API.REQ_RECORD_MONTH).then((res) => {
            let { Records } = res;
            let records = [];
            Records.forEach((item) => {
                let time = +item.replace(/[^0-9]/ig, '');
                let day = new Date(time).getDate();
                records.indexOf(day) === -1 && records.push(day);
            });
            let { objCalendar } = this.data;
            objCalendar.data.forEach((item) => {
                item.forEach((ite) => {
                    records.forEach((it) => {
                        !ite.disabled && ite.text === it && (ite.value = 1)
                    })
                })
            });
            this.setData({ objData: res, objCalendar });
        }).toast();
    },
    // handlePrevMouth () {
    //     let { calendar } = this.wow$.utils;
    //     let { curDate } = this.data;
    //     curDate = calendar.getPreMonth(curDate);
    //     this.setData({ curDate });
    //     this.assignmentData();
    // },
    // handleNextMouth () {
    //     let { calendar } = this.wow$.utils;
    //     let { curDate } = this.data;
    //     curDate = calendar.getNextMonth(curDate);
    //     this.setData({ curDate });
    //     this.assignmentData();
    // },
});

