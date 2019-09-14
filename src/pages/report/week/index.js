//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage                      from 'wow-wx/lib/page'
let type = false;
WowPage({
    mixins: [
        WowPage.wow$.mixins.base,
    ],
    data: {
        arrArrPlan: [],
        curTime: new Date().getTime(),
        weekReport: {},
        isCurWeek: true,
        sTime: '',
        eTime: '',
        vSTime2: '',
        vETime2: '',
    },
    onLoad () {
        this.setData({ curTime: new Date().getTime() });
        this.assignmentData();
        this.getDay();
        this.reqPlanInfo();
        this.reqReportWeekInfo();
    },
    // 上下周
    handlePreOrNext (e) {
        if (type) return;
        type = true;
        let { modal } = this.wow$.plugins;
        setTimeout(() => {type = false}, 1000);
        let { currentTarget } = e;
        let count = +currentTarget.dataset.count;
        let date = new Date(this.data.curTime);
        date.setDate(date.getDate() + count);
        let curTime = date.getTime();
        let { sTime, eTime } = this.getDay(new Date().getTime());
        let endTime = new Date(eTime.replace(/-/g, '\/') + ' 23:59:59').getTime();
        let strTime = new Date(sTime.replace(/-/g, '\/') + ' 00:00:00').getTime();
        if (curTime > endTime) return modal.toast('下一周还没开始哦');
        this.setData({
            curTime,
            isCurWeek: (curTime < endTime && curTime > strTime),
        });
        this.getDay();
        this.assignmentData();
        this.reqPlanInfo();
        this.reqReportWeekInfo();
    },
    assignmentData () {
        let result = [];
        for(let x = 0; x < 7; x++){
            result[x] = [];
            for(let y = 0; y < 8; y++){
                if (y === 0) {
                    result[x][y] = x % 7;
                } else {
                    result[x][y] = 0;
                }
            }
        }
        this.setData({ arrArrPlan: result });
        console.log(result)
    },
    reqReportWeekInfo () {
        let { http, modal } = this.wow$.plugins;
        let { sTime, eTime, weekReport } = this.data;
        http(http.API.REQ_REPORT_WEEK_INFO, {
            Stime: sTime,
            Etime: eTime,
        }).then((res) => {
            weekReport = res || {};
        }).catch((err) => {
            modal.toast(err);
            weekReport = {};
        }).finally(() => {
            this.setData({ weekReport })
        });
    },

    reqPlanInfo () {
        let { http } = this.wow$.plugins;
        let { sTime, eTime } = this.data;
        http(http.API.REQ_PLAN_INFO, {
            Stime: sTime,
            Etime: eTime,
            Type: 2,
        }).then((res) => {
            let { arrArrPlan } = this.data;
            let { Steps } = res;
            if (Steps) {
                Steps.forEach((item) => {
                    let { Day, TimeStep, Bloodsugar, Gls} = item;
                    if (TimeStep === 0) TimeStep = 1;
                    arrArrPlan[TimeStep-1][Day] = {
                        ...item,
                        type: Gls === 3 ? 'nor' : Gls < 3 ? 'low' : 'up',
                        Bloodsugar: item.Bloodsugar && item.Bloodsugar.toFixed(1),
                    };
                });
            }
            console.log(Steps)
            console.log(arrArrPlan)
            this.setData({ objPlan: res, arrArrPlan });
        }).toast();
    },

    getDay (cTime) {
        let { date } = this.wow$.utils;
        let curTime = cTime || this.data.curTime;
        let curDate = new Date(curTime);
        let day = curDate.getDay();
        let result = '';
        switch (day){
            case 0:
                result = {
                    sTime: date.getDate(-6, 'yyyy-MM-dd', new Date(curTime)),
                    eTime: date.getDate(0, 'yyyy-MM-dd', new Date(curTime)),
                };
                break;
            case 1:
                result = {
                    sTime: date.getDate(0, 'yyyy-MM-dd', new Date(curTime)),
                    eTime: date.getDate(6, 'yyyy-MM-dd', new Date(curTime)),
                };
                break;
            case 2:
                result = {
                    sTime: date.getDate(-1, 'yyyy-MM-dd', new Date(curTime)),
                    eTime: date.getDate(5, 'yyyy-MM-dd', new Date(curTime)),
                };
                break;
            case 3:
                result = {
                    sTime: date.getDate(-2, 'yyyy-MM-dd', new Date(curTime)),
                    eTime: date.getDate(4, 'yyyy-MM-dd', new Date(curTime)),
                };
                break;
            case 4:
                result = {
                    sTime: date.getDate(-3, 'yyyy-MM-dd', new Date(curTime)),
                    eTime: date.getDate(3, 'yyyy-MM-dd', new Date(curTime)),
                };
                break;
            case 5:
                result = {
                    sTime: date.getDate(-4, 'yyyy-MM-dd', new Date(curTime)),
                    eTime: date.getDate(2, 'yyyy-MM-dd', new Date(curTime)),
                };
                break;
            case 6:
                result = {
                    sTime: date.getDate(-5, 'yyyy-MM-dd', new Date(curTime)),
                    eTime: date.getDate(1, 'yyyy-MM-dd', new Date(curTime)),
                };
                break;
        }
        let {sTime, eTime} = result;
        console.log(result)
        if (!cTime) {
            this.setData( {
                sTime,
                eTime,
                vSTime2: date.formatData('MM月dd日', new Date(sTime)),
                vETime2: date.formatData('MM月dd日', new Date(eTime)),
            });
        }
        return result;
    },
});

