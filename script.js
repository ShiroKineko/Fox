const app = document.getElementById("app");

// 画面データ
const pages = {
  home: `
    <h1>ホーム</h1>
    <p>ここが最初の画面です</p>
  `,
  about: `
    <h1>紹介</h1>
    <p>これは1ページアプリのデモです</p>
  `
};

// 画面切り替え
function navigate(page) {
  app.innerHTML = pages[page] || "<h1>404</h1>";
}

// 初期表示
navigate("home");