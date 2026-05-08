const viewer = document.getElementById("viewer");
const urlInput = document.getElementById("urlInput");

let historyStack = [];
let currentIndex = -1;

function go() {
  let url = urlInput.value.trim();

  if (!url.startsWith("http")) {
    url = "https://" + url;
  }

  loadPage(url);

  // 履歴更新
  historyStack = historyStack.slice(0, currentIndex + 1);
  historyStack.push(url);
  currentIndex++;
}

function loadPage(url) {
  viewer.src = url;
  urlInput.value = url;
}

function back() {
  if (currentIndex > 0) {
    currentIndex--;
    loadPage(historyStack[currentIndex]);
  }
}

function forward() {
  if (currentIndex < historyStack.length - 1) {
    currentIndex++;
    loadPage(historyStack[currentIndex]);
  }
}
