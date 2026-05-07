Page({
  data: {
    address: {
      name: '张三',
      phone: '13800138000',
      province: '广东省',
      city: '深圳市',
      district: '南山区',
      detail: '科技园路1号'
    },
    orderItems: [],
    goodsAmount: 0,
    freight: 0,
    discount: 0,
    totalAmount: '0.00'
  },
  onShow() {
    this.loadOrderItems()
  },
  loadOrderItems() {
    const selectedItems = (wx.getStorageSync('cart') || []).filter((item: any) => item.selected)
    const goodsAmount = selectedItems.reduce((sum: number, item: any) => sum + (item.price || 0) * (item.quantity || 1), 0)
    const totalAmount = (goodsAmount + this.data.freight - this.data.discount).toFixed(2)
    
    this.setData({
      orderItems: selectedItems,
      goodsAmount: goodsAmount,
      totalAmount: totalAmount
    })
    console.log('Order items loaded:', selectedItems)
    console.log('Total amount:', totalAmount)
  },
  selectAddress() {
    wx.showToast({
      title: '地址选择功能开发中',
      icon: 'none'
    })
  },
  addAddress() {
    wx.showModal({
      title: '添加收货地址',
      editable: true,
      placeholderText: '请输入收货地址',
      success: (res) => {
        if (res.confirm && res.content) {
          const address = {
            name: '用户',
            phone: '13800000000',
            province: '',
            city: '',
            district: '',
            detail: res.content
          }
          this.setData({ address: address })
          wx.showToast({ title: '地址已保存', icon: 'success' })
        }
      }
    })
  },
  submitOrder() {
    if (!this.data.address || !this.data.address.detail) {
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

      wx.showModal({
        title: '支付成功！',
        content: '订单已提交，感谢您的购买',
        showCancel: false,
        success: () => {
          wx.setStorageSync('cart', [])
          wx.switchTab({
            url: '/pages/mine/mine'
          })
        }
      })
    }, 1500)
  }
})
