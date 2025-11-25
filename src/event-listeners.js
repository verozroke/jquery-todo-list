const debounceSearch = debounce(filterBySearch, 300)

function initAllEventListeners() {
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

  $('#todo-list').on('blur', '.task-text-input', (e) => escapeEditTask(e))

  $('#todo-list').on('keypress', '.task-text-input', (e) => editTask(e))

  $('#todo-list').on('dblclick', '.task-text', (e) => enterEditTask(e))

  $('#clear-tasks-button').click((e) => clearTasks())

  $('#clear-doned-tasks-button').click((e) => clearDonedTasks())

  createDialog('#history-dialog', historyDialogOptions)

  $('#history-button').click((e) => {
    openDialog('#history-dialog')
    renderUserHistory(getUserHistory())
  })
}
