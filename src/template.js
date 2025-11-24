function generateTodoListTemplate(todos) {
  return todos.reduce((acc, task) => acc + SingleTaskComponent(task), '')
}
