const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export function renderDownload() {
  document.title = 'Free Download | Find the Lever — Digital Edition | The Fractional Intelligence Company';

  return `
    <div class="download-split">
      <div class="download-left">
        <div class="section-tag tag-animate">
          <div class="tag-stripes tag-stripes--coral">
            <span></span><span></span><span></span>
          </div>
          <span class="tag-label" style="color: var(--color-cream); opacity: 0.8">FREE DOWNLOAD</span>
        </div>
        <h1 class="download-left-headline">Find the Lever.</h1>
        <p class="download-left-edition">Digital Edition</p>
        <p class="download-left-sub">Every operation is bleeding where it can't see. This guide walks you through the exact framework I use to find the hidden leverage point — the ghost employees, the vanity metrics, the shadow processes — that are quietly draining your business.</p>
        <ul class="download-feature-list">
          <li class="download-feature-item">
            <div class="download-feature-dot"></div>
            <span>The 150–200 hour ghost employee problem</span>
          </li>
          <li class="download-feature-item">
            <div class="download-feature-dot"></div>
            <span>How to spot hidden leverage points in any operation</span>
          </li>
          <li class="download-feature-item">
            <div class="download-feature-dot"></div>
            <span>Real case studies with $1M+ in recovered value</span>
          </li>
          <li class="download-feature-item">
            <div class="download-feature-dot"></div>
            <span>The Find → Build → Lift framework explained</span>
          </li>
        </ul>
        <div class="download-left-lever" aria-hidden="true">
          <svg class="lever-icon lever-icon--cream" viewBox="0 0 48 38" width="56" height="45">
            <polygon points="24,28 18,34 30,34" fill="currentColor"/>
            <line x1="10" y1="22" x2="38" y2="28" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
            <circle cx="10" cy="22" r="4" fill="currentColor" opacity="0.8"/>
            <rect x="33" y="20" width="10" height="8" rx="1" fill="currentColor" opacity="0.8"/>
            <line x1="38" y1="20" x2="38" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
            <polygon points="36,14 38,10 40,14" fill="currentColor" opacity="0.6"/>
          </svg>
        </div>
      </div>

      <div class="download-right">
        <form class="download-form" id="download-form" novalidate>
          <p class="download-form-intro">Enter your details to get instant access.</p>
          <div id="download-form-error" class="form-error" style="display: none;" role="alert"></div>

          <div class="form-group">
            <label class="form-label" for="dl-name">Full Name <span class="form-required">*</span></label>
            <input class="form-input" type="text" id="dl-name" name="name" required autocomplete="name" placeholder="Jane Smith" />
          </div>
          <div class="form-group">
            <label class="form-label" for="dl-company">Company <span class="form-required">*</span></label>
            <input class="form-input" type="text" id="dl-company" name="company" required autocomplete="organization" placeholder="Acme Distribution Co." />
          </div>
          <div class="form-group">
            <label class="form-label" for="dl-title">Title / Role <span class="form-required">*</span></label>
            <input class="form-input" type="text" id="dl-title" name="title" required autocomplete="organization-title" placeholder="VP of Operations" />
          </div>
          <div class="form-group">
            <label class="form-label" for="dl-email">Work Email <span class="form-required">*</span></label>
            <input class="form-input" type="email" id="dl-email" name="email" required autocomplete="email" placeholder="jane@acme.com" />
          </div>

          <button type="submit" class="btn btn--coral btn-press download-submit-btn" id="download-submit">
            <span id="download-btn-text">Get Free Download &rarr;</span>
            <span id="download-btn-loading" style="display: none;">Preparing your download...</span>
          </button>
          <p class="download-privacy-note">No spam. No pitch. Just the guide.</p>
        </form>

        <div id="download-success" class="download-success" style="display: none;">
          <div class="download-success-icon" aria-hidden="true">
            <svg viewBox="0 0 48 48" width="56" height="56" fill="none">
              <circle cx="24" cy="24" r="22" stroke="var(--color-teal)" stroke-width="3"/>
              <polyline points="14,24 21,31 34,17" stroke="var(--color-teal)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <p class="download-success-title">Your download has started.</p>
          <p class="download-success-text">If it didn't begin automatically, <a id="download-fallback-link" class="text-link text-link--coral" href="#">click here to download</a>.</p>
          <p class="download-success-sub">While you're here — if you want to find the real lever in your operation, not just read about it:</p>
          <a href="/contact" class="btn btn--coral btn-press" data-link style="margin-top: var(--space-lg);">Book a Free Discovery Call &rarr;</a>
        </div>
      </div>
    </div>
  `;
}

export function initDownloadForm() {
  const form = document.getElementById('download-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const errorEl = document.getElementById('download-form-error');
    const submitBtn = document.getElementById('download-submit');
    const btnText = document.getElementById('download-btn-text');
    const btnLoading = document.getElementById('download-btn-loading');
    const successEl = document.getElementById('download-success');

    errorEl.style.display = 'none';

    const data = {
      name: form.name.value.trim(),
      company: form.company.value.trim(),
      title: form.title.value.trim(),
      email: form.email.value.trim(),
      siteUrl: `${window.location.protocol}//${window.location.host}`,
    };

    if (!data.name || !data.company || !data.title || !data.email) {
      errorEl.textContent = 'All fields are required.';
      errorEl.style.display = 'block';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errorEl.textContent = 'Please enter a valid email address.';
      errorEl.style.display = 'block';
      return;
    }

    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/lead-magnet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Download failed');
      }

      const pdfUrl = result.downloadUrl;
      const pdfFilename = result.filename || 'Find_the_Lever_-_Digital_Edition.pdf';

      form.style.display = 'none';
      successEl.style.display = 'flex';

      const fallbackLink = document.getElementById('download-fallback-link');
      if (fallbackLink) {
        fallbackLink.href = pdfUrl;
        fallbackLink.target = '_blank';
        fallbackLink.rel = 'noopener noreferrer';
      }

      window.open(pdfUrl, '_blank', 'noopener,noreferrer');

    } catch (err) {
      const msg = err.message && err.message.length < 200
        ? err.message
        : 'Something went wrong. Please email ted@raizorcrest.ai directly.';
      errorEl.textContent = msg;
      errorEl.style.display = 'block';
      submitBtn.disabled = false;
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
    }
  });
}
