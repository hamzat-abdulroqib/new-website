const apikey = "c4fdb058a843420da4485a042c337999";

const blogcontainer = document.querySelector(".container");
const search = document.querySelector(".search-input");
const searchbtn = document.querySelector(".searchbtn");
blogcontainer.classList.add("row");

async function fetchRandomNews() {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${apikey}`
    );
    const data = await response.json();

    console.log("Fetched Data:", data);

    if (!data.articles || !Array.isArray(data.articles)) {
      throw new Error("Invalid API response format");
    }

    return data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

// Fetch news based on search input
async function fetchNews(input) {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        input
      )}&pageSize=18&apiKey=${apikey}`
    );
    const data = await response.json();

    console.log("Search Response:", data);

    if (!data.articles || !Array.isArray(data.articles)) {
      throw new Error("Invalid API response format");
    }

    return data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

// Display news articles
function displayBLogs(articles) {
  blogcontainer.innerHTML = "";

  if (!articles.length) {
    blogcontainer.innerHTML = `<p class="text-center">No news found.</p>`;
    return;
  }

  articles.forEach((article) => {
    const col = document.createElement("div");
    col.classList.add("col-md-4", "mb-4");

    const blog = document.createElement("div");
    blog.classList.add("card", "h-100");

    // Handle missing images
    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = article.urlToImage;
    img.alt = article.title;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = article.title;

    const description = document.createElement("p");
    description.classList.add("card-text");
    description.textContent =
      article.description || "No description available.";

    cardBody.appendChild(title);
    cardBody.appendChild(description);
    blog.appendChild(img);
    blog.appendChild(cardBody);
    col.appendChild(blog);
    blogcontainer.appendChild(col);

    blog.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
  });
}


(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBLogs(articles);
  } catch (error) {
    console.error("Error loading initial news:", error);
  }
})();

// Search functionality
searchbtn.addEventListener("click", async () => {
  const input = search.value.trim();

  if (input !== "") {
    try {
      const articles = await fetchNews(input);
      displayBLogs(articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }
});
