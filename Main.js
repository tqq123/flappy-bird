import ResourceLoader from './js/base/ResourceLoader.js'
import Director from './js/Director.js'
import BackGround from './js/runtime/BackGround.js'
import Land from './js/runtime/Land.js'
import Brids from './js/player/Brids.js'
import StartButton from './js/player/StartButton.js'
import Score from './js/player/Score.js'
import DataStore from './js/base/DataStore.js'

export default class Main {
  constructor() {
    this.canvas = document.getElementById('game')
    this.ctx = this.canvas.getContext('2d')
    this.dataStore = DataStore.getInstance()
    this.director = Director.getInstance()
    const loader = ResourceLoader.create()
    loader.onLoaded(map => this.onResourceFirstLoaded(map))
  }

  onResourceFirstLoaded(map) {
    // 无需销毁
    this.dataStore.ctx = this.ctx
    this.dataStore.res = map
    this.init()
  }

  init() {
    this.director.isGameOver = false

    this.dataStore.put('background', BackGround)
    .put('land', Land).put('pencils', [])
    .put('birds', Brids).put('startButton', StartButton)
    .put('score', Score)
    this.registerEvent()
    // 创建铅笔
    this.director.createPencil()
    // 游戏开始
    this.director.run()
  }

  registerEvent() {
    this.canvas.addEventListener('touchstart', (e) => {
      if (this.director.isGameOver) {
        if (e.touches[0].clientX > window.innerWidth / 2 - 40 &&
         e.touches[0].clientX < window.innerWidth / 2 + 40 &&
         e.touches[0].clientY > window.innerHeight / 2 - 120 &&
         e.touches[0].clientY < window.innerHeight / 2
         ) {
          this.init()
        } 
      } else {
        this.director.birdsEvent()
      }
    })
  }
}