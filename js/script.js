// Sample blog data
const blogPosts = [
  {
    title: "Exploring React 18",
    category: "Tech",
    image: "images/1.jpg",
    description: "A deep dive into the new features of React 18.",
    date: "2025-08-15"
  },
  {
    title: "Top 5 Beaches in Thailand",
    category: "Travel",
    image: "images/2.jpg",
    description: "Discover the most beautiful beaches in Thailand.",
    date: "2025-07-12"
  },
  {
    title: "Homemade Pizza Recipe",
    category: "Food",
    image: "images/3.jpg",
    description: "Make delicious pizza at home with this easy recipe.",
    date: "2025-06-20"
  },
  {
    title: "Next.js vs Nuxt.js",
    category: "Tech",
    image: "images/4.jpg",
    description: "Comparing two popular meta-frameworks.",
    date: "2025-05-08"
  },
  {
    title: "A Weekend in Paris",
    category: "Travel",
    image: "images/5.jpg",
    description: "Your perfect 48-hour itinerary in Paris.",
    date: "2025-04-02"
  },
  {
    title: "Best Street Food in India",
    category: "Food",
    image: "images/6.jpg",
    description: "Top street food spots across India.",
    date: "2025-03-14"
  }
];

const postsPerPage = 4;
let currentPage = 1;
let filteredPosts = [...blogPosts];

// DOM elements
const container = document.getElementById('blogPostsContainer');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');

function displayPosts(posts, page) {
  container.innerHTML = "";
  const start = (page - 1) * postsPerPage;
  const paginatedPosts = posts.slice(start, start + postsPerPage);

  paginatedPosts.forEach(post => {
    const card = document.createElement('div');
    card.className = "blog-card";
    card.innerHTML = `
      <img src="${post.image}" alt="${post.title}" />
      <div class="blog-card-content">
        <h3>${post.title}</h3>
        <p>${post.description}</p>
        <p class="date">${post.date}</p>
      </div>
    `;
    container.appendChild(card);
  });

  // Update pagination info
  const totalPages = Math.ceil(posts.length / postsPerPage);
  pageInfo.textContent = `Page ${page} of ${totalPages}`;

  // Disable buttons when needed
  prevPageBtn.disabled = page === 1;
  nextPageBtn.disabled = page === totalPages;
}

function applyFilters() {
  const keyword = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  filteredPosts = blogPosts.filter(post => {
    const matchesCategory = category === "All" || post.category === category;
    const matchesSearch = post.title.toLowerCase().includes(keyword);
    return matchesCategory && matchesSearch;
  });

  currentPage = 1;
  displayPosts(filteredPosts, currentPage);
}

// Event Listeners
searchInput.addEventListener('input', applyFilters);
categoryFilter.addEventListener('change', applyFilters);

prevPageBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    displayPosts(filteredPosts, currentPage);
  }
});

nextPageBtn.addEventListener('click', () => {
  if (currentPage < Math.ceil(filteredPosts.length / postsPerPage)) {
    currentPage++;
    displayPosts(filteredPosts, currentPage);
  }
});

// Initial render
applyFilters();
