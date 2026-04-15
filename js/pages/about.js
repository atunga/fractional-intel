export function renderAbout() {
  document.title = 'About | Ted Hebert | The Fractional Intelligence Company';

  return `
    <section class="page-section page-section--cream" style="padding-top: calc(72px + var(--space-3xl));" aria-labelledby="about-origin-heading">
      <div class="container">
        <div class="section-tag tag-animate">
          <div class="tag-stripes tag-stripes--coral">
            <span></span><span></span><span></span>
          </div>
          <span class="tag-label" style="color: var(--color-navy-light)">THE ORIGIN</span>
        </div>
        <h1 id="about-origin-heading" class="section-heading section-heading--display animate-on-scroll" style="margin-bottom: var(--space-3xl);">The Room Went Silent.</h1>

        <div class="about-story-stage animate-on-scroll">
          <p class="about-story-label">BEFORE</p>
          <div class="about-story-text">
            <p>For about fifteen years, I had the same week on repeat. Show up Monday. Open the ERP. Watch the fires start. Expedites that should've been standard orders. Stock-outs on parts we had too much of three months ago. Overnight shipments burning cash because someone missed a reorder point nobody was watching.</p>
            <p>And everywhere I looked, I saw the same thing: good people, working hard, exhausted — doing work that shouldn't have existed in the first place. Rekeying the same data into three systems. Running four-hour Excel reports that answered questions the ERP should've answered in seconds.</p>
          </div>
        </div>

        <div class="wave-divider" aria-hidden="true" style="max-width: 200px; margin-bottom: var(--space-2xl);">
          <svg viewBox="0 0 200 12" preserveAspectRatio="none"><path d="M0,6 C50,12 100,0 150,6 C175,9 190,4 200,6" fill="none" stroke="var(--color-sand)" stroke-width="2"/></svg>
        </div>

        <div class="about-story-stage animate-on-scroll">
          <p class="about-story-label">RISING TENSION</p>
          <div class="about-story-text">
            <p>Nobody thought it was broken. The availability numbers looked good. Customers weren't loudly complaining. The dashboards were green. So the response was always the same: hire another person. Buy another tool. Push harder.</p>
            <p>I watched that playbook fail for years. More headcount didn't fix it — it just spread the same broken process across more people. Better software didn't fix it — it just put a prettier interface on the same bad logic. We even brought in consultants. They gave us slide decks. Beautiful frameworks. Recommendations that would take eighteen months and a seven-figure budget. Nothing changed.</p>
          </div>
        </div>

        <div class="wave-divider" aria-hidden="true" style="max-width: 200px; margin-bottom: var(--space-2xl);">
          <svg viewBox="0 0 200 12" preserveAspectRatio="none"><path d="M0,6 C50,12 100,0 150,6 C175,9 190,4 200,6" fill="none" stroke="var(--color-sand)" stroke-width="2"/></svg>
        </div>

        <div class="about-story-stage animate-on-scroll">
          <p class="about-story-label">TURNING POINT</p>
          <div class="about-story-text">
            <p>So one week, I stopped firefighting. I pulled the data. Not dashboard data — the real stuff. Transaction logs. Error rates. Manual touchpoints. Shadow workflows nobody had ever mapped.</p>
            <p>I documented it. Dozens of cases. Real financial damage — six figures, seven figures — that had been completely invisible. Not because anyone was hiding it. Because when you're in reactive mode every single day, you never stop long enough to see what's actually costing you.</p>
            <p>I put it in front of the leadership team. And the room went silent.</p>
          </div>
        </div>

        <div class="wave-divider" aria-hidden="true" style="max-width: 200px; margin-bottom: var(--space-2xl);">
          <svg viewBox="0 0 200 12" preserveAspectRatio="none"><path d="M0,6 C50,12 100,0 150,6 C175,9 190,4 200,6" fill="none" stroke="var(--color-sand)" stroke-width="2"/></svg>
        </div>

        <div class="about-story-stage animate-on-scroll">
          <p class="about-story-label">AFTER</p>
          <div class="about-story-text">
            <p>That moment changed everything. The hardest part was never the fix. The hardest part was getting people to see the problem. Once the bleed was visible — once you could point to it, quantify it, name it — the fix moved fast. Weeks, not years.</p>
            <p>That's what I've done ever since. For thirty years in this industry. I find the invisible thing that's costing you a fortune. The ghost employees. The vanity metrics. The processes your best people are holding together with heroic effort that nobody should need.</p>
          </div>
        </div>

        <div class="wave-divider" aria-hidden="true" style="max-width: 200px; margin-bottom: var(--space-2xl);">
          <svg viewBox="0 0 200 12" preserveAspectRatio="none"><path d="M0,6 C50,12 100,0 150,6 C175,9 190,4 200,6" fill="none" stroke="var(--color-sand)" stroke-width="2"/></svg>
        </div>

        <div class="about-story-stage animate-on-scroll">
          <p class="about-story-label">UNIVERSAL TRUTH</p>
          <div class="about-story-text">
            <p>The biggest problem in your operation isn't the one you're fighting every day. It's the one you've never seen — because you've been too busy fighting everything else to look.</p>
            <p>Every operation has a lever. Most companies can't see it because their ghost employees have been standing in front of it for twenty years.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="page-section page-section--sand" aria-label="Universal Truth">
      <div class="pull-quote">
        <div class="wave-divider" aria-hidden="true" style="max-width: 120px; margin: 0 auto var(--space-xl);">
          <svg viewBox="0 0 120 12" preserveAspectRatio="none"><path d="M0,6 C30,12 60,0 90,6 C105,9 115,4 120,6" fill="none" stroke="var(--color-coral)" stroke-width="2"/></svg>
        </div>
        <p class="pull-quote-text animate-on-scroll">"The biggest problem in your operation isn't the one you're fighting every day. It's the one you've never seen."</p>
        <div class="wave-divider" aria-hidden="true" style="max-width: 120px; margin: var(--space-xl) auto 0;">
          <svg viewBox="0 0 120 12" preserveAspectRatio="none"><path d="M0,6 C30,12 60,0 90,6 C105,9 115,4 120,6" fill="none" stroke="var(--color-coral)" stroke-width="2"/></svg>
        </div>
      </div>
    </section>

    <section class="page-section page-section--cream" aria-labelledby="proof-heading">
      <div class="container">
        <div class="section-tag tag-animate">
          <div class="tag-stripes tag-stripes--teal">
            <span></span><span></span><span></span>
          </div>
          <span class="tag-label" style="color: var(--color-navy-light)">PROOF POINTS</span>
        </div>
        <h2 id="proof-heading" class="section-heading animate-on-scroll">The Track Record</h2>
        <div class="credentials-grid stagger-children">
          <div class="credential-card">
            <div class="credential-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </div>
            <p class="credential-text">30+ years in industrial distribution</p>
          </div>
          <div class="credential-card">
            <div class="credential-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
            </div>
            <p class="credential-text">Managed 40+ branch operations internationally</p>
          </div>
          <div class="credential-card">
            <div class="credential-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <p class="credential-text">AI tools saving 150 to 200 hours per week</p>
          </div>
          <div class="credential-card">
            <div class="credential-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
            </div>
            <p class="credential-text">$1M+ cash freed at a single client</p>
          </div>
          <div class="credential-card">
            <div class="credential-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <p class="credential-text">98%+ availability from a sub-70% baseline</p>
          </div>
          <div class="credential-card">
            <div class="credential-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            </div>
            <p class="credential-text">Aerospace, defense, automotive, fasteners</p>
          </div>
        </div>
      </div>
    </section>

    <section class="page-section page-section--sand" aria-labelledby="meet-heading">
      <div class="container">
        <div class="section-tag tag-animate">
          <div class="tag-stripes tag-stripes--teal">
            <span></span><span></span><span></span>
          </div>
          <span class="tag-label" style="color: var(--color-navy-light)">MEET TED</span>
        </div>
        <h2 id="meet-heading" class="section-heading animate-on-scroll">The Person Behind the Lever</h2>
        <div class="meet-ted animate-on-scroll delay-1">
          <p>High energy, early riser, and unapologetically action-oriented. When I'm not finding leverage points in industrial operations, you'll find me in the gym following a Funk Roberts workout, arguing about whether the Razor Crest is the best ship in Star Wars (it is), or cranking 80s hair bands loud enough to annoy the neighbors. Massachusetts born, Superman fan, and the kind of person who thinks the best way to start any Monday is at full speed.</p>
          <p class="meet-ted-spirit">It's OK to be AWESOME!</p>
        </div>
      </div>
    </section>

    <div class="wave-divider" aria-hidden="true">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0,50 C360,0 720,70 1080,20 C1260,5 1380,30 1440,20 L1440,80 L0,80 Z" fill="var(--color-navy-deep)"/>
      </svg>
    </div>

    <section class="page-section page-section--navy-deep cta-section" aria-labelledby="about-cta-heading">
      <div class="container" style="position: relative; z-index: 1;">
        <div class="retro-sun-bg" aria-hidden="true"></div>
        <h2 id="about-cta-heading" class="cta-headline animate-on-scroll">Every operation has a lever.</h2>
        <p class="cta-subtext animate-on-scroll delay-1">The question is whether you've found yours.</p>
        <a href="/contact" class="btn btn--coral btn--lg btn-press animate-on-scroll delay-2" data-link>Find Your Lever &rarr;</a>
      </div>
    </section>
  `;
}
