const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export function renderContact() {
  document.title = 'Contact | Find Your Lever | The Fractional Intelligence Company';

  return `
    <div class="contact-split">
      <div class="contact-left">
        <div class="section-tag tag-animate">
          <div class="tag-stripes tag-stripes--coral">
            <span></span><span></span><span></span>
          </div>
          <span class="tag-label" style="color: var(--color-cream); opacity: 0.8">FIND YOUR LEVER</span>
        </div>
        <h1 class="contact-left-headline">Find Your Lever.</h1>
        <p class="contact-left-sub">20 minutes. No pitch. Just a look under the hood to see if there's a hidden leverage point in your operation.</p>
        <p class="contact-left-email"><a href="mailto:ted@raizorcrest.ai">ted@raizorcrest.ai</a></p>
        <p class="contact-left-linkedin"><a href="#">LinkedIn</a></p>
        <p class="contact-left-spirit">It's OK to be AWESOME!</p>
        <div class="contact-left-lever" aria-hidden="true">
          <svg class="lever-icon lever-icon--cream" viewBox="0 0 48 38" width="48" height="38">
            <polygon points="24,28 18,34 30,34" fill="currentColor"/>
            <line x1="10" y1="22" x2="38" y2="28" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
            <circle cx="10" cy="22" r="4" fill="currentColor" opacity="0.8"/>
            <rect x="33" y="20" width="10" height="8" rx="1" fill="currentColor" opacity="0.8"/>
            <line x1="38" y1="20" x2="38" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
            <polygon points="36,14 38,10 40,14" fill="currentColor" opacity="0.6"/>
          </svg>
        </div>
      </div>
      <div class="contact-right">
        <form class="contact-form" id="contact-form" novalidate>
          <div id="form-error" class="form-error" style="display: none;" role="alert"></div>
          <div class="form-group">
            <label class="form-label" for="contact-name">Name</label>
            <input class="form-input" type="text" id="contact-name" name="name" required autocomplete="name" />
          </div>
          <div class="form-group">
            <label class="form-label" for="contact-email">Email</label>
            <input class="form-input" type="email" id="contact-email" name="email" required autocomplete="email" />
          </div>
          <div class="form-group">
            <label class="form-label" for="contact-company">Company</label>
            <input class="form-input" type="text" id="contact-company" name="company" required autocomplete="organization" />
          </div>
          <div class="form-group">
            <label class="form-label" for="contact-role">Role / Title</label>
            <input class="form-input" type="text" id="contact-role" name="role_title" autocomplete="organization-title" />
          </div>
          <div class="form-group">
            <label class="form-label" for="contact-message">What's your biggest operational headache right now?</label>
            <textarea class="form-textarea" id="contact-message" name="message" required rows="5"></textarea>
          </div>
          <button type="submit" class="btn btn--coral btn-press" id="contact-submit">Let's Find It &rarr;</button>
        </form>
        <div id="form-success" class="form-success" style="display: none;">
          <p class="form-success-title">Message Sent.</p>
          <p class="form-success-text">Thanks for reaching out. I'll be in touch within 24 hours to set up your discovery call.</p>
        </div>
      </div>
    </div>
  `;
}

export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const errorEl = document.getElementById('form-error');
    const submitBtn = document.getElementById('contact-submit');
    const successEl = document.getElementById('form-success');

    errorEl.style.display = 'none';

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      company: form.company.value.trim(),
      role_title: form.role_title.value.trim() || null,
      message: form.message.value.trim(),
    };

    if (!data.name || !data.email || !data.company || !data.message) {
      errorEl.textContent = 'Please fill in all required fields.';
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
    submitBtn.textContent = 'Sending...';

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/contact-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Submission failed');

      form.style.display = 'none';
      successEl.style.display = 'block';
    } catch {
      errorEl.textContent = 'Something went wrong. Please email ted@raizorcrest.ai directly.';
      errorEl.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.textContent = "Let's Find It \u2192";
    }
  });
}
