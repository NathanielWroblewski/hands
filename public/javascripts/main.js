import { PIPE_COLORS, HUDDLE_COLORS, DEGREES, BOUNDS, WIDTH, HEIGHT } from './constants/index.js'
import { sample } from './utilities/index.js'
import clear from './views/clear.js'
import renderHand from './views/hand.js'
import renderBall from './views/ball.js'
import renderImage from './views/image.js'
import Particle from './models/particle.js'

const pipehands = document.querySelector('.pipes .hands')
const pipeballs = document.querySelector('.pipes .balls')
const huddlehands = document.querySelector('.huddle-break .hands')
const huddleballs = document.querySelector('.huddle-break .balls')
const hidden = document.querySelector('.hidden')

let pipes = [
  new Particle({ color: sample(PIPE_COLORS) })
]

let huddle = []
let paused = []

PIPE_COLORS.concat(HUDDLE_COLORS).forEach(color => (
  DEGREES.forEach(rotation => (
    renderImage({ element: hidden, rotation, color })
  ))
))

const pipesStep = () => {
  clear({ element: pipehands })

  if (Math.random() < 0.02) {
    pipes.push(new Particle({ color: sample(PIPE_COLORS) }))
  }

  pipes.forEach(hand => {
    if (Math.random() < 0.007) {
      hand.bend()
    }

    hand.move()

    renderHand({ element: pipehands, model: hand })
    renderBall({ element: pipeballs, model: hand })
  })

  pipes = pipes.filter(hand => (
    hand.position.x < WIDTH + BOUNDS &&
    hand.position.x > -BOUNDS &&
    hand.position.y < HEIGHT + BOUNDS &&
    hand.position.y > -BOUNDS
  ))
}

const huddleBreakStep = () => {
  clear({ element: huddlehands })

  if (Math.random() < 0.05) {
    const newHand = new Particle({ color: sample(HUDDLE_COLORS) })

    newHand.orient()
    huddle.push(newHand)
  }

  huddle.forEach(hand => {
    if (hand.paused) {
      renderHand({ element: huddlehands, model: hand })
    } else if (hand.isCentered() || hand.touchesAny(paused)) {
      hand.pause()
      paused.push(hand)

      renderHand({ element: huddlehands, model: hand })
    } else {
      hand.move()

      renderHand({ element: huddlehands, model: hand })
      renderBall({ element: huddleballs, model: hand })
    }
  })

  if (huddle.length > 150) {
    huddle = []

    clear({ element: huddlehands })
    clear({ element: huddleballs })
  }
}

const step = () => {
  pipesStep()
  huddleBreakStep()

  window.requestAnimationFrame(step)
}

window.requestAnimationFrame(step)
