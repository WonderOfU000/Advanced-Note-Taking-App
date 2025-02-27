// univer.js
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className =
    "alert alert-info animate__animated animate__fadeInDown";
  notification.innerText = message;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.classList.add("animate__fadeOutUp");
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 1000);
  }, 3000);
}
