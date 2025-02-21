// Your API keys and URLs
const NEWS_API_KEY = '3fa576be00c74fe58c85e4a98341c8c9';
const QUOTES_API_KEY = 'g5bSk2c8hlg8kdG9ztFipg==BzikateZnpQMaPjK';

// Function to get news from the News API
async function getNews() {
  const url = `https://newsapi.org/v2/everything?q=tesla&from=2025-01-21&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    const data = await response.json();

    // Display the news articles
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';  // Clear any existing news
    data.articles.slice(0, 5).forEach(article => {
      const newsItem = document.createElement('div');
      newsItem.classList.add('news-item');
      newsItem.innerHTML = `
        <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
        <p>${article.description}</p>
      `;
      newsContainer.appendChild(newsItem);
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    document.getElementById('news-container').innerHTML = `<p>Couldn't fetch news at this time. Please try again later.</p>`;
  }
}

// Function to get a motivational quote from the Quotes API
async function getQuote() {
  const url = `https://api.api-ninjas.com/v1/quotes?apiKey=${QUOTES_API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    const data = await response.json();

    // Display the quote and author
    document.getElementById('quote-text').textContent = `"${data[0].quote}"`;
    document.getElementById('quote-author').textContent = `- ${data[0].author}`;
  } catch (error) {
    console.error('Error fetching quote:', error);
    document.getElementById('quote-text').textContent = `"The best way to predict the future is to create it."`;
    document.getElementById('quote-author').textContent = `- Peter Drucker`;
  }
}

// Function to load both quote and news
async function loadContent() {
  await getQuote();
  await getNews();
}

// Load the quote page on initial load
window.onload = function() {
  getQuote(); // Load the quote immediately on page load

  // Update the news and quotes at 9 AM every day
  const currentTime = new Date();
  const next9AM = new Date(currentTime);
  next9AM.setHours(9, 0, 0, 0); // Set the time to 9:00 AM today
  
  if (currentTime > next9AM) {
    // If it's already past 9 AM today, set for the next day
    next9AM.setDate(next9AM.getDate() + 1);
  }

  const timeUntil9AM = next9AM - currentTime;

  // Set a timeout to refresh content at 9 AM
  setTimeout(() => {
    loadContent(); // Refresh the content at 9 AM
    // Set interval to refresh every 24 hours
    setInterval(loadContent, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
  }, timeUntil9AM);
};

// Switch to News Page
document.getElementById('next-to-news').addEventListener('click', () => {
  document.getElementById('quotes-page').style.display = 'none';
  document.getElementById('news-page').style.display = 'block';
  getNews();  // Load the news content when switching to News page
});

// Switch to Quotes Page
document.getElementById('back-to-quotes').addEventListener('click', () => {
  document.getElementById('quotes-page').style.display = 'block';
  document.getElementById('news-page').style.display = 'none';
});
