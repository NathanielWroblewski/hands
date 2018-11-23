export const clear = ({ element }) => {
  const context = element.getContext('2d')

  context.clearRect(0, 0, element.width, element.height)
}

export default clear
