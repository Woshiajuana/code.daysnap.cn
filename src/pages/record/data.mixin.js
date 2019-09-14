
import {
    ARR_TIME_STEP,
    ARR_TIME_STEP_KEY,
}                                   from 'config/base.config'
import { formatData }               from 'wow-cool/lib/date.lib'

export default {
    data: {
        objInput: {
            TestDate: {
                type: 'date',
                label: '测量日期',
                key: 'objInput.TestDate',
                placeholder: '请输入',
                value: formatData('yyyy-MM-dd', new Date()),
                mode: 'picker',
                end: formatData('yyyy-MM-dd', new Date()),
                use: [
                    {
                        nonempty: true,
                        prompt: '请输入测量日期'
                    }
                ]
            },
            TestTime: {
                type: 'time',
                label: '测量时间',
                key: 'objInput.TestTime',
                placeholder: '请输入',
                value: formatData('hh:mm', new Date()),
                mode: 'picker',
                start: '',
                end: '',
                use: [
                    {
                        nonempty: true,
                        prompt: '请输入测量时间'
                    }
                ]
            },
            Remark: {
                type: 'text',
                label: '备注',
                placeholder: '请输入',
                value: '',
                mode: 'input',
                key: 'objInput.Remark',
            },
        },
        arrRuler: 151,
        timeStep: '',
        objHidden: {
            Bloodsugar: {
                value: '6.0',
                use: [
                    {
                        nonempty: true,
                        prompt: '请输入当前血糖值'
                    }
                ]
            },
        },
        ruleWidth: 0,
        scrollLeft: 0,
        timeScrollLeft: 0,
    },
}
