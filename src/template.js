function initTodoListTemplate() {
  currentTodoListTemplate = localStorage.getItem('current-todo-list')
  tasks = localStorage.getItem('tasks')

  if (!tasks) {
    tasks = []
    localStorage.setItem('tasks', JSON.stringify([]))
  } else {
    tasks = JSON.parse(tasks)
  }
}

function generateTodoListTemplate(todos) {
  return todos.reduce((acc, task) => acc + SingleTaskComponent(task), '')
}

function generateHistoryListTemplate(histories2gen) {
  return histories2gen.reduce((acc, historyEntity) => {
    return (
      acc +
      SingleHistoryComponent(
        historyEntity.when,
        historyEntity.what,
        historyEntity.taskName
      )
    )
  }, '')
}
