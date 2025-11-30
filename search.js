// Define your site “search index” here
const searchIndex = [
  // Everytime you add a new page, update this list with the right info 
  // just copy the same structure
  { keyword: "laishaplaylist", page: "pages/laisha-playlist.html", description: "Music to your ears" }
];

function performSearch() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();

  if (!query) return;

  // store query to be used in results page
  localStorage.setItem("EGPZ_query", query);

  window.location.href = "results.html";
}

function loadResults() {
  const query = localStorage.getItem("EGPZ_query") || "";
  const resultContainer = document.getElementById("results");

  const matches = searchIndex.filter(item =>
    item.keyword.includes(query)
  );

  if (matches.length === 0) {
    resultContainer.innerHTML = `<p>No results found for "<b>${query}</b>"</p>`;
    return;
  }

  let html = "";
matches.forEach(m => {
  html += `
    <div class="result-item">
      <div class="result-link">${m.page}</div>
      <a class="result-title" href="${m.page}">${m.keyword}</a>
      <div class="result-desc">${m.description}</div>
    </div>
  `;
});

  resultContainer.innerHTML = html;
}
// fix js race condition
document.addEventListener("DOMContentLoaded", loadResults);

/* alow search by pressing Enter 
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      performSearch();
    }
  });
}); */
