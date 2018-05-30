import Sprite from '../base/Sprite.js'

// 循环渲染三个小鸟图片

export default class Brids extends Sprite{
  constructor() {
    const image = Sprite.getImage('birds')
    super(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height)

    // 三张图存一个数组，小鸟width:34,height:24,padding-topbottom:10,padding-leftright:9
    this.clippingX = [9, 9+34+18, 9+34+18+34+18]
    this.clippingY = [10, 10, 10]
    this.clippingWidth = [34, 34, 34]
    this.clippingHeight = [24, 24, 24]
    const birdX = window.innerWidth / 4
    this.birdsX = [birdX, birdX, birdX, birdX]
    const birdY = window.innerHeight / 2
    this.birdsY = [birdY, birdY, birdY, birdY]
    const birdWidth = 34
    const birdHeight = 24
    this.birdsWidth = [birdWidth, birdWidth, birdWidth, birdWidth]
    this.birdsHeight = [birdHeight, birdHeight, birdHeight, birdHeight]
    this.y = [birdY, birdY, birdY]
    this.index = 0
    this.count = 0
    this.time = 0
  }

  draw() {
    // 切换三只小鸟的速度
    const speed = 0.2
    this.count = this.count + speed
    if (this.index === 2) {
      this.count = 0
    }
    // 减速 
    this.index = Math.floor(this.count)
    // 自由落体
    const g = 0.98 / 2
  
    const offsetY = (g * this.time * (this.time - 30)) / 2 

    for (let i = 0; i <= 2; i++) {
      this.birdsY[i] = offsetY + this.y[i]
    } 

    this.time++

    super.draw(this.img, this.clippingX[this.index], this.clippingY[this.index], 
      this.clippingWidth[this.index], this.clippingHeight[this.index],
      this.birdsX[this.index], this.birdsY[this.index],
      this.birdsWidth[this.index], this.birdsHeight[this.index])
  }
}