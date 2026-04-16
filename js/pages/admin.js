const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const ADMIN_API = `${SUPABASE_URL}/functions/v1/admin`;

const CATEGORIES = ['Ghost Employee', 'Lever Insights', 'AI Operations', 'Industry'];

let adminToken = null;
let activeTab = 'contacts';
let editingArticle = null;

function getToken() {
  return adminToken || sessionStorage.getItem('admin_token');
}

function setToken(token) {
  adminToken = token;
  sessionStorage.setItem('admin_token', token);
}

function clearToken() {
  adminToken = null;
  sessionStorage.removeItem('admin_token');
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

async function adminFetch(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${ADMIN_API}/${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'x-admin-token': token || '',
      ...(options.headers || {}),
    },
  });
  return res;
}

export function renderAdmin() {
  document.title = 'Admin | The Fractional Intelligence Company';
  const token = getToken();

  if (!token) {
    return renderLoginScreen();
  }
  return renderDashboard();
}

function renderLoginScreen() {
  return `
    <section class="page-section page-section--navy-deep" style="min-height: 100vh; display: flex; align-items: center; padding-top: 72px;">
      <div class="container">
        <div class="admin-login-wrap">
          <div class="admin-login-card">
            <div class="section-tag" style="margin-bottom: var(--space-xl);">
              <div class="tag-stripes tag-stripes--teal"><span></span><span></span><span></span></div>
              <span class="tag-label" style="color: var(--color-teal);">ADMIN</span>
            </div>
            <h1 style="font-family: var(--font-body); font-weight: 700; font-size: 1.75rem; color: var(--color-cream); margin-bottom: var(--space-sm);">Sign In</h1>
            <p style="color: var(--color-sand); margin-bottom: var(--space-2xl); font-size: 0.95rem;">Enter your admin password to continue.</p>
            <form id="admin-login-form">
              <div class="form-group">
                <label class="form-label" for="admin-password" style="color: var(--color-sand);">Password</label>
                <input class="form-input" type="password" id="admin-password" placeholder="Enter password" autocomplete="current-password" required />
              </div>
              <div id="login-error" class="form-error" style="display:none;"></div>
              <button type="submit" class="btn btn--coral btn--lg" style="width: 100%; margin-top: var(--space-lg);" id="login-btn">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderDashboard() {
  return `
    <div class="admin-layout" style="padding-top: 72px; min-height: 100vh; background: var(--color-sand);">
      <div class="admin-topbar">
        <div class="container" style="display: flex; align-items: center; justify-content: space-between; padding-top: var(--space-xl); padding-bottom: var(--space-xl);">
          <div>
            <div class="section-tag" style="margin-bottom: var(--space-sm);">
              <div class="tag-stripes tag-stripes--coral"><span></span><span></span><span></span></div>
              <span class="tag-label" style="color: var(--color-navy-light);">ADMIN PANEL</span>
            </div>
            <h1 style="font-family: var(--font-body); font-weight: 700; font-size: 1.5rem; color: var(--color-navy);">Dashboard</h1>
          </div>
          <button class="btn btn--outline-teal btn--sm" id="admin-logout-btn">Sign Out</button>
        </div>
      </div>

      <div class="container" style="padding-bottom: var(--space-4xl);">
        <div class="admin-tabs" id="admin-tabs">
          <button class="admin-tab ${activeTab === 'contacts' ? 'active' : ''}" data-tab="contacts">Contacts</button>
          <button class="admin-tab ${activeTab === 'leads' ? 'active' : ''}" data-tab="leads">Lead Downloads</button>
          <button class="admin-tab ${activeTab === 'articles' ? 'active' : ''}" data-tab="articles">Articles</button>
          <button class="admin-tab ${activeTab === 'tools' ? 'active' : ''}" data-tab="tools">Tools</button>
        </div>

        <div id="admin-tab-content">
          <div class="admin-loading">Loading...</div>
        </div>
      </div>
    </div>
  `;
}

export function initAdmin() {
  const token = getToken();

  if (!token) {
    initLoginForm();
    return;
  }

  initDashboard();
}

function initLoginForm() {
  const form = document.getElementById('admin-login-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const password = document.getElementById('admin-password').value;
    const btn = document.getElementById('login-btn');
    const errorEl = document.getElementById('login-error');

    btn.textContent = 'Signing in...';
    btn.disabled = true;
    errorEl.style.display = 'none';

    try {
      const res = await fetch(`${ADMIN_API}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify({ password }),
      });

      const json = await res.json();

      if (!res.ok) {
        errorEl.textContent = json.error || 'Invalid password.';
        errorEl.style.display = 'block';
        btn.textContent = 'Sign In';
        btn.disabled = false;
        return;
      }

      setToken(json.token);
      activeTab = 'contacts';
      const mainEl = document.getElementById('main-content');
      mainEl.innerHTML = renderDashboard();
      requestAnimationFrame(() => initDashboard());
    } catch {
      errorEl.textContent = 'Connection error. Please try again.';
      errorEl.style.display = 'block';
      btn.textContent = 'Sign In';
      btn.disabled = false;
    }
  });
}

function initDashboard() {
  const logoutBtn = document.getElementById('admin-logout-btn');
  logoutBtn?.addEventListener('click', () => {
    clearToken();
    activeTab = 'contacts';
    const mainEl = document.getElementById('main-content');
    mainEl.innerHTML = renderLoginScreen();
    requestAnimationFrame(() => initLoginForm());
  });

  const tabsEl = document.getElementById('admin-tabs');
  tabsEl?.addEventListener('click', (e) => {
    const btn = e.target.closest('.admin-tab');
    if (!btn) return;
    activeTab = btn.dataset.tab;
    tabsEl.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    loadTab(activeTab);
  });

  loadTab(activeTab);
}

async function loadTab(tab) {
  const content = document.getElementById('admin-tab-content');
  if (!content) return;
  content.innerHTML = '<div class="admin-loading">Loading...</div>';

  if (tab === 'contacts') await loadContacts(content);
  else if (tab === 'leads') await loadLeads(content);
  else if (tab === 'articles') await loadArticles(content);
  else if (tab === 'tools') loadTools(content);
}

async function loadContacts(container) {
  const res = await adminFetch('contacts');
  if (res.status === 401) { handleUnauth(); return; }
  const { data, error } = await res.json();

  if (error || !data) {
    container.innerHTML = `<div class="admin-empty">Failed to load contacts: ${escapeHtml(error)}</div>`;
    return;
  }

  if (data.length === 0) {
    container.innerHTML = '<div class="admin-empty">No contact submissions yet.</div>';
    return;
  }

  container.innerHTML = `
    <div class="admin-count">${data.length} submission${data.length !== 1 ? 's' : ''}</div>
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Role</th>
            <th>Message</th>
            <th>Email Sent</th>
          </tr>
        </thead>
        <tbody>
          ${data.map(row => `
            <tr>
              <td>${formatDate(row.created_at)}</td>
              <td>${escapeHtml(row.name)}</td>
              <td><a href="mailto:${escapeHtml(row.email)}" style="color: var(--color-teal);">${escapeHtml(row.email)}</a></td>
              <td>${escapeHtml(row.company) || '—'}</td>
              <td>${escapeHtml(row.role_title) || '—'}</td>
              <td class="admin-table-message">${escapeHtml(row.message)}</td>
              <td>${row.email_sent ? '<span class="pill pill--teal">Yes</span>' : '<span class="pill pill--gold">No</span>'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

async function loadLeads(container) {
  const res = await adminFetch('leads');
  if (res.status === 401) { handleUnauth(); return; }
  const { data, error } = await res.json();

  if (error || !data) {
    container.innerHTML = `<div class="admin-empty">Failed to load leads: ${escapeHtml(error)}</div>`;
    return;
  }

  if (data.length === 0) {
    container.innerHTML = '<div class="admin-empty">No lead magnet downloads yet.</div>';
    return;
  }

  container.innerHTML = `
    <div class="admin-count">${data.length} download${data.length !== 1 ? 's' : ''}</div>
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Title</th>
            <th>Downloaded</th>
          </tr>
        </thead>
        <tbody>
          ${data.map(row => `
            <tr>
              <td>${formatDate(row.created_at)}</td>
              <td>${escapeHtml(row.name)}</td>
              <td><a href="mailto:${escapeHtml(row.email)}" style="color: var(--color-teal);">${escapeHtml(row.email)}</a></td>
              <td>${escapeHtml(row.company) || '—'}</td>
              <td>${escapeHtml(row.title) || '—'}</td>
              <td>${row.downloaded_at ? formatDate(row.downloaded_at) : '<span style="color:var(--color-coral);">Not yet</span>'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

async function loadArticles(container) {
  const res = await adminFetch('articles');
  if (res.status === 401) { handleUnauth(); return; }
  const { data, error } = await res.json();

  if (error) {
    container.innerHTML = `<div class="admin-empty">Failed to load articles: ${escapeHtml(error)}</div>`;
    return;
  }

  const articles = data || [];

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-lg);">
      <div class="admin-count">${articles.length} article${articles.length !== 1 ? 's' : ''}</div>
      <button class="btn btn--coral btn--sm" id="new-article-btn">+ New Article</button>
    </div>
    <div id="article-form-container"></div>
    <div id="articles-list">
      ${articles.length === 0 ? '<div class="admin-empty">No articles yet. Create your first one above.</div>' : `
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Published</th>
                <th>Featured</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="articles-tbody">
              ${articles.map(a => renderArticleRow(a)).join('')}
            </tbody>
          </table>
        </div>
      `}
    </div>
  `;

  document.getElementById('new-article-btn')?.addEventListener('click', () => {
    editingArticle = null;
    showArticleForm(null);
  });

  document.getElementById('articles-tbody')?.addEventListener('click', (e) => {
    const editBtn = e.target.closest('[data-edit-article]');
    const deleteBtn = e.target.closest('[data-delete-article]');

    if (editBtn) {
      const id = editBtn.dataset.editArticle;
      const article = articles.find(a => String(a.id) === id);
      if (article) showArticleForm(article);
    }

    if (deleteBtn) {
      const id = deleteBtn.dataset.deleteArticle;
      if (confirm('Delete this article? This cannot be undone.')) {
        deleteArticle(id);
      }
    }
  });
}

function renderArticleRow(a) {
  return `
    <tr id="article-row-${a.id}">
      <td style="font-weight: 600;">${escapeHtml(a.title)}</td>
      <td><span class="pill ${categoryPillClass(a.category)}">${escapeHtml(a.category)}</span></td>
      <td>${a.published ? '<span class="pill pill--teal">Yes</span>' : '<span class="pill pill--gold">Draft</span>'}</td>
      <td>${a.featured ? '<span class="pill pill--coral">Yes</span>' : '—'}</td>
      <td>${formatDate(a.published_at || a.created_at)}</td>
      <td>
        <div style="display: flex; gap: var(--space-sm);">
          <button class="btn btn--sm btn--outline-teal" data-edit-article="${a.id}">Edit</button>
          <button class="btn btn--sm" style="border: 2px solid var(--color-coral); color: var(--color-coral); border-radius: var(--radius-pill); padding: 6px 16px; font-size: 0.875rem;" data-delete-article="${a.id}">Delete</button>
        </div>
      </td>
    </tr>
  `;
}

function categoryPillClass(cat) {
  if (cat === 'Ghost Employee' || cat === 'AI Operations') return 'pill--coral';
  if (cat === 'Lever Insights') return 'pill--teal';
  return 'pill--gold';
}

function showArticleForm(article) {
  editingArticle = article;
  const formContainer = document.getElementById('article-form-container');
  if (!formContainer) return;

  formContainer.innerHTML = `
    <div class="admin-form-card" id="article-form-wrap">
      <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--color-navy); margin-bottom: var(--space-lg);">
        ${article ? 'Edit Article' : 'New Article'}
      </h3>
      <form id="article-form">
        <div class="admin-form-grid">
          <div class="form-group">
            <label class="form-label" for="art-title">Title *</label>
            <input class="form-input" type="text" id="art-title" value="${escapeHtml(article?.title || '')}" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="art-slug">Slug *</label>
            <input class="form-input" type="text" id="art-slug" value="${escapeHtml(article?.slug || '')}" placeholder="url-friendly-slug" required />
          </div>
          <div class="form-group" style="grid-column: 1 / -1;">
            <label class="form-label" for="art-excerpt">Excerpt *</label>
            <textarea class="form-input form-textarea" id="art-excerpt" rows="3" required>${escapeHtml(article?.excerpt || '')}</textarea>
          </div>
          <div class="form-group">
            <label class="form-label" for="art-category">Category *</label>
            <select class="form-input" id="art-category" required>
              ${CATEGORIES.map(c => `<option value="${c}" ${article?.category === c ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="art-date">Published Date</label>
            <input class="form-input" type="date" id="art-date" value="${article?.published_at ? article.published_at.substring(0, 10) : ''}" />
          </div>
          <div class="form-group admin-checkboxes">
            <label class="admin-checkbox-label">
              <input type="checkbox" id="art-published" ${article?.published ? 'checked' : ''} />
              <span>Published</span>
            </label>
            <label class="admin-checkbox-label">
              <input type="checkbox" id="art-featured" ${article?.featured ? 'checked' : ''} />
              <span>Featured</span>
            </label>
          </div>
        </div>
        <div id="article-form-error" class="form-error" style="display:none;"></div>
        <div id="article-form-success" class="form-success" style="display:none;"></div>
        <div style="display: flex; gap: var(--space-md); margin-top: var(--space-xl);">
          <button type="submit" class="btn btn--coral" id="article-save-btn">${article ? 'Save Changes' : 'Create Article'}</button>
          <button type="button" class="btn btn--outline-teal" id="article-cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  `;

  formContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  document.getElementById('art-title')?.addEventListener('input', (e) => {
    if (!editingArticle) {
      const slugEl = document.getElementById('art-slug');
      if (slugEl && !slugEl.dataset.touched) {
        slugEl.value = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
    }
  });

  document.getElementById('art-slug')?.addEventListener('input', (e) => {
    e.target.dataset.touched = 'true';
  });

  document.getElementById('article-cancel-btn')?.addEventListener('click', () => {
    formContainer.innerHTML = '';
    editingArticle = null;
  });

  document.getElementById('article-form')?.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    await saveArticle();
  });
}

async function saveArticle() {
  const btn = document.getElementById('article-save-btn');
  const errorEl = document.getElementById('article-form-error');
  const successEl = document.getElementById('article-form-success');

  const payload = {
    title: document.getElementById('art-title').value.trim(),
    slug: document.getElementById('art-slug').value.trim(),
    excerpt: document.getElementById('art-excerpt').value.trim(),
    category: document.getElementById('art-category').value,
    published: document.getElementById('art-published').checked,
    featured: document.getElementById('art-featured').checked,
    published_at: document.getElementById('art-date').value || null,
  };

  if (editingArticle) payload.id = editingArticle.id;

  btn.textContent = 'Saving...';
  btn.disabled = true;
  errorEl.style.display = 'none';
  successEl.style.display = 'none';

  try {
    const method = editingArticle ? 'PUT' : 'POST';
    const res = await adminFetch('articles', { method, body: JSON.stringify(payload) });
    const json = await res.json();

    if (!res.ok) {
      errorEl.textContent = json.error || 'Failed to save article.';
      errorEl.style.display = 'block';
      btn.textContent = editingArticle ? 'Save Changes' : 'Create Article';
      btn.disabled = false;
      return;
    }

    successEl.textContent = editingArticle ? 'Article updated!' : 'Article created!';
    successEl.style.display = 'block';
    btn.textContent = editingArticle ? 'Save Changes' : 'Create Article';
    btn.disabled = false;

    const content = document.getElementById('admin-tab-content');
    if (content) {
      setTimeout(() => loadArticles(content), 800);
    }
  } catch {
    errorEl.textContent = 'Connection error. Please try again.';
    errorEl.style.display = 'block';
    btn.textContent = editingArticle ? 'Save Changes' : 'Create Article';
    btn.disabled = false;
  }
}

async function deleteArticle(id) {
  const res = await adminFetch('articles', { method: 'DELETE', body: JSON.stringify({ id }) });
  if (res.status === 401) { handleUnauth(); return; }

  const row = document.getElementById(`article-row-${id}`);
  if (row) row.remove();

  const tbody = document.getElementById('articles-tbody');
  if (tbody && tbody.children.length === 0) {
    const content = document.getElementById('admin-tab-content');
    if (content) loadArticles(content);
  }
}

function loadTools(container) {
  container.innerHTML = `
    <div class="admin-tools-grid">
      <div class="admin-tool-card">
        <h3 class="admin-tool-title">Seed PDF from Public Folder</h3>
        <p class="admin-tool-desc">Re-upload the PDF from the site's public folder into Supabase Storage. Use this to initialize or reset the lead magnet file.</p>
        <button class="btn btn--coral btn--sm" id="seed-pdf-btn">Seed PDF</button>
        <div id="seed-pdf-msg" style="margin-top: var(--space-md); display: none;"></div>
      </div>

      <div class="admin-tool-card">
        <h3 class="admin-tool-title">Upload New PDF</h3>
        <p class="admin-tool-desc">Upload a new PDF to replace the current lead magnet. The latest uploaded file will be used for all new downloads.</p>
        <div class="form-group" style="margin-top: var(--space-md);">
          <input type="file" id="pdf-file-input" accept=".pdf" class="form-input" style="padding: 10px;" />
        </div>
        <button class="btn btn--coral btn--sm" id="upload-pdf-btn">Upload PDF</button>
        <div id="upload-pdf-msg" style="margin-top: var(--space-md); display: none;"></div>
      </div>

      <div class="admin-tool-card">
        <h3 class="admin-tool-title">Change Admin Password</h3>
        <p class="admin-tool-desc">Update the admin panel password. Must be at least 8 characters.</p>
        <div class="form-group" style="margin-top: var(--space-md);">
          <input type="password" id="new-password-input" class="form-input" placeholder="New password (min 8 chars)" />
        </div>
        <div class="form-group">
          <input type="password" id="confirm-password-input" class="form-input" placeholder="Confirm new password" />
        </div>
        <button class="btn btn--coral btn--sm" id="change-password-btn">Change Password</button>
        <div id="password-msg" style="margin-top: var(--space-md); display: none;"></div>
      </div>
    </div>
  `;

  document.getElementById('seed-pdf-btn')?.addEventListener('click', async () => {
    const btn = document.getElementById('seed-pdf-btn');
    const msg = document.getElementById('seed-pdf-msg');
    btn.textContent = 'Seeding...';
    btn.disabled = true;
    msg.style.display = 'none';

    try {
      const res = await adminFetch('seed-pdf', {
        method: 'POST',
        body: JSON.stringify({ siteUrl: window.location.origin }),
      });
      const json = await res.json();
      msg.style.display = 'block';
      if (res.ok) {
        msg.className = 'form-success';
        msg.textContent = 'PDF seeded successfully.';
      } else {
        msg.className = 'form-error';
        msg.textContent = json.error || 'Failed to seed PDF.';
      }
    } catch {
      msg.style.display = 'block';
      msg.className = 'form-error';
      msg.textContent = 'Connection error.';
    }

    btn.textContent = 'Seed PDF';
    btn.disabled = false;
  });

  document.getElementById('upload-pdf-btn')?.addEventListener('click', async () => {
    const fileInput = document.getElementById('pdf-file-input');
    const btn = document.getElementById('upload-pdf-btn');
    const msg = document.getElementById('upload-pdf-msg');

    if (!fileInput.files[0]) {
      msg.style.display = 'block';
      msg.className = 'form-error';
      msg.textContent = 'Please select a PDF file first.';
      return;
    }

    btn.textContent = 'Uploading...';
    btn.disabled = true;
    msg.style.display = 'none';

    try {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target.result.split(',')[1];
        const res = await adminFetch('upload-pdf', {
          method: 'POST',
          body: JSON.stringify({ base64pdf: base64, originalFilename: file.name }),
        });
        const json = await res.json();
        msg.style.display = 'block';
        if (res.ok) {
          msg.className = 'form-success';
          msg.textContent = 'PDF uploaded successfully.';
          fileInput.value = '';
        } else {
          msg.className = 'form-error';
          msg.textContent = json.error || 'Upload failed.';
        }
        btn.textContent = 'Upload PDF';
        btn.disabled = false;
      };
      reader.readAsDataURL(file);
    } catch {
      msg.style.display = 'block';
      msg.className = 'form-error';
      msg.textContent = 'Connection error.';
      btn.textContent = 'Upload PDF';
      btn.disabled = false;
    }
  });

  document.getElementById('change-password-btn')?.addEventListener('click', async () => {
    const newPw = document.getElementById('new-password-input').value;
    const confirmPw = document.getElementById('confirm-password-input').value;
    const btn = document.getElementById('change-password-btn');
    const msg = document.getElementById('password-msg');

    msg.style.display = 'none';

    if (!newPw || newPw.length < 8) {
      msg.style.display = 'block';
      msg.className = 'form-error';
      msg.textContent = 'Password must be at least 8 characters.';
      return;
    }

    if (newPw !== confirmPw) {
      msg.style.display = 'block';
      msg.className = 'form-error';
      msg.textContent = 'Passwords do not match.';
      return;
    }

    btn.textContent = 'Saving...';
    btn.disabled = true;

    try {
      const res = await adminFetch('change-password', {
        method: 'POST',
        body: JSON.stringify({ newPassword: newPw }),
      });
      const json = await res.json();
      msg.style.display = 'block';
      if (res.ok) {
        msg.className = 'form-success';
        msg.textContent = 'Password changed successfully.';
        document.getElementById('new-password-input').value = '';
        document.getElementById('confirm-password-input').value = '';
      } else {
        msg.className = 'form-error';
        msg.textContent = json.error || 'Failed to change password.';
      }
    } catch {
      msg.style.display = 'block';
      msg.className = 'form-error';
      msg.textContent = 'Connection error.';
    }

    btn.textContent = 'Change Password';
    btn.disabled = false;
  });
}

function handleUnauth() {
  clearToken();
  const mainEl = document.getElementById('main-content');
  if (mainEl) {
    mainEl.innerHTML = renderLoginScreen();
    requestAnimationFrame(() => initLoginForm());
  }
}
