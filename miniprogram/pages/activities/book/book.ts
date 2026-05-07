Page({
  data: {
    activity: {
      id: 1,
      title: '半日研学课程',
      target: '小学1-6年级',
      duration: '3小时',
      price: 68,
      unit: '人'
    },
    name: '',
    phone: '',
    peopleCount: 1,
    bookDate: '',
    remark: '',
    totalPrice: '68.00',
    availableDates: ['01-16', '01-17', '01-19', '01-20']
  },
  onLoad(options: any) {
    if (options && options.id) {
      this.loadActivity(options.id)
    }
  },
  loadActivity(id: number) {
    const activities = [
      {
        id: 1,
        title: '半日研学课程',
        target: '小学1-6年级',
        duration: '3小时',
        price: 68,
        unit: '人',
        availableDates: ['01-16', '01-17', '01-19', '01-20']
      },
      {
        id: 2,
        title: '一日亲子营',
        target: '家庭(孩子5-12岁)',
        duration: '全天',
        price: 298,
        unit: '家庭',
        availableDates: ['01-16', '01-17', '01-19', '01-23']
      },
      {
        id: 3,
        title: '甘蔗主题农家乐',
        target: '亲子家庭、年轻群体',
        duration: '半天',
        price: 88,
        unit: '人',
        availableDates: ['01-17', '01-20', '01-21', '01-23']
      },
      {
        id: 4,
        title: '劳动教育校本课程',
        target: '小学学校',
        duration: '定制',
        price: 8000,
        unit: '校',
        availableDates: ['01-19', '01-20', '01-21', '01-22']
      }
    ]
    
    const activity = activities.find(a => a.id === parseInt(id))
    if (activity) {
      this.setData({
        activity: activity,
        availableDates: activity.availableDates,
        totalPrice: activity.price.toFixed(2)
      })
    }
  },
  onNameInput(e: any) {
    this.setData({ name: e.detail.value })
  },
  onPhoneInput(e: any) {
    this.setData({ phone: e.detail.value })
  },
  onRemarkInput(e: any) {
    this.setData({ remark: e.detail.value })
  },
  selectDate(e: any) {
    const date = e.currentTarget.dataset.date
    this.setData({ bookDate: date })
  },
  increase() {
    const newCount = this.data.peopleCount + 1
    const total = (this.data.activity.price * newCount).toFixed(2)
    this.setData({ 
      peopleCount: newCount,
      totalPrice: total
    })
  },
  decrease() {
    if (this.data.peopleCount > 1) {
      const newCount = this.data.peopleCount - 1
      const total = (this.data.activity.price * newCount).toFixed(2)
      this.setData({ 
        peopleCount: newCount,
        totalPrice: total
      })
    }
  },
  submitBook() {
    if (!this.data.name) {
      wx.showToast({ title: '请输入姓名', icon: 'none' })
      return
    }
    if (!this.data.phone) {
      wx.showToast({ title: '请输入联系电话', icon: 'none' })
      return
    }
    if (!this.data.bookDate) {
      wx.showToast({ title: '请选择预约日期', icon: 'none' })
      return
    }
    
    wx.showModal({
      title: '确认预订',
      content: `活动：${this.data.activity.title}\n人数：${this.data.peopleCount} ${this.data.activity.unit}\n日期：${this.data.bookDate}\n总价：¥${this.data.totalPrice}`,
      confirmText: '确认预订',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '提交中...' })
          setTimeout(() => {
            wx.hideLoading()
            wx.showToast({
              title: '预订成功！',
              icon: 'success'
            })
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/activities/activities'
              })
            }, 1500)
          }, 1500)
        }
      }
    })
  }
})
