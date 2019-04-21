export function shuffle (arr) {
  let _arr = [...arr]

  for (let i = _arr.length - 1; i--;) {
    const j = Math.floor(Math.random() * i)

    let temp = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = temp
  }

  return _arr
}

export function debounce (fn, delay) {
  let timer

  return function () {
    const context = this
    const args = arguments

    clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}
