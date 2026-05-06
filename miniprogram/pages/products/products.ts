import { cartUtil } from '../../utils/cart'

Component({
  data: {
    activeCategory: 'all',
    cartCount: 0,
    cartTotal: 0,
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
        image: 'https://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
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
        image: 'https://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
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
        image: 'https://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
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
        image: 'https://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
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
        image: 'https://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
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
        image: 'https://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
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
        image: 'https://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
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
        image: 'https://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
      }
    ]
  },
  onShow() {
    this.updateCartInfo()
  },
  methods: {
    updateCartInfo() {
      this.setData({
        cartCount: cartUtil.getCartCount(),
        cartTotal: cartUtil.getTotalPrice().toFixed(2) as any
      })
    },
    setCategory(category: string) {
      this.setData({ activeCategory: category })
    },
    goToDetail(e: any) {
      const id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/products/detail?id=${id}`
      })
    },
    addToCart(e: any) {
      const dataset = e.currentTarget.dataset
      const productId = dataset.id ? parseInt(dataset.id) : e.currentTarget.parentDataset?.id
      
      if (!productId) {
        const event = e as any
        const mark = event.mark || {}
        const product = this.data.productList.find((p: any) => p.id === mark.productId)
        if (product) {
          cartUtil.addItem({
            id: product.id,
            name: product.name,
            spec: product.specs.join(', '),
            price: product.price,
            image: product.image
          })
          this.updateCartInfo()
          wx.showToast({
            title: '已加入购物车',
            icon: 'success'
          })
        }
        return
      }

      const product = this.data.productList.find((p: any) => p.id === productId)
      if (product) {
        cartUtil.addItem({
          id: product.id,
          name: product.name,
          spec: product.specs.join(', '),
          price: product.price,
          image: product.image
        })
        this.updateCartInfo()
        wx.showToast({
          title: '已加入购物车',
          icon: 'success'
        })
      }
    },
    goToCart() {
      wx.navigateTo({
        url: '/pages/products/cart/cart'
      })
    },
    goToCheckout() {
      const selectedItems = cartUtil.getSelectedItems()
      if (selectedItems.length === 0) {
        wx.showToast({ title: '购物车为空', icon: 'none' })
        return
      }
      wx.navigateTo({
        url: '/pages/products/checkout/checkout'
      })
    }
  }
})
