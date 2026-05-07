import { P, DEFAULT_PLACEHOLDER_IMAGE } from '../../utils/placeholders'

Component({
  data: {
    activeTab: 'supply',
    searchKeyword: '',
    allSupplyList: [] as Array<{
      id: number
      title: string
      desc: string
      spec: string
      quantity: string
      price: number
      unit: string
      tag: string
      phone: string
      image: string
    }>,
    allDemandList: [] as Array<{
      id: number
      title: string
      desc: string
      quantity: string
      price: number
      unit: string
      location: string
      phone: string
      tag: string
      time: string
      image: string
    }>,
    filteredSupplyList: [] as Array<{
      id: number
      title: string
      desc: string
      spec: string
      quantity: string
      price: number
      unit: string
      tag: string
      phone: string
      image: string
    }>,
    filteredDemandList: [] as Array<{
      id: number
      title: string
      desc: string
      quantity: string
      price: number
      unit: string
      location: string
      phone: string
      tag: string
      time: string
      image: string
    }>
  },
  lifetimes: {
    attached() {
      console.log('market component attached')
      this.loadUserData()
    },
    ready() {
      console.log('market component ready')
    },
    detached() {
      console.log('market component detached')
    }
  },
  pageLifetimes: {
    show() {
      console.log('market page show')
      this.loadUserData()
    },
    hide() {
      console.log('market page hide')
    }
  },
  methods: {
    loadUserData() {
      console.log('=== loadUserData called ===')

      const defaultSupplies = [
        {
          id: 1,
          title: '带叶鲜蔗产地直供',
          desc: '果蔗、糖料蔗，新鲜砍收，可对接批发与电商',
          spec: '规格：整根带叶',
          quantity: '供应量：100吨',
          price: 3.5,
          unit: '斤',
          tag: '产地直供',
          phone: '13800138001',
          image: P.marketSupply(1)
        },
        {
          id: 2,
          title: '鲜榨甘蔗汁与榨汁设备',
          desc: '原料蔗、成品汁、商用榨汁机，景区夜市可配套',
          spec: '机型：多规格可选',
          quantity: '供应量：按月供货',
          price: 280,
          unit: '套',
          tag: '渠道配套',
          phone: '13800138002',
          image: P.marketSupply(2)
        },
        {
          id: 3,
          title: '手工红糖·蔗糖',
          desc: '传统工艺，块糖、粉糖，可贴牌与大宗',
          spec: '品类：红糖/蔗糖',
          quantity: '供应量：20吨/月',
          price: 18,
          unit: '斤',
          tag: '食品级',
          phone: '13800138003',
          image: P.marketSupply(3)
        },
        {
          id: 4,
          title: '蔗渣副产品（肥、纸浆基材等）',
          desc: '有机肥、造纸与环保基材原料，循环农业',
          spec: '形态：纤维/颗粒',
          quantity: '供应量：500吨',
          price: 120,
          unit: '吨',
          tag: '循环农业',
          phone: '13800138004',
          image: P.marketSupply(4)
        }
      ]

      const defaultDemands = [
        {
          id: 1,
          title: '批发市场大宗甘蔗',
          desc: '一级批发市场常年收货，要求整齐、耐储运',
          quantity: '每周约30吨',
          price: 3.0,
          unit: '斤',
          location: '广东广州',
          phone: '13900139001',
          tag: '大宗',
          time: '2024-01-15',
          image: P.marketDemand(1)
        },
        {
          id: 2,
          title: '商超红糖制品供货',
          desc: '连锁超市红糖、蔗糖货架补货，需资质齐全',
          quantity: '首批2吨',
          price: 22,
          unit: '斤',
          location: '上海浦东',
          phone: '13900139002',
          tag: '渠道',
          time: '2024-01-14',
          image: P.marketDemand(2)
        },
        {
          id: 3,
          title: '饮品店甘蔗汁原料',
          desc: '连锁奶茶、鲜饮门店用蔗与汁，稳定月供',
          quantity: '每月8吨',
          price: 3.5,
          unit: '斤',
          location: '广东深圳',
          phone: '13900139003',
          tag: '长期合作',
          time: '2024-01-13',
          image: P.marketDemand(3)
        },
        {
          id: 4,
          title: '食品厂糖料与辅料',
          desc: '深加工企业采购糖料蔗、红糖等原料，可签年单',
          quantity: '每年3000吨',
          price: 270,
          unit: '吨',
          location: '广西南宁',
          phone: '13900139004',
          tag: '企业采购',
          time: '2024-01-12',
          image: P.marketDemand(4)
        }
      ]

      const userSuppliesStr = wx.getStorageSync('supplies')
      const userDemandsStr = wx.getStorageSync('demands')

      console.log('userSuppliesStr:', userSuppliesStr)

      let userSupplies: any[] = []
      let userDemands: any[] = []

      try {
        if (userSuppliesStr) {
          if (typeof userSuppliesStr === 'string') {
            userSupplies = JSON.parse(userSuppliesStr)
          } else {
            userSupplies = userSuppliesStr
          }
        }
        if (userDemandsStr) {
          if (typeof userDemandsStr === 'string') {
            userDemands = JSON.parse(userDemandsStr)
          } else {
            userDemands = userDemandsStr
          }
        }
      } catch (e) {
        console.error('解析存储数据失败:', e)
      }

      console.log('userSupplies after parse:', userSupplies)
      console.log('userSupplies length:', userSupplies.length)

      const formattedSupplies = userSupplies.map((item: any) => {
        console.log('mapping item:', item)
        return {
          id: item.id,
          title: item.title,
          desc: item.desc || '',
          spec: item.variety ? `品种：${item.variety}` : '',
          quantity: item.quantity ? `供应量：${item.quantity}${item.unit || ''}` : '',
          price: parseFloat(item.price) || 0,
          unit: item.unit || '',
          tag: '用户发布',
          phone: item.phone || '',
          image: item.images && item.images.length > 0 ? item.images[0] : DEFAULT_PLACEHOLDER_IMAGE
        }
      })

      const formattedDemands = userDemands.map((item: any) => ({
        id: item.id,
        title: item.title,
        desc: item.desc || '',
        quantity: item.quantity ? `${item.quantity}${item.unit || ''}` : '',
        price: parseFloat(item.price) || 0,
        unit: item.unit || '',
        location: item.location || '',
        phone: item.phone || '',
        tag: '用户发布',
        time: item.expireDate || item.createTime?.split('T')[0] || '',
        image: item.images && item.images.length > 0 ? item.images[0] : DEFAULT_PLACEHOLDER_IMAGE
      }))

      console.log('formattedSupplies:', formattedSupplies)
      console.log('formattedSupplies length:', formattedSupplies.length)

      const allSupplies = [...formattedSupplies, ...defaultSupplies]
      const allDemands = [...formattedDemands, ...defaultDemands]

      console.log('allSupplies length:', allSupplies.length)

      this.setData({
        allSupplyList: allSupplies,
        allDemandList: allDemands,
        filteredSupplyList: allSupplies,
        filteredDemandList: allDemands
      }, () => {
        console.log('setData completed')
        console.log('filteredSupplyList:', this.data.filteredSupplyList)
        console.log('filteredSupplyList length:', this.data.filteredSupplyList.length)
      })
    },
    setTab(e: any) {
      const tab = e.currentTarget.dataset.tab
      this.setData({ activeTab: tab })
    },
    onSearchInput(e: any) {
      const keyword = e.detail.value
      this.setData({ searchKeyword: keyword })
      this.filterData(keyword)
    },
    onSearch() {
      this.filterData(this.data.searchKeyword)
    },
    filterData(keyword: string) {
      if (!keyword.trim()) {
        this.setData({
          filteredSupplyList: this.data.allSupplyList,
          filteredDemandList: this.data.allDemandList
        })
        return
      }

      const lowerKeyword = keyword.toLowerCase()

      const filteredSupplies = this.data.allSupplyList.filter(item =>
        item.title.toLowerCase().includes(lowerKeyword) ||
        item.desc.toLowerCase().includes(lowerKeyword)
      )

      const filteredDemands = this.data.allDemandList.filter(item =>
        item.title.toLowerCase().includes(lowerKeyword) ||
        item.desc.toLowerCase().includes(lowerKeyword)
      )

      this.setData({
        filteredSupplyList: filteredSupplies,
        filteredDemandList: filteredDemands
      })
    },
    showFilter() {
      wx.showToast({
        title: '筛选功能开发中',
        icon: 'none'
      })
    },
    goToDetail(e: any) {
      const id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/market/detail?id=${id}`
      })
    },
    contactSupplier(e: any) {
      e.stopPropagation?.()
      const phone = e.currentTarget.dataset.phone
      wx.showModal({
        title: '联系电话',
        content: phone,
        confirmText: '拨打电话',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            wx.makePhoneCall({
              phoneNumber: phone
            })
          }
        }
      })
    },
    contactBuyer(e: any) {
      e.stopPropagation?.()
      const phone = e.currentTarget.dataset.phone
      wx.showModal({
        title: '联系电话',
        content: phone,
        confirmText: '拨打电话',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            wx.makePhoneCall({
              phoneNumber: phone
            })
          }
        }
      })
    },
    publish() {
      wx.showActionSheet({
        itemList: ['发布供应信息', '发布采购需求'],
        success: (res) => {
          if (res.tapIndex === 0) {
            wx.navigateTo({
              url: '/pages/market/publish-supply/publish-supply'
            })
          } else {
            wx.navigateTo({
              url: '/pages/market/publish-demand/publish-demand'
            })
          }
        }
      })
    }
  }
})
