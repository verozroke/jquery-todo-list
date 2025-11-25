$(document).ready(() => {
  checkForNotification()
  initEverydayNotification()
  initTodoListTemplate()
  updateTodoListTemplate()
  initAllEventListeners()
  $('#todo-list').sortable()
})
