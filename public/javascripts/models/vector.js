class Vector {
  constructor ({ x = 0, y = 0 }) {
    this.x = x
    this.y = y
  }

  add ({ x, y }) {
    return new Vector({ x: this.x + x, y: this.y + y })
  }

  subtract ({ x, y }) {
    return this.add({ x: -x, y: -y })
  }

  multiply (scalar) {
    return new Vector({ x: this.x * scalar, y: this.y * scalar })
  }

  divide (scalar) {
    return this.multiply(1 / scalar)
  }

  dot ({ x, y }) {
    return (this.x * x) + (this.y * y)
  }

  magnitude () {
    return Math.sqrt(this.dot(this))
  }

  normalize () {
    return this.divide(this.magnitude())
  }

  distance (vector) {
    return this.subtract(vector).magnitude()
  }
}

export default Vector
