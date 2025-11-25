const historyDialogOptions = {
  minWidth: 768,
  autoOpen: false,
  show: {
    effect: 'explode',
    duration: 300,
  },
  hide: {
    effect: 'explode',
    duration: 300,
  },
  draggable: true,
}

const historyWhatMap = {
  doned: 'Вы отметили задачу выполненным',
  edited: 'Вы отредактировал задачу',
  deleted: 'Вы удалили задачу',
  added: 'Вы добавили задачу',
  cleared: 'Вы очистили все свои задачи',
  clearedDoned: 'Вы очистили все свои выполненные задачи',
}

// type History = {
//   when: string
//   what: 'doned' | 'edited' | 'deleted' | 'added' | 'cleared' | 'clearedDoned'
//   taskName: string
// }

function addUserHistoryEntity(historyEntity) {
  const { when, what, taskName } = historyEntity
  let localHistories = localStorage.getItem('histories')

  if (!localHistories || JSON.parse(localHistories).length <= 0) {
    localHistories = []
  } else {
    localHistories = JSON.parse(localHistories)
  }

  localHistories.push({ when, what, taskName })

  localStorage.setItem('histories', JSON.stringify(localHistories))
}

function renderUserHistory(histories) {
  const historyListTemplate = generateHistoryListTemplate(histories.reverse())
  $('#history-list').html(historyListTemplate)
}

function getUserHistory() {
  let localHistories = localStorage.getItem('histories')

  if (!localHistories || JSON.parse(localHistories).length <= 0) {
    localHistories = []
    return []
  }

  return JSON.parse(localHistories)
}
