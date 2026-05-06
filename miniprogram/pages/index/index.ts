Component({
  data: {
    marketList: [
      {
        id: 1,
        title: '优质果蔗批发',
        desc: '产地直供，新鲜采摘，甜度高',
        price: 3.5,
        unit: '斤',
        location: '广西南宁',
        image: 'https://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
      },
      {
        id: 2,
        title: '糖料蔗大量供应',
        desc: '含糖量高，适合榨糖',
        price: 280,
        unit: '吨',
        location: '广东湛江',
        image: 'https://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
      },
      {
        id: 3,
        title: '有机甘蔗种苗',
        desc: '优质品种，成活率高',
        price: 0.8,
        unit: '株',
        location: '云南临沧',
        image: 'https://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
      }
    ],
    productList: [
      {
        id: 1,
        name: '可降解吸管',
        price: 29.9,
        image: 'https://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
      },
      {
        id: 2,
        name: '环保餐盒',
        price: 45.0,
        image: 'https://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
      },
      {
        id: 3,
        name: '农育花盆',
        price: 15.0,
        image: 'https://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
      },
      {
        id: 4,
        name: '文创礼品',
        price: 68.0,
        image: 'https://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
      }
    ],
    activityList: [
      {
        id: 1,
        title: '半日研学课程',
        desc: '甘蔗科普+种植体验+手榨甘汁',
        price: 68,
        unit: '人',
        time: '每周六日',
        image: 'https://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
      },
      {
        id: 2,
        title: '一日亲子营',
        desc: '蔗林探秘+砍蔗体验+美食制作',
        price: 298,
        unit: '家庭',
        time: '周末节假日',
        image: 'https://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
      },
      {
        id: 3,
        title: '甘蔗主题农家乐',
        desc: '打卡拍照+特色餐饮+文创体验',
        price: 88,
        unit: '人',
        time: '每日开放',
        image: 'https://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
      }
    ]
  },
  methods: {
    goToMarket() {
      wx.switchTab({
        url: '/pages/market/market'
      })
    },
    goToProducts() {
      wx.switchTab({
        url: '/pages/products/products'
      })
    },
    goToActivities() {
      wx.switchTab({
        url: '/pages/activities/activities'
      })
    },
    goToMine() {
      wx.switchTab({
        url: '/pages/mine/mine'
      })
    },
    goToMarketDetail(e: any) {
      const id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/market/detail?id=${id}`
      })
    },
    goToProductDetail(e: any) {
      const id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/products/detail?id=${id}`
      })
    },
    goToActivityDetail(e: any) {
      const id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/activities/detail?id=${id}`
      })
    }
  }
})