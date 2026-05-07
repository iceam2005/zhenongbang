Page({
  data: {
    bannerSlides: [
      {
        src: 'https://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
        title: '活动主题',
        desc: '探索甘蔗的奥秘，体验农耕文化'
      },
      {
        src: 'https://mmbiz.qpic.cn/mmbiz_jpg/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
        title: '活动主题',
        desc: '亲子研学 · 劳动教育 · 碳循环科普'
      }
    ],
    activityList: [
      {
        id: 1,
        title: '半日研学课程',
        desc: '甘蔗科普小课堂+甘蔗种植体验+手榨甘蔗汁+甘蔗渣手工DIY',
        target: '小学1-6年级',
        duration: '3小时',
        price: 68,
        unit: '人',
        tag: '热门',
        type: 'study',
        highlights: ['科普教育', '动手体验', '环保理念'],
        image: '',
        availableDates: ['01-16', '01-17', '01-19', '01-20']
      },
      {
        id: 2,
        title: '一日亲子营',
        desc: '蔗林探秘+砍蔗体验+甘蔗美食制作+甘蔗渣环保手工',
        target: '家庭(孩子5-12岁)',
        duration: '全天',
        price: 298,
        unit: '家庭',
        tag: '推荐',
        type: 'family',
        highlights: ['亲子互动', '户外体验', '美食制作'],
        image: '',
        availableDates: ['01-16', '01-17', '01-19', '01-23']
      },
      {
        id: 3,
        title: '甘蔗主题农家乐',
        desc: '甘蔗林打卡+甘蔗特色餐饮(甘蔗鸡、甘蔗汁火锅)+甘蔗文创',
        target: '亲子家庭、年轻群体',
        duration: '半天',
        price: 88,
        unit: '人',
        tag: '',
        type: 'farm',
        highlights: ['特色餐饮', '拍照打卡', '文创体验'],
        image: '',
        availableDates: ['01-17', '01-20', '01-21', '01-23']
      },
      {
        id: 4,
        title: '劳动教育校本课程',
        desc: '标准化教案+教具+学生手册，适合学校教学使用',
        target: '小学学校',
        duration: '定制',
        price: 8000,
        unit: '校',
        tag: '定制',
        type: 'study',
        highlights: ['课程授权', '专业教具', '教师培训'],
        image: '',
        availableDates: ['01-19', '01-20', '01-21', '01-22']
      }
    ],
    iconMap: {
      study: '📚',
      family: '👨‍👩‍👧',
      farm: '🏡'
    }
  },
  filterType(e: any) {
    const type = e.currentTarget.dataset.type
    wx.showToast({
      title: `筛选${type === 'all' ? '全部' : type === 'study' ? '研学课程' : type === 'family' ? '亲子活动' : '农家乐'}`,
      icon: 'none'
    })
  },
  goToDetail(e: any) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/activities/detail?id=${id}`
    })
  },
  bookActivity(e: any) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/activities/book/book?id=${id}`
    })
  }
})
