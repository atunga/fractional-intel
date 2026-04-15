const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const CATEGORIES = ['All', 'Ghost Employee', 'Lever Insights', 'AI Operations', 'Industry'];

let activeCategory = 'All';
let articles = [];
let loaded = false;

export function renderInsights() {
  document.title = 'Insights | The Fractional Intelligence Company';

  fetchArticles();

  return `
    <section class="page-section page-section--cream" style="padding-top: calc(72px + var(--space-3xl));" aria-labelledby="insights-heading">
      <div class="container">
        <div class="section-tag tag-animate">
          <div class="tag-stripes tag-stripes--coral">
            <span></span><span></span><span></span>
          </div>
          <span class="tag-label" style="color: var(--color-navy-light)">INSIGHTS</span>
        </div>
        <h1 id="insights-heading" class="section-heading animate-on-scroll">Thought Leadership</h1>
        <p class="section-subhead animate-on-scroll delay-1" style="margin-bottom: var(--space-2xl);">Articles, analysis, and hard truths about what's really costing your operation.</p>

        <div class="insights-filter" id="insights-filter">
          ${CATEGORIES.map(cat => `
            <button class="filter-tag ${cat === 'All' ? 'active' : ''}" data-category="${cat}">${cat}</button>
          `).join('')}
        </div>

        <div id="insights-content">
          <div class="insights-empty">
            <p style="color: var(--color-navy-light);">Loading...</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

async function fetchArticles() {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/articles?published=eq.true&order=published_at.desc`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        },
      }
    );

    if (!response.ok) throw new Error('Failed to fetch');

    articles = await response.json();
    loaded = true;
    renderArticleList();
    initFilterListeners();
  } catch {
    loaded = true;
    articles = [];
    renderArticleList();
  }
}

function initFilterListeners() {
  const container = document.getElementById('insights-filter');
  if (!container) return;

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-tag');
    if (!btn) return;

    activeCategory = btn.dataset.category;
    container.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    renderArticleList();
  });
}

function renderArticleList() {
  const container = document.getElementById('insights-content');
  if (!container) return;

  const filtered = activeCategory === 'All'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  if (!loaded) {
    container.innerHTML = '<div class="insights-empty"><p>Loading...</p></div>';
    return;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="insights-empty">
        <p class="insights-empty-title">No articles yet</p>
        <p>Check back soon. New insights are on the way.</p>
      </div>
    `;
    return;
  }

  const featured = filtered.find(a => a.featured) || filtered[0];
  const rest = filtered.filter(a => a.id !== featured.id);

  const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const categoryPillClass = (cat) => {
    if (cat === 'Ghost Employee' || cat === 'AI Operations') return 'pill--coral';
    if (cat === 'Lever Insights') return 'pill--teal';
    return 'pill--gold';
  };

  let html = `
    <div class="insights-featured" role="article">
      <p class="insights-featured-label">FEATURED</p>
      <h2 class="insights-featured-title">${escapeHtml(featured.title)}</h2>
      <p class="insights-featured-excerpt">${escapeHtml(featured.excerpt)}</p>
      <div class="insights-featured-meta">
        <span class="pill ${categoryPillClass(featured.category)}">${escapeHtml(featured.category)}</span>
        <span class="insight-card-date">${formatDate(featured.published_at)}</span>
      </div>
    </div>
  `;

  if (rest.length > 0) {
    html += '<div class="insights-grid">';
    rest.forEach(article => {
      html += `
        <div class="insight-card" role="article">
          <h3 class="insight-card-title">${escapeHtml(article.title)}</h3>
          <p class="insight-card-excerpt">${escapeHtml(article.excerpt)}</p>
          <div class="insight-card-meta">
            <span class="pill ${categoryPillClass(article.category)}">${escapeHtml(article.category)}</span>
            <span class="insight-card-date">${formatDate(article.published_at)}</span>
          </div>
        </div>
      `;
    });
    html += '</div>';
  }

  container.innerHTML = html;
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
