Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: '/pages/index/index',
        text: '首页',
        emoji: '🏠'
      },
      {
        pagePath: '/pages/market/market',
        text: '产销对接',
        emoji: '🤝'
      },
      {
        pagePath: '/pages/products/products',
        text: '产品城',
        emoji: '🏪'
      },
      {
        pagePath: '/pages/activities/activities',
        text: '研学活动',
        emoji: '🎯'
      },
      {
        pagePath: '/pages/mine/mine',
        text: '我的',
        emoji: '👤'
      }
    ]
  },
  attached() {
    this.updateSelected()
  },
  methods: {
    updateSelected() {
      const app = getApp()
      const currentPage = getCurrentPages()
      if (currentPage.length > 0) {
        const path = '/' + currentPage[currentPage.length - 1].route
        const selected = this.data.list.findIndex(item => item.pagePath === path)
        if (selected !== -1) {
          this.setData({ selected })
        }
      }
    },
    switchTab(e: any) {
      const index = e.currentTarget.dataset.index
      const item = this.data.list[index]
      
      if (this.data.selected !== index) {
        this.setData({ selected: index })
        
        wx.switchTab({
          url: item.pagePath
        })
      }
    }
  }
})
