//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage                      from 'wow-wx/lib/page'

WowPage({
    mixins: [
        WowPage.wow$.mixins.user,
        WowPage.wow$.mixins.router,
        WowPage.wow$.mixins.jigsaw,
    ],
    onLoad (options) {
        this.init({
            level: 8,  // 级别
            url: 'https://img1.mukewang.com/szimg/5d1032ab08719e0906000338.jpg', // 图片
        });
    },
});

