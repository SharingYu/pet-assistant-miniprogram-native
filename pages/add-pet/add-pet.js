const STORAGE_KEY = 'pets'

Page({
  data: {
    form: {
      name: '',
      type: 'dog',
      breed: '',
      birthday: '',
      weight: '',
      gender: 'male',
      neutered: false
    },
    editId: null
  },

  onLoad(options) {
    if (options.id) {
      const pets = wx.getStorageSync(STORAGE_KEY) || []
      const pet = pets.find(p => p.id === options.id)
      if (pet) {
        this.setData({ form: { ...pet }, editId: options.id })
      }
    }
  },

  onNameChange(e) {
    this.setData({ 'form.name': e.detail.value })
  },

  onBreedChange(e) {
    this.setData({ 'form.breed': e.detail.value })
  },

  onWeightChange(e) {
    this.setData({ 'form.weight': e.detail.value })
  },

  onBirthdayChange(e) {
    this.setData({ 'form.birthday': e.detail.value })
  },

  selectType(e) {
    this.setData({ 'form.type': e.currentTarget.dataset.type })
  },

  selectGender(e) {
    this.setData({ 'form.gender': e.currentTarget.dataset.gender })
  },

  onNeuteredChange(e) {
    this.setData({ 'form.neutered': e.detail.value })
  },

  savePet() {
    if (!this.data.form.name) {
      wx.showToast({ title: '请输入宠物名称', icon: 'none' })
      return
    }
    const pets = wx.getStorageSync(STORAGE_KEY) || []
    const id = this.data.editId || Date.now().toString()
    const pet = { ...this.data.form, id }
    
    const idx = pets.findIndex(p => p.id === id)
    if (idx !== -1) pets[idx] = pet
    else pets.push(pet)
    
    wx.setStorageSync(STORAGE_KEY, pets)
    wx.showToast({ title: '保存成功', icon: 'success' })
    
    // 延迟返回，让用户看到保存成功的提示
    setTimeout(() => {
      wx.navigateBack()
    }, 1200)
  }
})
