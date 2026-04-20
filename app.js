App({
  onLaunch() {
    // 初始化检查
    const pets = wx.getStorageSync('pets') || []
    const reminders = wx.getStorageSync('reminders') || []
    const posts = wx.getStorageSync('community_posts') || getDefaultPosts()
    
    if (!wx.getStorageSync('initialized')) {
      wx.setStorageSync('initialized', true)
      wx.setStorageSync('pets', [])
      wx.setStorageSync('reminders', [])
      wx.setStorageSync('community_posts', getDefaultPosts())
    }
  }
})

function getDefaultPosts() {
  return [
    { id: '1', nickname: '豆豆妈', petName: '豆豆', petType: 'dog', content: '今天带豆豆去打疫苗，表现得很乖！', images: [], likes: 12, comments: 3, createdAt: Date.now() - 3600000 },
    { id: '2', nickname: '咪咪控', petName: '咪咪', petType: 'cat', content: '新买的猫爬架到了，猫咪超喜欢！', images: [], likes: 8, comments: 2, createdAt: Date.now() - 7200000 }
  ]
}
