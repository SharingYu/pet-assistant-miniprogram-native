App({
  onLaunch() {
    // 检查是否已初始化
    const initialized = wx.getStorageSync('initialized')
    if (!initialized) {
      wx.setStorageSync('initialized', true)
      wx.setStorageSync('pets', [])
      wx.setStorageSync('reminders', [])
      // 默认帖子数据
      const defaultPosts = [
        { id: '1', nickname: '豆豆妈', petName: '豆豆', petType: 'dog', content: '今天带豆豆去打疫苗，表现得很乖！', images: [], likes: 12, comments: 3, createdAt: Date.now() - 3600000 },
        { id: '2', nickname: '咪咪控', petName: '咪咪', petType: 'cat', content: '新买的猫爬架到了，猫咪超喜欢！', images: [], likes: 8, comments: 2, createdAt: Date.now() - 7200000 }
      ]
      wx.setStorageSync('community_posts', defaultPosts)
    }
  }
})
