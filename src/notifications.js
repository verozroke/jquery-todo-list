function initEverydayNotification() {
  setInterval(() => {
    showNotification('Daily Reminder', "Don't forget your tasks today!")
  }, 24 * 60 * 60 * 1000)
}

function showNotification(title, body) {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: './src/assets/notification.jpg',
    })
  }
}

async function checkForNotification() {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission()
    console.log('Permission:', permission)
  }
}
