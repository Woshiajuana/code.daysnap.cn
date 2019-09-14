
export default {

    // 登录
    DO_USER_LOGIN: 'WechatApi/UserLogin',

    // 首页
    REQ_INDEX_SUGAR: 'RocheApi/GetIndexSugar',

    // 个人中心
    REQ_MINE_SUGAR: 'RocheApi/GetUserSugar',

    // 个人信息提交
    DO_SUB_USER_INFO: 'RocheApi/SetUserInfo',

    // 获取用户信息
    REQ_USER_INFO: 'RocheApi/SetUserInfo',

    // 血糖日志
    REQ_JOURNAL_RECORD_LIST: 'RocheApi/GetBloodsugarTestRecordLogList',

    // 记录血糖，验证是否当前时间段是否有数据
    REQ_CHECK_SUGAR: 'RocheApi/GetTestSugar',

    // 记录血糖
    DO_SUB_SUGAR: 'RocheApi/SetTestSugar',

    // 每月测糖完成记录
    REQ_RECORD_MONTH: 'RocheApi/GetTestMonth',

    // 血糖周报
    REQ_REPORT_WEEK_INFO: 'RocheApi/GetWeekReport',

    // 血糖月报
    REQ_REPORT_MONTH_INFO: 'RocheApi/GetMonthReport',

    // 蓝牙数据传输
    DD_TRANSFER_DATA: 'RocheApi/SetTestSugarList',

    // 测糖计划
    REQ_PLAN_INFO: 'RocheApi/GetRecommendSugar',

    // 获取趋势图
    REQ_SUGAR_TREND: 'RocheApi/GetSugarTrend',

    // 蜘蛛图
    REQ_SUGAR_SPIDER: 'RocheApi/GetSpider',


}
