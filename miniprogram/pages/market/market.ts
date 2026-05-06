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
    }>
  },
  onShow() {
    this.loadUserData()
  },
  methods: {
    loadUserData() {
      const defaultSupplies = [
        {
          id: 1,
          title: '优质果蔗批发',
          desc: '产地直供，新鲜采摘，甜度高，口感脆',
          spec: '品种：黑皮果蔗',
          quantity: '供应量：100吨',
          price: 3.5,
          unit: '斤',
          tag: '产地直供',
          phone: '13800138001',
          image: 'https://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
        },
        {
          id: 2,
          title: '糖料蔗大量供应',
          desc: '含糖量高，适合榨糖，长期合作优先',
          spec: '品种：粤糖93-159',
          quantity: '供应量：500吨',
          price: 280,
          unit: '吨',
          tag: '量大从优',
          phone: '13800138002',
          image: 'https://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
        },
        {
          id: 3,
          title: '有机甘蔗种苗',
          desc: '优质品种，成活率高，提供技术指导',
          spec: '品种：桂糖42号',
          quantity: '供应量：10万株',
          price: 0.8,
          unit: '株',
          tag: '技术支持',
          phone: '13800138003',
          image: 'https://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
        },
        {
          id: 4,
          title: '新鲜甘蔗梢',
          desc: '营养丰富，适合养殖饲料',
          spec: '新鲜度：当日采摘',
          quantity: '供应量：50吨',
          price: 120,
          unit: '吨',
          tag: '饲料专用',
          phone: '13800138004',
          image: 'https://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
        }
      ]

      const defaultDemands = [
        {
          id: 1,
          title: '奶茶店果蔗采购',
          desc: '长期采购果蔗用于制作饮品，要求新鲜、甜度高',
          quantity: '每月5吨',
          price: 3.2,
          unit: '斤',
          location: '广东深圳',
          phone: '13900139001',
          tag: '长期合作',
          time: '2024-01-15'
        },
        {
          id: 2,
          title: '制糖厂原料采购',
          desc: '大型制糖厂常年收购糖料蔗，价格面议',
          quantity: '每年5000吨',
          price: 260,
          unit: '吨',
          location: '广西南宁',
          phone: '13900139002',
          tag: '大型采购',
          time: '2024-01-14'
        },
        {
          id: 3,
          title: '种苗采购',
          desc: '采购优质甘蔗种苗，用于扩大种植规模',
          quantity: '5万株',
          price: 0.6,
          unit: '株',
          location: '云南临沧',
          phone: '13900139003',
          tag: '急购',
          time: '2024-01-13'
        },
        {
          id: 4,
          title: '农家乐甘蔗供应',
          desc: '采购果蔗供游客体验采摘，要求外观好',
          quantity: '每周2吨',
          price: 4.0,
          unit: '斤',
          location: '海南三亚',
          phone: '13900139004',
          tag: '季节性',
          time: '2024-01-12'
        }
      ]

      const userSupplies: any[] = wx.getStorageSync('supplies') || []
      const userDemands: any[] = wx.getStorageSync('demands') || []

      const formattedSupplies = userSupplies.map((item: any) => ({
        id: item.id,
        title: item.title,
        desc: item.desc || '',
        spec: item.variety ? `品种：${item.variety}` : '',
        quantity: item.quantity ? `供应量：${item.quantity}${item.unit || ''}` : '',
        price: parseFloat(item.price) || 0,
        unit: item.unit || '',
        tag: '用户发布',
        phone: item.phone || '',
        image: item.images?.[0] || 'https://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
      }))

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
        time: item.expireDate || item.createTime?.split('T')[0] || ''
      }))

      const allSupplies = [...formattedSupplies, ...defaultSupplies]
      const allDemands = [...formattedDemands, ...defaultDemands]

      this.setData({
        allSupplyList: allSupplies,
        allDemandList: allDemands,
        filteredSupplyList: allSupplies,
        filteredDemandList: allDemands
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
