//@TODO rewrite to async/await
let memoizedPermission = undefined;
export function requestNotificationPermission(callback = ::console.log) {
  if(memoizedPermission !== undefined) {
    return callback(memoizedPermission);
  }
  if (!("Notification" in window)) {
    return callback(memoizedPermission = false);
  }
  if (Notification.permission === "granted") {
    return callback(memoizedPermission = true);
  }
  if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      callback(memoizedPermission = permission === "granted");
    });
  }
}

export function sendNotification (title, options) {
  console.log('sendNotification', title);
  // Memoize based on feature detection.
  if ("Notification" in window) {
    sendNotification = function (title, options) {
      return new Notification(title, options);
    };
  } else if ("mozNotification" in navigator) {
    sendNotification = function (title, options) {
      // Gecko < 22
      return navigator.mozNotification
               .createNotification(title, options.body, options.icon)
               .show();
    };
  } else {
    sendNotification = function (title, options) {
      alert(title + ": " + options.body);
    };
  }
  return sendNotification(title, options);
};