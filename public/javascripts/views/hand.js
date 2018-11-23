const IMG_OFFSET = 90

export const render = ({ element, model }) => {
  const { color, rotation, x, y } = model.toJS()
  const degrees = (rotation + IMG_OFFSET) < 0 ? rotation + 360 + IMG_OFFSET : rotation + IMG_OFFSET
  const context = element.getContext('2d')
  const img = document.querySelector(`.rotation-${String(degrees).replace('.', '-')}.color-${color.replace('#', '')}`)
  const size = 50

  context.drawImage(img, x - (size / 2), y - (size / 2), size, size)
}

export default render
