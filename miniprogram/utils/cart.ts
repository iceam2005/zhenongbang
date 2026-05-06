const CART_KEY = 'eco_cart'

export interface CartItem {
  id: number
  name: string
  spec: string
  price: number
  count: number
  selected: boolean
  image: string
}

export const cartUtil = {
  getCart(): CartItem[] {
    try {
      const data = wx.getStorageSync(CART_KEY)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },

  setCart(items: CartItem[]): void {
    wx.setStorageSync(CART_KEY, JSON.stringify(items))
  },

  addItem(item: Omit<CartItem, 'count' | 'selected'>): void {
    const cart = this.getCart()
    const existing = cart.find(i => i.id === item.id)
    if (existing) {
      existing.count += 1
    } else {
      cart.push({ ...item, count: 1, selected: true })
    }
    this.setCart(cart)
  },

  removeItem(id: number): void {
    const cart = this.getCart().filter(item => item.id !== id)
    this.setCart(cart)
  },

  updateCount(id: number, count: number): void {
    const cart = this.getCart().map(item => 
      item.id === id ? { ...item, count: Math.max(1, count) } : item
    )
    this.setCart(cart)
  },

  toggleSelect(id: number): void {
    const cart = this.getCart().map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    )
    this.setCart(cart)
  },

  toggleSelectAll(selectAll: boolean): void {
    const cart = this.getCart().map(item => ({ ...item, selected: selectAll }))
    this.setCart(cart)
  },

  clearCart(): void {
    wx.removeStorageSync(CART_KEY)
  },

  getTotalPrice(): number {
    return this.getCart()
      .filter(item => item.selected)
      .reduce((sum, item) => sum + item.price * item.count, 0)
  },

  getCartCount(): number {
    return this.getCart().reduce((sum, item) => sum + item.count, 0)
  },

  getSelectedCount(): number {
    return this.getCart().filter(item => item.selected).length
  },

  getSelectedItems(): CartItem[] {
    return this.getCart().filter(item => item.selected)
  }
}
