const STORAGE_KEYS = {
  PETS: 'pets',
  REMINDERS: 'reminders'
}

Page({
  data: {
    pets: [],
    upcomingReminders: []
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    const pets = wx.getStorageSync(STORAGE_KEYS.PETS) || []
    const reminders = wx.getStorageSync(STORAGE_KEYS.REMINDERS) || []
    const now = Date.now()
    const weekLater = now + 7 * 24 * 60 * 60 * 1000
    const upcoming = reminders.filter(r => !r.done && new Date(r.date).getTime() <= weekLater).slice(0, 5)
    this.setData({ pets, upcomingReminders: upcoming })
  },

  goPetDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/pet-detail/pet-detail?id=' + id })
  },

  goAddPet() {
    wx.navigateTo({ url: '/pages/add-pet/add-pet' })
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    if (tab === 'diagnosis') wx.switchTab({ url: '/pages/diagnosis/diagnosis' })
    else if (tab === 'community') wx.switchTab({ url: '/pages/community/community' })
    else if (tab === 'reminders') wx.switchTab({ url: '/pages/reminders/reminders' })
  },

  goRecord() {
    const pets = this.data.pets
    if (pets.length > 0) {
      this.goPetDetail({ currentTarget: { dataset: { id: pets[0].id } } })
    } else {
      this.goAddPet()
    }
  },

  getPetEmoji(type) {
    return type === 'dog' ? '🐕' : type === 'cat' ? '🐱' : '🐰'
  },

  getReminderIcon(type) {
    const icons = { vaccine: '💉', deworm: '💊', checkup: '🏥', bath: '🛁', medicine: '💊', other: '📌' }
    return icons[type] || '📌'
  },

  formatDate(dateStr) {
    const d = new Date(dateStr)
    const now = new Date()
    const diff = d.getTime() - now.getTime()
    if (diff < 0) return '已过期'
    if (diff < 24 * 60 * 60 * 1000) return '今天'
    if (diff < 2 * 24 * 60 * 60 * 1000) return '明天'
    return d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
  },

  completeReminder(e) {
    const id = e.currentTarget.dataset.id
    const reminders = wx.getStorageSync(STORAGE_KEYS.REMINDERS) || []
    const idx = reminders.findIndex(r => r.id === id)
    if (idx !== -1) {
      reminders[idx].done = true
      wx.setStorageSync(STORAGE_KEYS.REMINDERS, reminders)
      wx.showToast({ title: '已完成', icon: 'success' })
      this.loadData()
    }
  }
})
