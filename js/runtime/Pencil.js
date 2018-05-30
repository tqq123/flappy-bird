import Sprite from '../base/Sprite.js'
import Director from '../Director.js'

export default class Pencil extends Sprite{
  constructor(image, top) {
    super(image, 0, 0, image.width, image.height, window.innerWidth, 0, image.width, image.height)
    this.top = top
  }

  draw() {
    this.x = this.x - Director.getInstance().moveSpeed
    super.draw(this.img, 0, 0, this.img.width, this.img.height, this.x, this.y, this.width, this.height)
  }
}