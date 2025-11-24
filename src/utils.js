function debounce(callback, delay) {
  let timeoutId = null
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => callback(...args), delay)
  }
}

function isEnterPressed(e) {
  return e.which === 13
}

function isEscPressed(e) {
  console.log(e.key)
  return e.key === 'Escape'
}

function checkForTaskCopy(baseName) {
  let count = 0

  tasks.forEach((task) => {
    if (task.text === baseName || task.text.startsWith(baseName + ' (')) count++
  })

  return count === 0 ? baseName : `${baseName} (${count})`
}
