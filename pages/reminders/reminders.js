const STORAGE_KEYS = {
  REMINDERS: 'reminders',
  PETS: 'pets'
}

Page({
  data: {
    reminders: [],
    pets: [],
    pendingCount: 0,
    doneCount: 0,
    petsCount: 0
  },

  onLoad() { this.loadData() },
  onShow() { this.loadData() },

  loadData() {
    const reminders = wx.getStorageSync(STORAGE_KEYS.REMINDERS) || []
    const pets = wx.getStorageSync(STORAGE_KEYS.PETS) || []
    this.setData({
      reminders,
      pets,
      pendingCount: reminders.filter(r => !r.done).length,
      doneCount: reminders.filter(r => r.done).length,
      petsCount: pets.length
    })
  },

  getIcon(type) {
    const m = { vaccine: '💉', deworm: '💊', checkup: '🏥', bath: '🛁', medicine: '💊', other: '📌' }
    return m[type] || '📌'
  },

  formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
  },

  toggleDone(e) {
    const id = e.currentTarget.dataset.id
    const reminders = this.data.reminders
    const idx = reminders.findIndex(r => r.id === id)
    if (idx !== -1) {
      reminders[idx].done = true
      wx.setStorageSync(STORAGE_KEYS.REMINDERS, reminders)
      wx.showToast({ title: '已完成', icon: 'success' })
      this.loadData()
    }
  }
})
