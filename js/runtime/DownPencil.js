import Pencil from './Pencil.js'
import Sprite from '../base/Sprite.js'

export default class DownPencil extends Pencil {
  constructor(top) {
    const image = Sprite.getImage('pencilDown')
    super(image, top)
  }

  draw() {
    let gap = window.innerHeight / 5
    this.y = this.top + gap
    super.draw()
  }
}