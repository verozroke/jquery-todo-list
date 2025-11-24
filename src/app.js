$(document).ready(() => {
  const debounceSearch = debounce(filterBySearch, 300)

  currentTodoListTemplate = localStorage.getItem('current-todo-list')
  tasks = localStorage.getItem('tasks')

  if (!tasks) {
    tasks = []
    localStorage.setItem('tasks', JSON.stringify([]))
  } else {
    tasks = JSON.parse(tasks)
  }

  updateTodoListTemplate()

  $('#task-button').click(() => addTask($('#task-input').val()))

  $('#task-input').keypress((e) => {
    if (!isEnterPressed(e)) return
    addTask($('#task-input').val())
  })

  $('#search-input').on('input', (e) => debounceSearch(e.target.value))

  $('#search-button').click((e) => filterBySearch(e.target.value))

  $('#todo-list').on('click', '.task-delete-button', (e) => {
    const deletedTask = $(e.target).data('task')
    deleteTask(deletedTask)
  })

  $('#todo-list').on('click', '.task-done-button', (e) => {
    const donedTask = $(e.target).data('task')
    const parent = $(e.target).parent().parent()
    markAsDone(parent, donedTask)
    renderTaskCount(tasks.length, getDonedTaskCount(tasks))
  })

  $('#todo-list').on('blur', '.task-text-input', (e) => {
    const editedTask = $(e.target).parent().data('task').replace(' ', '')
    const inputSelector = `#task-text-input-${editedTask}`

    $(e.target).parent().toggleClass('hidden')
    $(inputSelector).toggleClass('hidden')
    $(e.target).val($(e.target).data('task'))

    updateTodoListTemplate()
  })

  $('#todo-list').on('keypress', '.task-text-input', (e) => {
    const editedTask = $(e.target).parent().data('task').replace(' ', '')
    const inputSelector = `#task-text-input-${editedTask}`

    if (!isEnterPressed(e)) return
    if (!$(inputSelector).val().trim()) return

    $(e.target).parent().toggleClass('hidden')
    $(inputSelector).toggleClass('hidden')
    editedTaskIdx = tasks.findIndex(
      (t) => t.text.replace(' ', '') === editedTask
    )
    tasks[editedTaskIdx].text = $(inputSelector).val().trim()
    localStorage.setItem('tasks', JSON.stringify(tasks))

    updateTodoListTemplate()
  })

  $('#todo-list').on('dblclick', '.task-text', (textEvent) => {
    const editedTask = $(textEvent.target).data('task').replace(' ', '')
    const inputSelector = `#task-text-input-${editedTask}`

    $(textEvent.target).toggleClass('hidden')
    $(inputSelector).toggleClass('hidden')
    $(inputSelector).focus()
    $(inputSelector).val(editedTask)
  })

  $('#clear-tasks-button').click((e) => clearTasks())

  $('#clear-doned-tasks-button').click((e) => clearDonedTasks())
})
