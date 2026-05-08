const app = document.getElementById("app");

const pages = {
  home: `
    <h1>ホーム</h1>
    <p>動作確認中</p>
  `,
  about: `
    <h1>紹介</h1>
    <p>切り替えテスト</p>
    <h2>メモ</h2>
    <input id="memoInput" type="text" placeholder="入力">
    <button onclick="saveMemo()">保存</button>
    <button onclick="loadMemo()">読み込み</button>
    <p id="output"></p>
  `
};

function navigate(page) {
  if (!app) {
    console.error("app要素が見つかりません");
    return;
  }

  app.innerHTML = pages[page] ?? "<h1>ページなし</h1>";
}

// 初期表示
navigate("home");

window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js")
      .then(() => console.log("SW登録成功"))
      .catch(err => console.error("SW登録失敗", err));
  }
});

function saveMemo() {
  const value = document.getElementById("memoInput").value;

  localStorage.setItem("memo", value);

  alert("保存しました");
}

function loadMemo() {
  const value = localStorage.getItem("memo");

  document.getElementById("output").innerText =
    value ? value : "何も保存されていません";
}

