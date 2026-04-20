Page({
  data: {
    version: '1.0.0',
    petCount: 0,
    postCount: 0
  },

  onLoad() {
    this.loadStats()
  },

  onShow() {
    this.loadStats()
  },

  loadStats() {
    const pets = wx.getStorageSync('pets') || []
    const posts = wx.getStorageSync('community_posts') || []
    this.setData({
      petCount: pets.length,
      postCount: posts.length
    })
  },

  clearData() {
    wx.showModal({
      title: '提示',
      content: '确定要清除所有数据吗？此操作不可恢复',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync()
          wx.showToast({ title: '已清除', icon: 'success' })
          this.loadStats()
        }
      }
    })
  },

  aboutApp() {
    wx.showModal({
      title: '关于',
      content: '🐾 毛孩子健康助手\n版本 1.0.0\n\n您的宠物健康+社交管家',
      showCancel: false
    })
  }
})
