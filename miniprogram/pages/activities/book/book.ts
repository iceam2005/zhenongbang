import { P } from '../../utils/placeholders'

Component({
  data: {
    activity: {
      id: 1,
      title: '半日研学课程',
      target: '小学1-6年级',
      duration: '3小时',
      price: 68,
      unit: '人',
      image: P.activityCard(1)
    },
    name: '',
    phone: '',
    peopleCount: 1,
    bookDate: '',
    remark: ''
  },
  computed: {
    totalPrice(): number {
      return (this.data.activity.price * this.data.peopleCount).toFixed(2)
    }
  },
  methods: {
    onNameInput(e: any) {
      this.setData({ name: e.detail.value })
    },
    onPhoneInput(e: any) {
      this.setData({ phone: e.detail.value })
    },
    onRemarkInput(e: any) {
      this.setData({ remark: e.detail.value })
    },
    onDateChange(e: any) {
      this.setData({ bookDate: e.detail.value })
    },
    increase() {
      this.setData({ peopleCount: this.data.peopleCount + 1 })
    },
    decrease() {
      if (this.data.peopleCount > 1) {
        this.setData({ peopleCount: this.data.peopleCount - 1 })
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
        content: `确定要预订 ${this.data.peopleCount} 人吗？`,
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
  }
})