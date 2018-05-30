import DataStore from './base/DataStore.js'
import UpPencil from './runtime/UpPencil.js'
import DownPencil from './runtime/DownPencil.js'

export default class Director {
  constructor() {
    this.dataStore = DataStore.getInstance()
    this.moveSpeed = 2
  }

  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director()
    }
    return Director.instance
  }

  createPencil() {
    const minTop = window.innerHeight / 8
    const maxTop = window.innerHeight / 2
    const top = minTop + Math.random() * (maxTop - minTop)
    this.dataStore.get('pencils').push(new UpPencil(top))
    this.dataStore.get('pencils').push(new DownPencil(top))
  }

  birdsEvent() {
    // 高度叠加
    for (let i = 0; i <= 2; i++) {
      this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i]
    }
    this.dataStore.get('birds').time = 0
  }

  // 判断小鸟是否撞击铅笔
  // isStrike(bird, pencil) {
  //   let s = false
  //   if (bird.top > pencil.bottom || bird.bottom < pencil.top || bird.right < pencil.left || bird.left > pencil.right) {
  //     s = true
  //   }
    
  //   return !s
  // }
  // 小鸟碰撞判断
  check() {
    const birds = this.dataStore.get('birds')
    const land = this.dataStore.get('land')
    const pencils = this.dataStore.get('pencils')
    const score = this.dataStore.get('score')
    // 地板
    if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
      this.isGameOver = true
    }
    const birdX = birds.birdsX[0] + birds.birdsWidth[0] - 5
    const birdY = birds.birdsY[0] + birds.birdsHeight[0]
    if ((birdY >= pencils[1].y && birdX >= pencils[0].x)  || (birds.birdsY[0] <= pencils[0].top && birdX >= pencils[0].x)) {
      if (birds.birdsX[0] > pencils[0].x + pencils[0].img.width) {
        // 加分
        if (score.isScore) {
          score.scoreNumber++
          score.isScore = false
        }
        return
      }
      
      // 笔尖碰撞
      if (birdX > pencils[0].x && birdX < pencils[0].x + pencils[0].width / 2 && birdY > pencils[0].top - 70 && birdY < pencils[0].top) {
        
      }

      this.isGameOver = true
    }

    // 小鸟的边框模型
    // const birdsBorder = {
    //   top: birds.y[0],
    //   bottom: birds.birdsY[0] + birds.birdsHeight[0],
    //   left: birds.birdsX[0],
    //   right: birds.birdsX[0] + birds.birdsHeight[0]
    // }

    // const length = pencils.length
    // for (let i = 0; i < length; i++) {
    //   const pencil = pencils[i]
    //   // 铅笔的边框模型
    //   const pencilsBorder = {
    //     top: pencil.y,
    //     bottom: pencil.y + pencil.height,
    //     left: pencil.x,
    //     right: pencil.x + pencil.width
    //   }
    //   if(this.isStrike(birdsBorder, pencilsBorder)) {
    //     console.log('over')
    //     this.isGameOver = true
    //   }
    // }

    // if (birds.birdsX[0] > pencils[0].x + pencils[0].img.width) {
    //   // 加分
    //   if (score.isScore) {
    //     score.scoreNumber++
    //     score.isScore = false
    //   }
    // }
  }

  run() {
    this.check()
    if (!this.isGameOver) {
      this.dataStore.get('background').draw()
      const pencils = this.dataStore.get('pencils')
      // 销毁铅笔
      if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
        pencils.shift()
        pencils.shift()
        this.dataStore.get('score').isScore = true
      }

      // 创建铅笔
      if (pencils[0].x <= (window.innerWidth - pencils[0].width)/ 2 && pencils.length === 2) {
        this.createPencil()
      }

      pencils.forEach(val => {
        val.draw()
      })
      this.dataStore.get('land').draw()
      this.dataStore.get('score').draw()
      this.dataStore.get('birds').draw()
      // 动画渲染
      let timer = requestAnimationFrame(() => this.run())
      this.dataStore.put('timer', timer)
    } else {
      // 游戏结束 停止渲染
      this.dataStore.get('startButton').draw()
      cancelAnimationFrame(this.dataStore.get('timer'))
      this.dataStore.destory()
    }
  }
}