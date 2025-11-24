function renderToDoList(todosHtml) {
  $('#todo-list').html(todosHtml)
}

function renderDonedTasks(todos) {
  todos.forEach((t) => {
    if (!t.doned) return
    const parent = $(`.task-done-button[data-task="${t.text}"]`)
      .parent()
      .parent()
    markAsDone(parent, t.text)
  })
}

function getDonedTaskCount(todos) {
  return todos.filter((t) => t.doned).length
}

function renderTaskCount(count, donedCount) {
  $('#task-count').html(
    `Всего: ${count} | Выполнено: ${donedCount} | Осталось: ${
      count - donedCount
    }`
  )
}
