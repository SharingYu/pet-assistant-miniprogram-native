const STORAGE_KEY = 'community_posts'

Page({
  data: {
    activeTab: 'hot',
    posts: []
  },

  onLoad() {
    this.loadPosts()
  },

  onShow() {
    this.loadPosts()
  },

  loadPosts() {
    let posts = wx.getStorageSync(STORAGE_KEY)
    if (!posts || posts.length === 0) {
      posts = [
        { id: '1', nickname: '豆豆妈', petName: '豆豆', petType: 'dog', content: '今天带豆豆去打疫苗，表现得很乖！', images: [], likes: 12, comments: 3, createdAt: Date.now() - 3600000 },
        { id: '2', nickname: '咪咪控', petName: '咪咪', petType: 'cat', content: '新买的猫爬架到了，猫咪超喜欢！', images: [], likes: 8, comments: 2, createdAt: Date.now() - 7200000 }
      ]
      wx.setStorageSync(STORAGE_KEY, posts)
    }
    this.setData({ posts })
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ activeTab: tab })
  },

  formatTime(ts) {
    const diff = Date.now() - ts
    if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前'
    if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前'
    return Math.floor(diff / 86400000) + '天前'
  },

  likePost(e) {
    const id = e.currentTarget.dataset.id
    const posts = this.data.posts
    const post = posts.find(p => p.id === id)
    if (post) {
      post.liked = !post.liked
      post.likes = (post.likes || 0) + (post.liked ? 1 : -1)
      wx.setStorageSync(STORAGE_KEY, posts)
      this.setData({ posts })
    }
  },

  viewPost(e) {
    wx.showToast({ title: '帖子详情', icon: 'none' })
  },

  commentPost(e) {
    wx.showToast({ title: '评论功能开发中', icon: 'none' })
  }
})
