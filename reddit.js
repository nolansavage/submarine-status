async function loadRedditTrending() {
  try {
    const response = await fetch(
      "https://api.allorigins.win/raw?url=https://www.reddit.com/r/all/top.json?limit=10"
    );
    const data = await response.json();

    const list = document.getElementById("reddit-trending");
    list.innerHTML = "";

    data.data.children.forEach(post => {
      const title = post.data.title;
      const subreddit = post.data.subreddit;
      const ups = post.data.ups;

      const li = document.createElement("li");
      li.textContent = `r/${subreddit} — ${title} (${ups}↑)`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Reddit fetch failed:", err);
  }
}

loadRedditTrending();
setInterval(loadRedditTrending, 60000);
