
export const indexToCSSTranslate = (index, childrenCount = 1, rotated) => {
  const x = (index % 10) * (100 / (rotated ? 1 : childrenCount))
  const y = (index - (index % 10)) * (10 / (rotated ? childrenCount : 1))
  return `translate(${x}%, ${y}%)`
}
