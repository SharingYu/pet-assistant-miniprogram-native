const STORAGE_KEY = 'pets'

const DIAGNOSIS_TYPES = [
  { id: 'skin', icon: '🔴', name: '皮肤', desc: '瘙痒、红疹、掉毛等' },
  { id: 'eye', icon: '👁️', name: '眼睛', desc: '分泌物、充血等' },
  { id: 'feces', icon: '💩', name: '排泄物', desc: '形态、颜色异常等' },
  { id: 'behavior', icon: '🌀', name: '行为', desc: '异常动作、姿态等' },
  { id: 'mouth', icon: '🦷', name: '口腔', desc: '牙龈、口气等' },
  { id: 'ear', icon: '👂', name: '耳部', desc: '分泌物、瘙痒等' }
]

Page({
  data: {
    step: 1,
    pets: [],
    selectedPet: null,
    selectedType: null,
    types: DIAGNOSIS_TYPES,
    imageSrc: '',
    result: null
  },

  onLoad() {
    this.loadPets()
  },

  loadPets() {
    const pets = wx.getStorageSync(STORAGE_KEY) || []
    this.setData({ pets })
  },

  selectPet(e) {
    const id = e.currentTarget.dataset.id
    const pet = this.data.pets.find(p => p.id === id)
    this.setData({ selectedPet: pet, step: 2 })
  },

  goAddPet() {
    wx.navigateTo({ url: '/pages/add-pet/add-pet' })
  },

  selectType(e) {
    const id = e.currentTarget.dataset.id
    const type = this.data.types.find(t => t.id === id)
    this.setData({ selectedType: type, step: 3 })
  },

  goBack() {
    if (this.data.step > 1) {
      this.setData({ step: this.data.step - 1 })
    }
  },

  chooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({ imageSrc: res.tempFilePaths[0] })
      }
    })
  },

  submitDiagnosis() {
    if (!this.data.imageSrc) return
    this.setData({ step: 4 })
    
    // 模拟AI诊断
    setTimeout(() => {
      const severities = ['green', 'yellow', 'red']
      const severities2 = ['🟢 居家观察', '🟡 建议就医', '🔴 立即就医']
      const idx = Math.floor(Math.random() * 3)
      this.setData({
        result: {
          severity: severities[idx],
          severityLabel: severities2[idx],
          tags: ['轻度瘙痒', '皮肤泛红'],
          causes: ['可能是轻微皮肤过敏', '建议观察2-3天'],
          suggestion: '保持皮肤清洁，避免抓挠。如持续不缓解，建议就医。'
        },
        step: 5
      })
    }, 2000)
  },

  saveResult() {
    wx.showToast({ title: '已保存', icon: 'success' })
  },

  reset() {
    this.setData({
      step: 1,
      selectedPet: null,
      selectedType: null,
      imageSrc: '',
      result: null
    })
  }
})
