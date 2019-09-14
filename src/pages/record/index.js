//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage                      from 'wow-wx/lib/page'
import { formatData }               from 'wow-cool/lib/date.lib'
import WowCool                      from 'wow-cool/lib/array.lib'
import DataMixin                    from './data.mixin'
import {
    ARR_TIME_STEP,
    ARR_TIME_STEP_KEY,
}                                   from 'config/base.config'

let deltaX;

WowPage({
    mixins: [
        DataMixin,
        WowPage.wow$.mixins.router,
        WowPage.wow$.mixins.base,
        WowPage.wow$.mixins.input,
    ],
    onShow() {
        this.setData({
            'objInput.TestDate.value': formatData('yyyy-MM-dd'),
            'objInput.TestDate.end': formatData('yyyy-MM-dd'),
            'objInput.TestTime.value': formatData('hh:mm'),
            'objInput.TestTime.end': formatData('hh:mm'),
        });
        this.assignmentData();
    },
    onReady () {
        deltaX = 0;
        let query = wx.createSelectorQuery();
        query.select('.rule-item').boundingClientRect((rect) => {
            let {width} = rect;
            this.setData({ ruleWidth: width });
            this.countScrollLeft();
        }).exec();
    },
    assignmentData () {
        let time = this.data.objInput.TestTime.value;
        let index = this.judgeTimeStep(time);
        this.setStartAndEnd(index, time);
    },
    judgeTimeStep (time = '') {
        time = time || formatData('hh:dd');
        let cur = +time.replace(':', '');
        let index = WowCool.findFirstIndexForArr(ARR_TIME_STEP_KEY, (item) => {
            let { start, end } = item;
            start = +start.replace(':', '');
            end = +end.replace(':', '');
            return (cur >= start && cur <= end);
        });
        if (index > 4) this.setData({timeScrollLeft: 500});
        if (index < 3) this.setData({timeScrollLeft: 0});
        this.setData({
            timeStep: ARR_TIME_STEP[index]
        });
        return index;
    },
    setStartAndEnd (index, value) {
        let { start, end } = ARR_TIME_STEP_KEY[index];
        this.setData({
            'objInput.TestTime.value': value || start,
        });
    },
    countScrollLeft () {
        let value = +this.data.objHidden.Bloodsugar.value;
        let width = this.data.ruleWidth;
        let num = (2 / (width * 10));
        let scrollLeft = Math.floor(value / num);
        this.setData({ scrollLeft });
    },
    handleScroll (e) {
        let { detail } = e;
        deltaX += detail.deltaX;
        this.countNum(Math.abs(deltaX));
    },
    // 加减
    handleAddOrSub (e) {
        let { currentTarget } = e;
        let type = currentTarget.dataset.type || '1';
        let value = +this.data.objHidden.Bloodsugar.value || 0;
        value = +value;
        if (type === '0' && value > 0) {
            value = (value * 10 - 1) / 10;
        }
        if ( type === '1' && value < 30) {
            value = (value * 10 + 1) / 10;
        }
        if (value !== 0) value = value.toFixed(1);
        this.setData({ 'objHidden.Bloodsugar.value': value });
        this.countScrollLeft();
    },
    countNum (scrollLeft) {
        let value = 0;
        if (+scrollLeft !== 0) {
            let width = this.data.ruleWidth;
            let num = (2 / (width * 10));
            value = ((num * 100 * scrollLeft) / 100).toFixed(1);
        }
        this.setData({ 'objHidden.Bloodsugar.value': value });
    },
    // 保存提交
    handleSubmit(e) {
        let { valid } = this.wow$.utils;
        let { modal } = this.wow$.plugins;
        let { objInput, objHidden, base$, timeStep } = this.data;
        if (valid.check(objInput)) return null;
        if (valid.check(objHidden)) return null;
        let data = valid.input(objInput, objHidden);
        data.TimeStep = base$.arrStage.indexOf(timeStep) + 1;
        console.log(data);
        let { http } = this.wow$.plugins;
        http(http.API.REQ_CHECK_SUGAR, data).then((res) => {
            let { Id } = res;
            Id > 0
                ? modal.confirm('您今日已有相同监测点的血糖记录了，' +
                '如需更新请点击确认').then((res) => {
                    let { cancel, confirm } = res;
                    confirm && this.doSubSugar(data);
                })
                : this.doSubSugar(data);
        }).toast();

    },
    doSubSugar (data) {
        let { http } = this.wow$.plugins;
        http(http.API.DO_SUB_SUGAR, data).then((res) => {
            this.routerPush('record_result_index', {...res, ...data});
        }).toast();
    }
});

