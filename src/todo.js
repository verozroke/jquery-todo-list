function addTask(task) {
  task = task.trim()
  if (task === '') return

  task = checkForTaskCopy(task)

  tasks.push({ text: task, doned: false })
  localStorage.setItem('tasks', JSON.stringify(tasks))

  addUserHistoryEntity({
    when: new Date(Date.now()).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    what: 'added',
    taskName: task,
  })

  showNotification('Вы крут!', `Вы добавили свою новую задачу: ${task}`)

  updateTodoListTemplate()
  $('#task-input').val('')
}

function deleteTask(task) {
  tasks = tasks.filter((t) => t.text !== task)
  localStorage.setItem('tasks', JSON.stringify(tasks))
  addUserHistoryEntity({
    when: new Date(Date.now()).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    what: 'deleted',
    taskName: task,
  })
  updateTodoListTemplate()
}

function clearTasks() {
  tasks = []
  localStorage.setItem('tasks', JSON.stringify(tasks))
  addUserHistoryEntity({
    when: new Date(Date.now()).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    what: 'cleared',
  })
  updateTodoListTemplate()
}

function clearDonedTasks() {
  tasks = tasks.filter((t) => !t.doned)
  localStorage.setItem('tasks', JSON.stringify(tasks))
  addUserHistoryEntity({
    when: new Date(Date.now()).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    what: 'clearedDoned',
  })

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

  addUserHistoryEntity({
    when: new Date(Date.now()).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    what: 'doned',
    taskName: donedTask,
  })
}

function editTask(e) {
  const editedTask = $(e.target).parent().data('task').replace(' ', '')
  const inputSelector = `#task-text-input-${editedTask}`

  if (!isEnterPressed(e)) return
  if (!$(inputSelector).val().trim()) return

  $(e.target).parent().toggleClass('hidden')
  $(inputSelector).toggleClass('hidden')
  editedTaskIdx = tasks.findIndex((t) => t.text.replace(' ', '') === editedTask)
  tasks[editedTaskIdx].text = $(inputSelector).val().trim()
  localStorage.setItem('tasks', JSON.stringify(tasks))
  addUserHistoryEntity({
    when: new Date(Date.now()).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    what: 'edited',
    taskName: editedTask,
  })
  updateTodoListTemplate()
}

function enterEditTask(e) {
  const editedTask = $(e.target).data('task').replace(' ', '')
  const inputSelector = `#task-text-input-${editedTask}`

  $(e.target).toggleClass('hidden')
  $(inputSelector).toggleClass('hidden')
  $(inputSelector).focus()
  $(inputSelector).val(editedTask)
}

function escapeEditTask(e) {
  const editedTask = $(e.target).parent().data('task').replace(' ', '')
  const inputSelector = `#task-text-input-${editedTask}`

  $(e.target).parent().toggleClass('hidden')
  $(inputSelector).toggleClass('hidden')
  $(e.target).val($(e.target).data('task'))

  updateTodoListTemplate()
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
