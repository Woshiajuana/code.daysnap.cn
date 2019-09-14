//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage                      from 'wow-wx/lib/page'

WowPage({
    mixins: [
        WowPage.wow$.mixins.user,
        WowPage.wow$.mixins.base,
        WowPage.wow$.mixins.jump,
        WowPage.wow$.mixins.router,
    ],
    data: {
        arrArrPlan: [],
        objData: {},
        objPlan: {},
    },
    onLoad () {
        this.assignmentData();
    },
    onShow () {
        this.userGet();
        this.reqIndexSugar();
        this.reqPlanInfo();
    },
    reqIndexSugar () {
        let { http } = this.wow$.plugins;
        http(http.API.REQ_INDEX_SUGAR).then((res) => {
            this.setData({ objData: res });
        }).toast();
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
    reqPlanInfo () {
        let { http } = this.wow$.plugins;
        let { date } = this.wow$.utils;
        let Stime = date.getDate(0, 'yyyy-MM-dd');
        let Etime = date.getDate(6, 'yyyy-MM-dd');
        http(http.API.REQ_PLAN_INFO, {
            Stime,
            Etime,
            Type: 1,
        }).then((res) => {
            let { arrArrPlan } = this.data;
            let Steps = res.Steps || [];
            Steps.forEach((item) => {
                let { Day, TimeStep } = item;
                arrArrPlan[TimeStep-1][Day] = 1;
            });
            console.log(arrArrPlan)
            this.setData({ objPlan: res, arrArrPlan });
        }).toast();
    },
});

