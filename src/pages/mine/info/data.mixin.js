
export default {
    data: {
        formData: {
            Height: {
                label: '身高',
                placeholder: '请输入您的身高',
                value: '',
                key: 'formData.Height',
                type: 'digit',
                mode: 'input',
                max: 6,
                use: [
                    {
                        nonempty: true,
                        prompt: '请输入您的身高'
                    }
                ],
                unit: 'cm',
            },
            Weight: {
                label: '体重',
                placeholder: '请输入您的体重',
                value: '',
                key: 'formData.Weight',
                type: 'digit',
                mode: 'input',
                max: 6,
                use: [
                    {
                        nonempty: true,
                        prompt: '请输入您的体重'
                    }
                ],
                unit: 'kg',
            },
            RedProtein: {
                label: '糖化血红蛋白值',
                placeholder: '请输入糖化血红蛋白值(选填)',
                type: 'digit',
                value: '',
                mode: 'input',
                key: 'formData.RedProtein',
            },
            LowSugar: {
                label: '是否有过低血糖',
                value: true,
                key: 'formData.LowSugar',
                mode: 'radio',
                useRadio: [
                    {
                        label: '是',
                        value: true,
                    },
                    {
                        label: '否',
                        value: false,
                    }
                ]
            },
            Name: {
                label: '姓名',
                placeholder: '请输入您的姓名',
                value: '',
                key: 'formData.Name',
                mode: 'input',
                use: [
                    {
                        nonempty: true,
                        prompt: '请输入您的姓名'
                    }
                ]
            },
            Sex: {
                label: '性别',
                value: 1,
                key: 'formData.Sex',
                mode: 'radio',
                useRadio: [
                    {
                        label: '男',
                        value: 1,
                    },
                    {
                        label: '女',
                        value: 2,
                    }
                ]
            },
            Brithday: {
                value: '',
                type: 'date',
                key: 'formData.Brithday',
                placeholder: '请选择您的出生年月',
                label: '出生年月',
                mode: 'picker',
                start: '1901-01-01',
                end: '',
                use: [
                    {
                        nonempty: true,
                        prompt: '请选择您的出生年月'
                    }
                ]
            },
        },
    }
}
