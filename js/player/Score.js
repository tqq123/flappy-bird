import DataStore from '../base/DataStore.js'

export default class Score {
  constructor() {
    this.ctx = DataStore.getInstance().ctx
    this.scoreNumber = 0
    // 只加一次
    this.isScore = true
  }

  draw() {
    this.ctx.font = '25px Arial'
    this.ctx.fillStyle = '#000'
    this.ctx.fillText(
      this.scoreNumber,
      window.innerWidth / 2,
      window.innerHeight / 18,
      1000
    )
  }
}

