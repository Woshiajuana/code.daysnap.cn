//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage                      from 'wow-wx/lib/page'

WowPage({
    mixins: [
        WowPage.wow$.mixins.base,
    ],
    data: {
        arrList: [],
        PageIndex: 1,
        PageSize: 10,
        Count: 0,
    },
    onShow () {
        console.log(this.wow$)
        this.setData({PageIndex: 1});
        this.reqJournalList();
    },
    handleScrollToLower () {
        console.log(1)
        let { PageIndex, Count, arrList} = this.data;
        if (arrList.length >= Count) return null;
        PageIndex++;
        this.setData({PageIndex});
        this.reqJournalList();
    },
    reqJournalList () {
        let { PageIndex, PageSize, arrList } = this.data;
        let { http } = this.wow$.plugins;
        return http(http.API.REQ_JOURNAL_RECORD_LIST, {
            PageIndex,
            PageSize,
        }).then((res) => {
            let { Count = '', Data = []} = res || {};
            arrList = [...arrList, ...Data];
            this.setData({ Count, arrList });
        }).toast();
    },
});

