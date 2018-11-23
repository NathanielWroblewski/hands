import Vector from './vector.js'
import { WIDTH, HEIGHT, OFFSET, SPEED, DEGREES } from '../constants/index.js'

class Particle {
  constructor ({ position, velocity, color, paused }) {
    this.position = position
    this.velocity = velocity
    this.color = color
    this.paused = paused || false

    if (!position || velocity) {
      this.seed()
    }
  }

  seed () {
    const seedValue = Math.random()
    const start = Math.floor(Math.random() * (WIDTH - (2 * OFFSET))) + OFFSET

    if (seedValue > 0.75) {
      this.position = new Vector({ x: start, y: HEIGHT + OFFSET })
      this.velocity = new Vector({ x: 0, y: -SPEED })
    } else if (seedValue > 0.5) {
      this.position = new Vector({ x: start, y: -OFFSET })
      this.velocity = new Vector({ x: 0, y: SPEED })
    } else if (seedValue > 0.25) {
      this.position = new Vector({ x: -OFFSET, y: start })
      this.velocity = new Vector({ x: SPEED, y: 0 })
    } else {
      this.position = new Vector({ x: WIDTH + OFFSET, y: start })
      this.velocity = new Vector({ x: -SPEED, y: 0 })
    }
  }

  move () {
    this.position = this.position.add(this.velocity)
  }

  pause () {
    this.paused = true
  }

  touchesAny (particles = []) {
    return !!particles.find(particle => this.position.distance(particle.position) < 25)
  }

  bend () {
    const direction = Math.random() > 0.5 ? -1 : 1

    if (this.velocity.x) {
      this.velocity.x = 0
      this.velocity.y = direction * SPEED
    } else {
      this.velocity.x = direction * SPEED
      this.velocity.y = 0
    }
  }

  get rotation () {
    const { x, y } = this.velocity

    return Math.round(Math.atan2(y, x) * (180 / Math.PI)) // image rotation offset
  }

  orient () {
    const theta = DEGREES[Math.floor(Math.random() * DEGREES.length)]
    const hyp = Math.floor(Math.sqrt(((WIDTH / 2) * (WIDTH / 2)) + ((HEIGHT / 2) * (HEIGHT / 2))))
    const x = (hyp * Math.cos(theta * Math.PI / 180)) + (WIDTH / 2)
    const y = (hyp * Math.sin(theta * Math.PI / 180)) + (HEIGHT / 2)
    const center = new Vector({ x: WIDTH / 2, y: HEIGHT / 2 })

    this.position = new Vector({ x, y })
    this.velocity = center.subtract(this.position).divide(this.position.magnitude()).normalize()
  }

  isCentered () {
    const center = new Vector({ x: WIDTH / 2, y: HEIGHT / 2 })

    return this.position.distance(center) < 40
  }

  toJS () {
    const { x, y } = this.position

    return { x, y, rotation: this.rotation, color: this.color }
  }
}

export default Particle
