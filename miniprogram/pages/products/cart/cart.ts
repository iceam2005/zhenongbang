import { cartUtil } from '../../../utils/cart'

Component({
  data: {
    cartItems: [] as Array<{
      id: number
      name: string
      spec: string
      price: number
      count: number
      selected: boolean
      image: string
    }>,
    selectAll: false
  },
  computed: {
    totalPrice(): number {
      return cartUtil.getTotalPrice().toFixed(2) as any
    },
    selectedCount(): number {
      return cartUtil.getSelectedCount()
    }
  },
  onShow() {
    this.loadCart()
  },
  methods: {
    loadCart() {
      const items = cartUtil.getCart()
      this.setData({
        cartItems: items,
        selectAll: items.length > 0 && items.every(item => item.selected)
      })
    },
    toggleSelect(e: any) {
      const id = e.currentTarget.dataset.id
      cartUtil.toggleSelect(id)
      this.loadCart()
    },
    toggleSelectAll() {
      const selectAll = !this.data.selectAll
      cartUtil.toggleSelectAll(selectAll)
      this.loadCart()
    },
    increase(e: any) {
      const id = e.currentTarget.dataset.id
      const items = cartUtil.getCart()
      const item = items.find(i => i.id === id)
      if (item) {
        cartUtil.updateCount(id, item.count + 1)
        this.loadCart()
      }
    },
    decrease(e: any) {
      const id = e.currentTarget.dataset.id
      const items = cartUtil.getCart()
      const item = items.find(i => i.id === id)
      if (item && item.count > 1) {
        cartUtil.updateCount(id, item.count - 1)
        this.loadCart()
      }
    },
    deleteItem(e: any) {
      const id = e.currentTarget.dataset.id
      wx.showModal({
        title: '确认删除',
        content: '确定要删除该商品吗？',
        success: (res) => {
          if (res.confirm) {
            cartUtil.removeItem(id)
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
      const selectedItems = cartUtil.getSelectedItems()
      if (selectedItems.length === 0) {
        wx.showToast({ title: '请选择商品', icon: 'none' })
        return
      }
      wx.navigateTo({
        url: '/pages/products/checkout/checkout'
      })
    }
  }
})
