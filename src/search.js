function filterBySearch(q) {
  const filtered = tasks.filter((t) => t.text.startsWith(q))
  const template = generateTodoListTemplate(filtered)

  renderToDoList(template)
  renderTaskCount(filtered.length, getDonedTaskCount(filtered))
  renderDonedTasks(filtered)
}
