import { cartUtil } from '../../../utils/cart'

Component({
  data: {
    address: {
      name: '张三',
      phone: '13800138000',
      province: '广东省',
      city: '深圳市',
      district: '南山区',
      detail: '科技园路1号'
    },
    orderItems: [] as Array<{
      id: number
      name: string
      spec: string
      price: number
      count: number
      image: string
    }>,
    goodsAmount: 0,
    freight: 0,
    discount: 0
  },
  computed: {
    totalAmount(): string {
      return (this.data.goodsAmount + this.data.freight - this.data.discount).toFixed(2)
    }
  },
  onShow() {
    this.loadOrderItems()
  },
  methods: {
    loadOrderItems() {
      const selectedItems = cartUtil.getSelectedItems()
      const goodsAmount = selectedItems.reduce((sum, item) => sum + item.price * item.count, 0)
      this.setData({
        orderItems: selectedItems,
        goodsAmount: goodsAmount
      })
    },
    selectAddress() {
      wx.showToast({
        title: '地址选择功能开发中',
        icon: 'none'
      })
    },
    submitOrder() {
      if (!this.data.address) {
        wx.showToast({ title: '请添加收货地址', icon: 'none' })
        return
      }

      wx.showModal({
        title: '确认支付',
        content: `确定要支付 ¥${this.data.totalAmount} 吗？`,
        confirmText: '支付',
        success: (res) => {
          if (res.confirm) {
            this.processPayment()
          }
        }
      })
    },
    processPayment() {
      wx.showLoading({ title: '正在发起支付...' })

      setTimeout(() => {
        wx.hideLoading()

        wx.requestPayment({
          timeStamp: Date.now().toString(),
          nonceStr: 'random' + Math.random(),
          package: 'prepay_id=wx' + Date.now(),
          signType: 'MD5',
          paySign: 'mock_pay_sign',
          success: () => {
            cartUtil.clearCart()
            wx.showToast({
              title: '支付成功！',
              icon: 'success'
            })
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/mine/mine'
              })
            }, 1500)
          },
          fail: (err) => {
            wx.showToast({
              title: '支付失败',
              icon: 'none'
            })
          }
        })
      }, 1500)
    }
  }
})
