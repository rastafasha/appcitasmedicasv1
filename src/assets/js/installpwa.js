/** This code works only on properly formatted PWAs **/

var beforeInstallPrompt = null;

window.addEventListener("beforeinstallprompt", eventHandler, errorHandler);

function eventHandler(event) {
  beforeInstallPrompt = event;
  document.getElementById("installBtn").removeAttribute("disabled");
}

function errorHandler(event) {
  console.log("error: " + event);
}

function instalar() {
  if (beforeInstallPrompt) beforeInstallPrompt.prompt();
}