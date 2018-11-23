const TAU = Math.PI * 2

export const render = ({ element, model, radius = 6 }) => {
  const { color, x, y } = model.toJS()
  const context = element.getContext('2d')

  context.fillStyle = color
  context.beginPath()
  context.arc(x, y, radius, 0, TAU)
  context.fill()
}

export default render
