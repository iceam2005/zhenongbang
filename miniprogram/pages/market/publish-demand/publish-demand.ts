Component({
  data: {
    title: '',
    variety: '',
    desc: '',
    quantity: '',
    unitIndex: 0,
    units: ['斤', '公斤', '吨', '株', '万株', '月', '年'],
    price: '',
    location: '',
    phone: '',
    expireDate: '',
    images: [] as string[]
  },
  methods: {
    onTitleInput(e: any) {
      this.setData({ title: e.detail.value })
    },
    onVarietyInput(e: any) {
      this.setData({ variety: e.detail.value })
    },
    onDescInput(e: any) {
      this.setData({ desc: e.detail.value })
    },
    onQuantityInput(e: any) {
      this.setData({ quantity: e.detail.value })
    },
    onUnitChange(e: any) {
      this.setData({ unitIndex: e.detail.value })
    },
    onPriceInput(e: any) {
      this.setData({ price: e.detail.value })
    },
    onLocationInput(e: any) {
      this.setData({ location: e.detail.value })
    },
    onPhoneInput(e: any) {
      this.setData({ phone: e.detail.value })
    },
    onDateChange(e: any) {
      this.setData({ expireDate: e.detail.value })
    },
    chooseImage() {
      wx.chooseImage({
        count: 3,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.setData({
            images: [...this.data.images, ...res.tempFilePaths]
          })
        }
      })
    },
    deleteImage(e: any) {
      const index = e.currentTarget.dataset.index
      const images = this.data.images.filter((_, i) => i !== index)
      this.setData({ images })
    },
    submit() {
      if (!this.data.title) {
        wx.showToast({ title: '请输入采购标题', icon: 'none' })
        return
      }
      if (!this.data.phone) {
        wx.showToast({ title: '请输入联系电话', icon: 'none' })
        return
      }

      const demandData = {
        id: Date.now(),
        type: 'demand',
        title: this.data.title,
        variety: this.data.variety,
        desc: this.data.desc,
        quantity: this.data.quantity,
        unit: this.data.units[this.data.unitIndex],
        price: this.data.price,
        location: this.data.location,
        phone: this.data.phone,
        expireDate: this.data.expireDate,
        images: this.data.images,
        createTime: new Date().toISOString()
      }

      try {
        const demands = wx.getStorageSync('demands') || []
        demands.unshift(demandData)
        wx.setStorageSync('demands', demands)

        console.log('采购需求已保存:', demandData)
        console.log('当前demands存储:', demands)

        wx.showLoading({ title: '发布中...' })

        setTimeout(() => {
          wx.hideLoading()
          wx.showToast({ title: '发布成功！', icon: 'success' })
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/market/market'
            })
          }, 1500)
        }, 1500)
      } catch (error) {
        wx.hideLoading()
        wx.showToast({ title: '发布失败，请重试', icon: 'none' })
        console.error('发布失败:', error)
      }
    }
  }
})
