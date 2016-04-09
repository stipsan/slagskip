//@TODO rewrite to async/await
let memoizedPermission = undefined
export function requestNotificationPermission(callback) {
  if(memoizedPermission !== undefined) {
    return callback(memoizedPermission)
  }
  if (!('Notification' in window)) {
    return callback(memoizedPermission = false)
  }
  if (Notification.permission === 'granted') {
    return callback(memoizedPermission = true)
  }
  if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      callback(memoizedPermission = permission === 'granted')
    })
  }
}

export function sendNotification (title, options) {
  if ('Notification' in window) {
    return new Notification(title, options)
  } else if ('mozNotification' in navigator) {
    // Gecko < 22
    return navigator.mozNotification
             .createNotification(title, options.body, options.icon)
             .show()
  } else {
    return alert(title + ': ' + options.body)
  }
}