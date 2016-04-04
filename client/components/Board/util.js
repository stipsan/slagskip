
export const indexToCSSTranslate = index => {
  const x = (index % 10) * 100
  const y = (index - (index % 10)) * 10
  return `translate(${ x }%, ${ y }%)`
}