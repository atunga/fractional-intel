export function renderHome() {
  document.title = 'Ted Hebert | Find the Lever. | The Fractional Intelligence Company';
  updateMeta('description', 'Ted finds the hidden leverage point bleeding your operation dry — then builds the AI that fixes it in weeks. The Fractional Intelligence Company, powered by Razor Crest AI.');

  return `
    <section class="hero hero-animate" aria-label="Hero">
      <div class="hero-content">
        <div class="section-tag tag-animate">
          <div class="tag-stripes tag-stripes--coral">
            <span></span><span></span><span></span>
          </div>
          <span class="tag-label" style="color: var(--color-navy-light)">FRACTIONAL AI &amp; OPERATIONS</span>
        </div>
        <h1 class="hero-headline">Find the Lever.</h1>
        <p class="hero-sub">Every operation is bleeding where it can't see. I find it. I build the fix. In weeks.</p>
        <div class="hero-cta-group">
          <a href="/contact" class="btn btn--coral btn--lg btn-press" data-link>See If You Qualify &rarr;</a>
          <span class="micro-copy">20-minute discovery call. No pitch.</span>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div class="retro-sun">
          <svg class="hero-lever-overlay lever-icon--cream" viewBox="0 0 48 38" width="120" height="96">
            <polygon points="24,28 18,34 30,34" fill="currentColor"/>
            <line x1="10" y1="22" x2="38" y2="28" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
            <circle cx="10" cy="22" r="4" fill="currentColor" opacity="0.8"/>
            <rect x="33" y="20" width="10" height="8" rx="1" fill="currentColor" opacity="0.8"/>
            <line x1="38" y1="20" x2="38" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
            <polygon points="36,14 38,10 40,14" fill="currentColor" opacity="0.6"/>
          </svg>
        </div>
        <div class="retro-waves">
          <div class="retro-wave-ribbon"></div>
          <div class="retro-wave-ribbon"></div>
          <div class="retro-wave-ribbon"></div>
          <div class="retro-wave-ribbon"></div>
          <div class="retro-wave-ribbon"></div>
        </div>
      </div>
      <div class="scroll-indicator" id="scroll-indicator">
        <div class="scroll-dot"></div>
        <div class="scroll-dot"></div>
        <div class="scroll-dot"></div>
      </div>
    </section>

    <div class="wave-divider" aria-hidden="true">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0,30 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="var(--color-cream)"/>
      </svg>
    </div>

    <section class="page-section page-section--cream" aria-labelledby="hidden-cost-heading">
      <div class="purple-cow">
        <div class="section-tag tag-animate" style="justify-content: center;">
          <div class="tag-stripes tag-stripes--coral">
            <span></span><span></span><span></span>
          </div>
          <span class="tag-label" style="color: var(--color-navy-light)">THE HIDDEN COST</span>
        </div>
        <h2 id="hidden-cost-heading" class="sr-only">The Hidden Cost</h2>
        <p class="purple-cow-quote animate-on-scroll">"Your most expensive employee doesn't exist."</p>
        <p class="purple-cow-text animate-on-scroll delay-1">There are 150 to 200 hours of invisible manual work hiding in your operation every single week. Ghost employees — phantom salaries buried in rekeying, error correction, and shadow processes that nobody mapped and nobody owns. Four to five full-time salaries you're paying for work that shouldn't exist.</p>
        <a href="/case-studies" class="text-link text-link--coral animate-on-scroll delay-2" data-link>See how I found $1M in hidden waste &rarr;</a>
      </div>
    </section>

    <section class="page-section page-section--sand" aria-labelledby="services-heading">
      <div class="container">
        <div class="section-tag tag-animate">
          <div class="tag-stripes tag-stripes--coral">
            <span></span><span></span><span></span>
          </div>
          <span class="tag-label" style="color: var(--color-navy-light)">WHAT WE DO</span>
        </div>
        <h2 id="services-heading" class="section-heading animate-on-scroll">Fractional expertise. Full-time results.</h2>
        <div class="services-grid stagger-children">
          <div class="card">
            <p class="service-card-label">FIND</p>
            <p class="card-text">I diagnose the hidden leverage point in your operation. The bleed you can't see. The ghost employees consuming hundreds of hours. The vanity metrics hiding dead inventory. In 2 weeks.</p>
          </div>
          <div class="card">
            <p class="service-card-label">BUILD</p>
            <p class="card-text">I build the AI tool that fixes it. Not a slide deck. A working solution — built by someone who's been inside operations like yours for 30 years. In 3 to 4 weeks.</p>
          </div>
          <div class="card">
            <p class="service-card-label">LIFT</p>
            <p class="card-text">I measure the impact. Dollars saved, hours recovered, availability maintained. Real numbers. Real fast.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="page-section page-section--navy" aria-labelledby="results-heading">
      <div class="container">
        <div class="section-tag tag-animate">
          <div class="tag-stripes tag-stripes--cream">
            <span></span><span></span><span></span>
          </div>
          <span class="tag-label" style="color: var(--color-cream); opacity: 0.8">RESULTS</span>
        </div>
        <h2 id="results-heading" class="sr-only">Results</h2>
        <div class="stats-row stagger-children">
          <div class="stat-card">
            <div class="stat-number" data-count="30">30+</div>
            <div class="stat-label">Years in Industrial Distribution</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">150&ndash;200</div>
            <div class="stat-label">Hours/Week of Ghost Work Found</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">$1M+</div>
            <div class="stat-label">Cash Freed at a Single Client</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">98%</div>
            <div class="stat-label">Product Availability Maintained</div>
          </div>
        </div>
      </div>
    </section>

    <section class="page-section page-section--cream" aria-labelledby="origin-heading">
      <div class="container">
        <div class="story-teaser">
          <div class="story-teaser-text">
            <div class="section-tag tag-animate">
              <div class="tag-stripes tag-stripes--coral">
                <span></span><span></span><span></span>
              </div>
              <span class="tag-label" style="color: var(--color-navy-light)">THE ORIGIN</span>
            </div>
            <h2 id="origin-heading" class="section-heading animate-on-scroll">The Room Went Silent.</h2>
            <p class="animate-on-scroll delay-1">I spent fifteen years watching operations bleed money in places nobody could see. So I pulled the data. Documented dozens of cases of hidden financial damage. Put it in front of leadership.</p>
            <p class="animate-on-scroll delay-2">And the room went silent. Not because I was a great presenter. Because the numbers were undeniable. They'd been bleeding — in places they couldn't see — for years.</p>
            <a href="/about" class="text-link text-link--coral animate-on-scroll delay-3" data-link>Read the full story &rarr;</a>
          </div>
          <div class="story-teaser-visual" aria-hidden="true">
            <div class="story-retro-bg"></div>
            <svg class="story-lever-graphic lever-icon--teal" viewBox="0 0 48 38" width="200" height="160">
              <polygon points="24,28 18,34 30,34" fill="currentColor"/>
              <line x1="10" y1="22" x2="38" y2="28" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
              <circle cx="10" cy="22" r="4" fill="currentColor" opacity="0.8"/>
              <rect x="33" y="20" width="10" height="8" rx="1" fill="currentColor" opacity="0.8"/>
              <line x1="38" y1="20" x2="38" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
              <polygon points="36,14 38,10 40,14" fill="currentColor" opacity="0.6"/>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <section class="page-section page-section--sand" aria-labelledby="lead-magnet-heading">
      <div class="container">
        <div class="lead-magnet-banner animate-on-scroll">
          <div class="lead-magnet-banner-text">
            <div class="section-tag tag-animate">
              <div class="tag-stripes tag-stripes--teal">
                <span></span><span></span><span></span>
              </div>
              <span class="tag-label" style="color: var(--color-navy-light)">FREE RESOURCE</span>
            </div>
            <h2 id="lead-magnet-heading" class="lead-magnet-banner-headline">Find the Lever — Digital Edition</h2>
            <p class="lead-magnet-banner-sub">The exact framework I use to find hidden leverage points in industrial operations. Download the guide free.</p>
          </div>
          <a href="/download" class="btn btn--coral btn-press lead-magnet-banner-btn" data-link>Get the Free Guide &rarr;</a>
        </div>
      </div>
    </section>

    <div class="wave-divider" aria-hidden="true">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0,50 C360,0 720,70 1080,20 C1260,5 1380,30 1440,20 L1440,80 L0,80 Z" fill="var(--color-navy-deep)"/>
      </svg>
    </div>

    <section class="page-section page-section--navy-deep cta-section" aria-labelledby="cta-heading">
      <div class="container" style="position: relative; z-index: 1;">
        <div class="retro-sun-bg" aria-hidden="true"></div>
        <h2 id="cta-heading" class="cta-headline animate-on-scroll">Every operation has a lever.</h2>
        <p class="cta-subtext animate-on-scroll delay-1">The question is whether you've found yours.</p>
        <a href="/contact" class="btn btn--coral btn--lg btn-press animate-on-scroll delay-2" data-link>Let's Find It Together &rarr;</a>
        <p class="cta-micro animate-on-scroll delay-3">20-minute discovery call. No pitch. Just a look under the hood.</p>
        <p class="cta-scarcity animate-on-scroll delay-3">We take on 3 new clients per quarter.</p>
      </div>
    </section>
  `;
}

function updateMeta(name, content) {
  const el = document.querySelector(`meta[name="${name}"]`);
  if (el) el.setAttribute('content', content);
}
