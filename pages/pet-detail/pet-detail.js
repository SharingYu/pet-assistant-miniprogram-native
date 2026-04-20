const STORAGE_KEY = 'pets'

Page({
  data: {
    pet: {},
    healthRecords: []
  },

  onLoad(options) {
    if (options.id) {
      const pets = wx.getStorageSync(STORAGE_KEY) || []
      const pet = pets.find(p => p.id === options.id)
      this.setData({ pet: pet || {} })
    }
  },

  editPet() {
    wx.navigateTo({ url: '/pages/add-pet/add-pet?id=' + this.data.pet.id })
  },

  getPetEmoji(type) {
    return type === 'dog' ? '🐕' : type === 'cat' ? '🐱' : '🐰'
  }
})
