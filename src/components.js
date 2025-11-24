function SingleTaskComponent(task) {
  return `
    <span data-task="${task.text}" doned="${
    task.doned
  }" class="task-item py-4 px-4 flex items-center justify-between gap-10 rounded-md border-sky-500 border-2 bg-sky-200 text-sky-500 dark:bg-sky-700 dark:text-zinc-300 dark:border-sky-800 hover:scale-[1.02] transition font-medium">
      <span class="task-text select-none" data-task="${task.text}">${
    task.text
  }</span>
      <input type="text" id="task-text-input-${task.text.replace(
        ' ',
        ''
      )}" class="hidden task-text-input text-sm border-1 flex-1 border-slate-400 font-medium tracking-tight focus:border-slate-700 bg-slate-100  px-1 rounded-sm"></input>
      <span class="flex items-center gap-2">
        <span class="task-done-button select-none" data-task="${
          task.text
        }">✔</span>  
        <span class="task-delete-button select-none" data-task="${
          task.text
        }">x</span>  
      </span>
    </span>
  `
}
