Component({
  data: {
    title: '',
    variety: '',
    desc: '',
    quantity: '',
    unitIndex: 0,
    units: ['斤', '公斤', '吨', '株', '万株'],
    price: '',
    location: '',
    phone: '',
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
    submit() {
      if (!this.data.title) {
        wx.showToast({ title: '请输入产品名称', icon: 'none' })
        return
      }
      if (!this.data.phone) {
        wx.showToast({ title: '请输入联系电话', icon: 'none' })
        return
      }

      const supplyData = {
        id: Date.now(),
        type: 'supply',
        title: this.data.title,
        variety: this.data.variety,
        desc: this.data.desc,
        quantity: this.data.quantity,
        unit: this.data.units[this.data.unitIndex],
        price: this.data.price,
        location: this.data.location,
        phone: this.data.phone,
        images: this.data.images,
        createTime: new Date().toISOString()
      }

      const supplies = wx.getStorageSync('supplies') || []
      supplies.unshift(supplyData)
      wx.setStorageSync('supplies', supplies)

      wx.showLoading({ title: '发布中...' })

      setTimeout(() => {
        wx.hideLoading()
        wx.showToast({ title: '发布成功！', icon: 'success' })
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      }, 1500)
    }
  }
})
