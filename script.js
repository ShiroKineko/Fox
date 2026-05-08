const app = document.getElementById("app");

function getPosts() {
  return JSON.parse(localStorage.getItem("posts") || "[]");
}

function savePosts(posts) {
  localStorage.setItem("posts", JSON.stringify(posts));
}

/* --------------------
   画面ルーティング
-------------------- */
function navigate(page) {
  if (!app) return;

  if (page === "home") renderHome();
  if (page === "create") renderCreate();
}

/* --------------------
   記事一覧
-------------------- */
function renderHome() {
  const posts = getPosts();

  app.innerHTML = `
    <h1>記事一覧</h1>
    <div>
      ${posts.map(p => `
        <div class="card" onclick="openPost('${p.id}')">
          <h3>${p.title}</h3>
          <small>${new Date(p.date).toLocaleString()}</small>
        </div>
      `).join("")}
    </div>
  `;
}

/* --------------------
   投稿画面
-------------------- */
function renderCreate() {
  app.innerHTML = `
    <h1>記事作成</h1>

    <input id="title" placeholder="タイトル">

    <textarea id="content" placeholder="Markdownを書いてね"></textarea>

    <button onclick="savePost()">投稿</button>

    <h3>プレビュー</h3>
    <div id="preview"></div>
  `;

  document.getElementById("content").addEventListener("input", (e) => {
    document.getElementById("preview").innerHTML =
      marked.parse(e.target.value);
  });
}

/* --------------------
   保存
-------------------- */
function savePost() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  const posts = getPosts();

  posts.push({
    id: Date.now().toString(),
    title,
    content,
    date: new Date().toISOString()
  });

  savePosts(posts);

  alert("投稿完了");
  navigate("home");
}

/* --------------------
   記事表示
-------------------- */
function openPost(id) {
  const post = getPosts().find(p => p.id === id);

  app.innerHTML = `
    <button onclick="navigate('home')">←戻る</button>
    <h1>${post.title}</h1>
    <div>${marked.parse(post.content)}</div>
  `;
}

/* --------------------
   ダークモード
-------------------- */
function toggleTheme() {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

/* 初期化 */
window.addEventListener("load", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  navigate("home");
});