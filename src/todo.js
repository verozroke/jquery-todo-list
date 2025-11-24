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

function clearTasks() {
  tasks = []
  localStorage.setItem('tasks', JSON.stringify(tasks))
  updateTodoListTemplate()
}

function clearDonedTasks() {
  tasks = tasks.filter((t) => !t.doned)
  localStorage.setItem('tasks', JSON.stringify(tasks))
  updateTodoListTemplate()
}

function markAsDone(p, donedTask) {
  $(p).toggleClass(
    'text-green-500 border-green-500 bg-green-200 text-sky-500 border-sky-500 bg-sky-200'
  )

  const idx = tasks.findIndex((t) => t.text === donedTask)

  if ($(p).attr('data-doned')) {
    $(p).removeAttr('data-doned')
    tasks[idx].doned = false
  } else {
    $(p).attr('data-doned', 'true')
    tasks[idx].doned = true
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
  renderTaskCount(tasks.length, getDonedTaskCount(tasks))
  renderDonedTasks(tasks)
}
