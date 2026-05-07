Page({
  data: {
    cartItems: [],
    selectAll: false,
    totalPrice: '0.00',
    selectedCount: 0
  },
  onShow() {
    this.loadCart()
  },
  loadCart() {
    const items = wx.getStorageSync('cart') || []
    const selectAll = items.length > 0 && items.every(item => item.selected)
    
    const selectedItems = items.filter(item => item.selected)
    const totalPrice = selectedItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0)
    const selectedCount = selectedItems.reduce((sum, item) => sum + (item.quantity || 1), 0)
    
    this.setData({
      cartItems: items,
      selectAll: selectAll,
      totalPrice: totalPrice.toFixed(2),
      selectedCount: selectedCount
    })
    console.log('Cart loaded:', items)
  },
  toggleSelect(e: any) {
    const id = e.currentTarget.dataset.id
    const items = wx.getStorageSync('cart') || []
    const item = items.find((i: any) => i.id === id)
    if (item) {
      item.selected = !item.selected
      wx.setStorageSync('cart', items)
    }
    this.loadCart()
  },
  toggleSelectAll() {
    const selectAll = !this.data.selectAll
    const items = wx.getStorageSync('cart') || []
    items.forEach((item: any) => {
      item.selected = selectAll
    })
    wx.setStorageSync('cart', items)
    this.loadCart()
  },
  increase(e: any) {
    const id = e.currentTarget.dataset.id
    const items = wx.getStorageSync('cart') || []
    const item = items.find((i: any) => i.id === id)
    if (item) {
      item.quantity = (item.quantity || 1) + 1
      wx.setStorageSync('cart', items)
    }
    this.loadCart()
  },
  decrease(e: any) {
    const id = e.currentTarget.dataset.id
    const items = wx.getStorageSync('cart') || []
    const item = items.find((i: any) => i.id === id)
    if (item && (item.quantity || 1) > 1) {
      item.quantity = (item.quantity || 1) - 1
      wx.setStorageSync('cart', items)
    }
    this.loadCart()
  },
  deleteItem(e: any) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认删除',
      content: '确定要删除该商品吗？',
      success: (res) => {
        if (res.confirm) {
          const items = wx.getStorageSync('cart') || []
          const filtered = items.filter((item: any) => item.id !== id)
          wx.setStorageSync('cart', filtered)
          this.loadCart()
        }
      }
    })
  },
  goShopping() {
    wx.switchTab({
      url: '/pages/products/products'
    })
  },
  goCheckout() {
    const selectedItems = (wx.getStorageSync('cart') || []).filter((item: any) => item.selected)
    if (selectedItems.length === 0) {
      wx.showToast({ title: '请选择商品', icon: 'none' })
      return
    }
    wx.navigateTo({
      url: '/pages/products/checkout/checkout'
    })
  }
})
