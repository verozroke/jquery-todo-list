// type Task = {
// text: string
// doned: boolean
// }
let tasks = []
let currentTodoListTemplate = ``
const debounceSearch = debounce(filterBySearch, 300)

$(document).ready(() => {
  currentTodoListTemplate = localStorage.getItem('current-todo-list')
  tasks = localStorage.getItem('tasks')
  if (!tasks) {
    tasks = []
    localStorage.setItem('tasks', JSON.stringify([]))
  }

  if (!currentTodoListTemplate) {
    updateTodoListTemplate()
    localStorage.setItem('current-todo-list', currentTodoListTemplate)
  } else {
    tasks = JSON.parse(tasks)
    updateTodoListTemplate()
  }

  $('#task-button').click((e) => {
    addTask($('#task-input').val())
  })

  $('#task-input').keypress((e) => {
    if (!isEnterPressed(e)) return

    addTask($('#task-input').val())
  })

  $('#search-input').on('input', '', (e) => {
    debounceSearch(e.target.value)
  })

  $('#search-button').click((e) => filterBySearch(e.target.value))

  $('#todo-list').on('click', '.task-delete-button', (e) => {
    const deletedTask = $(e.target).data('task')
    deleteTask(deletedTask)
  })

  $('#todo-list').on('click', '.task-done-button', (e) => {
    const donedTask = $(e.target).data('task')
    markAsDone($(e.target).parent().parent(), donedTask)
    renderTaskCount(tasks.length, getDonedTaskCount(tasks))
  })
})

function filterBySearch(q) {
  const filteredTasks = tasks.filter((t) => t.text.startsWith(q))
  const filteredTodoListTemplate = generateTodoListTemplate(filteredTasks)
  renderToDoList(filteredTodoListTemplate)
  renderDonedTasks(filteredTasks)
}

function addTask(task) {
  task = task.trim()

  if (task === '') return

  task = checkForTaskCopy(task)

  tasks.push({ text: task, doned: false })
  localStorage.setItem('tasks', JSON.stringify(tasks))
  updateTodoListTemplate()
  $('#task-input').val('')
}

function deleteTask(task) {
  tasks = tasks.filter((t) => t.text !== task)
  localStorage.setItem('tasks', JSON.stringify(tasks))
  updateTodoListTemplate()
}
function markAsDone(p, donedTask) {
  $(p).toggleClass(
    'text-green-500 border-green-500 bg-green-200 text-sky-500 border-sky-500 bg-sky-200'
  )

  const taskIdx = tasks.findIndex((t) => t.text === donedTask)
  if ($(p).attr('data-doned')) {
    $(p).removeAttr('data-doned')
    tasks[taskIdx].doned = false
  } else {
    $(p).attr('data-doned', 'true')
    tasks[taskIdx].doned = true
  }
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
function updateTodoListTemplate() {
  currentTodoListTemplate = generateTodoListTemplate(tasks)

  renderToDoList(currentTodoListTemplate)

  localStorage.setItem(
    'current-todo-list',
    JSON.stringify(currentTodoListTemplate)
  )

  renderDonedTasks(tasks)
}

function checkForTaskCopy(baseName) {
  let count = 0

  tasks.forEach((task) => {
    if (task.text === baseName || task.text.startsWith(baseName + ' (')) count++
  })
  return count === 0 ? baseName : `${baseName} (${count})`
}

function isEnterPressed(e) {
  return e.which === 13
}

function SingleTaskComponent(task) {
  return `
    <span doned="${task.doned}" class="task-item py-4 px-4 flex items-center justify-between rounded-md border-sky-500 border-2 bg-sky-200 text-sky-500 font-medium">
      <span>${task.text}</span>
      <span class="flex items-center gap-2">
            <span class="task-done-button select-none" data-task="${task.text}">✔</span>  
            <span class="task-delete-button select-none" data-task="${task.text}">x</span>  
      </span>
    </span>
  `
}

function renderToDoList(todos) {
  $('#todo-list').html(todos)
}

function debounce(callback, delay) {
  let timeoutId = null
  return (...args) => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      callback(...args)
    }, delay)
  }
}

function renderDonedTasks(todos) {
  todos.forEach((t) => {
    if (!t.doned) return
    const PARENT_TASK = $(`.task-done-button[data-task="${t.text}"]`)
      .parent()
      .parent()
    markAsDone(PARENT_TASK, t.text)
  })
}

function generateTodoListTemplate(todos) {
  return todos.reduce((acc, task) => {
    return acc + SingleTaskComponent(task)
  }, '')
}
