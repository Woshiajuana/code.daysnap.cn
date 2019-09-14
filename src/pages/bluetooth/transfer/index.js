//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage                      from 'wow-wx/lib/page'

WowPage({
    mixins: [
        WowPage.wow$.mixins.jump,
        WowPage.wow$.mixins.router,
        WowPage.wow$.mixins.sync,
    ],
    data: {
        numCurIndex: -1,
    },
    onLoad (options) {
        this.progressRun();
        this.routerGetParams(options);
    },
    progressRun () {
        let { numCurIndex } = this.data;
        numCurIndex++;
        if (numCurIndex >= 9) numCurIndex = 0;
        this.setData({ numCurIndex });
        setTimeout(this.progressRun.bind(this), 200);
    },
});

