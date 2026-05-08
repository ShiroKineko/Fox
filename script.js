const app = document.getElementById("app");

const pages = {
  home: `
    <h1>ホーム</h1>
    <p>動作確認中</p>
  `,
  about: `
    <h1>紹介</h1>
    <p>切り替えテスト</p>
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