import { P } from '../../utils/placeholders'

Page({
  data: {
    ecoBannerUrl: P.productsEco(),
    activeCategory: 'all',
    cartCount: 0,
    cartTotal: '0.00',
    productList: [
      {
        id: 1,
        name: '可降解甘蔗渣吸管',
        desc: '食品级材质，可自然降解',
        price: 29.9,
        sales: 1256,
        tag: '热销',
        category: 'straw',
        specs: ['100支装', '独立包装'],
        image: P.productThumb(1)
      },
      {
        id: 2,
        name: '一次性环保餐盒',
        desc: '防水防油，微波加热',
        price: 45.0,
        sales: 892,
        tag: '',
        category: 'box',
        specs: ['50只装', '650ml'],
        image: P.productThumb(2)
      },
      {
        id: 3,
        name: '甘蔗渣农育花盆',
        desc: '可自然降解，透气性好',
        price: 15.0,
        sales: 634,
        tag: '新品',
        category: 'pot',
        specs: ['中号', '口径15cm'],
        image: P.productThumb(3)
      },
      {
        id: 4,
        name: '甘蔗渣文创礼盒',
        desc: '可印刷定制，企业礼品首选',
        price: 68.0,
        sales: 321,
        tag: '',
        category: 'gift',
        specs: ['定制款', '含手提袋'],
        image: P.productThumb(4)
      },
      {
        id: 5,
        name: '甘蔗渣餐具套装',
        desc: '刀叉勺三件套，户外必备',
        price: 35.0,
        sales: 567,
        tag: '',
        category: 'straw',
        specs: ['20套装', '便携装'],
        image: P.productThumb(5)
      },
      {
        id: 6,
        name: '甘蔗渣保鲜盒',
        desc: '密封设计，冰箱专用',
        price: 38.0,
        sales: 423,
        tag: '',
        category: 'box',
        specs: ['三件套', '不同规格'],
        image: P.productThumb(6)
      },
      {
        id: 7,
        name: '甘蔗渣育苗杯',
        desc: '育苗专用，移栽方便',
        price: 12.0,
        sales: 876,
        tag: '热销',
        category: 'pot',
        specs: ['100个', '口径8cm'],
        image: P.productThumb(7)
      },
      {
        id: 8,
        name: '甘蔗渣笔记本',
        desc: '环保纸张，书写流畅',
        price: 25.0,
        sales: 289,
        tag: '',
        category: 'gift',
        specs: ['A5', '60页'],
        image: P.productThumb(8)
      }
    ],
    iconMap: {
      straw: '🥤',
      box: '📦',
      pot: '🪴',
      gift: '🎁'
    }
  },
  onShow: function() {
    console.log('Products Page onShow')
    this.updateCartInfo()
  },
  updateCartInfo: function() {
    try {
      const cart = wx.getStorageSync('cart') || []
      const count = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0)
      const total = cart.reduce((sum: number, item: any) => sum + (item.price || 0) * (item.quantity || 1), 0)
      this.setData({
        cartCount: count,
        cartTotal: total.toFixed(2)
      })
      console.log('Cart updated:', count, total.toFixed(2))
    } catch (e) {
      console.error('Update cart error:', e)
    }
  },
  setCategory: function(e: any) {
    const category = e.currentTarget.dataset.category
    this.setData({ activeCategory: category })
    console.log('Category changed to:', category)
  },
  goToDetail: function(e: any) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/products/detail?id=' + id })
  },
  addToCart: function(e: any) {
    const productId = e.currentTarget.dataset.id
    const product = this.data.productList.find((p: any) => p.id === productId)
    
    if (product) {
      try {
        const cart = wx.getStorageSync('cart') || []
        const existing = cart.find((item: any) => item.id === productId)
        
        if (existing) {
          existing.quantity = (existing.quantity || 1) + 1
        } else {
          cart.push({
            id: product.id,
            name: product.name,
            spec: product.specs.join(', '),
            price: product.price,
            image: product.image,
            quantity: 1,
            selected: true
          })
        }
        
        wx.setStorageSync('cart', cart)
        this.updateCartInfo()
        wx.showToast({ title: '已加入购物车', icon: 'success' })
      } catch (e) {
        console.error('Add to cart error:', e)
      }
    }
  },
  goToCart: function() {
    wx.navigateTo({ url: '/pages/products/cart/cart' })
  },
  goToCheckout: function() {
    const cart = wx.getStorageSync('cart') || []
    const selected = cart.filter((item: any) => item.selected)
    
    if (selected.length === 0) {
      wx.showToast({ title: '购物车为空', icon: 'none' })
      return
    }
    wx.navigateTo({ url: '/pages/products/checkout/checkout' })
  }
})
