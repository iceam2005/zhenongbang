import { P } from '../../utils/placeholders'

Component({
  data: {
    avatarUrl: P.userAvatar()
  },
  methods: {
    goToOrders() {
      wx.showToast({
        title: '我的订单',
        icon: 'none'
      })
    },
    goToCart() {
      wx.switchTab({
        url: '/pages/products/products'
      })
    },
    goToFavorites() {
      wx.showToast({
        title: '我的收藏',
        icon: 'none'
      })
    },
    goToMessages() {
      wx.showToast({
        title: '消息通知',
        icon: 'none'
      })
    },
    goToSupply() {
      wx.switchTab({
        url: '/pages/market/market'
      })
    },
    goToDemand() {
      wx.switchTab({
        url: '/pages/market/market'
      })
    },
    goToActivities() {
      wx.switchTab({
        url: '/pages/activities/activities'
      })
    },
    goToCoupons() {
      wx.showToast({
        title: '优惠券',
        icon: 'none'
      })
    },
    goToHelp() {
      wx.showToast({
        title: '帮助中心',
        icon: 'none'
      })
    },
    goToSettings() {
      wx.showToast({
        title: '设置',
        icon: 'none'
      })
    }
  }
})