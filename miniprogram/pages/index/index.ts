import { P } from '../../utils/placeholders'

Component({
  data: {
    bannerSlides: [
      { src: P.homeBanner(1), label: '甘蔗丰收季', subtitle: '智慧助农 · 碳循环经济' },
      { src: P.homeBanner(2), label: '红糖·蔗糖·甘汁', subtitle: '产地加工好物' },
      { src: P.homeBanner(3), label: '基地与加工', subtitle: '从田间到车间' }
    ],
    marketList: [
      {
        id: 1,
        title: '带叶鲜蔗产地直供',
        desc: '果蔗、糖料蔗，新鲜砍收，甜度高',
        price: 3.5,
        unit: '斤',
        location: '广西南宁',
        image: P.indexSupply(1)
      },
      {
        id: 2,
        title: '鲜榨甘蔗汁与设备',
        desc: '景区、夜市、奶茶店配套原料与机具',
        price: 280,
        unit: '套',
        location: '广东湛江',
        image: P.indexSupply(2)
      },
      {
        id: 3,
        title: '手工红糖·蔗糖',
        desc: '传统工艺，块糖粉糖，批发零售均可',
        price: 18,
        unit: '斤',
        location: '云南临沧',
        image: P.indexSupply(3)
      },
      {
        id: 4,
        title: '蔗渣综合利用',
        desc: '有机肥、纸浆基材等副产品',
        price: 120,
        unit: '吨',
        location: '广西崇左',
        image: P.indexSupply(4)
      }
    ],
    productList: [
      {
        id: 1,
        name: '可降解甘蔗吸管',
        price: 29.9,
        image: P.indexProduct(1)
      },
      {
        id: 2,
        name: '环保餐盒',
        price: 45.0,
        image: P.indexProduct(2)
      },
      {
        id: 3,
        name: '蔗渣农育花盆',
        price: 15.0,
        image: P.indexProduct(3)
      },
      {
        id: 4,
        name: '文创礼盒',
        price: 68.0,
        image: P.indexProduct(4)
      },
      {
        id: 5,
        name: '餐具套装',
        price: 35.0,
        image: P.indexProduct(5)
      },
      {
        id: 6,
        name: '保鲜盒',
        price: 38.0,
        image: P.indexProduct(6)
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
        image: P.indexActivity(1)
      },
      {
        id: 2,
        title: '一日亲子营',
        desc: '蔗林探秘+砍蔗体验+美食制作',
        price: 298,
        unit: '家庭',
        time: '周末节假日',
        image: P.indexActivity(2)
      },
      {
        id: 3,
        title: '甘蔗主题农家乐',
        desc: '打卡拍照+特色餐饮+文创体验',
        price: 88,
        unit: '人',
        time: '每日开放',
        image: P.indexActivity(3)
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
