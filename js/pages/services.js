export function renderServices() {
  document.title = 'Services | Find. Build. Lift. | The Fractional Intelligence Company';

  return `
    <section class="page-section page-section--cream" style="padding-top: calc(72px + var(--space-3xl));" aria-labelledby="services-main-heading">
      <div class="container">
        <div class="section-tag tag-animate">
          <div class="tag-stripes tag-stripes--coral">
            <span></span><span></span><span></span>
          </div>
          <span class="tag-label" style="color: var(--color-navy-light)">HOW WE WORK</span>
        </div>
        <h1 id="services-main-heading" class="section-heading section-heading--display animate-on-scroll">Find. Build. Lift.</h1>
        <p class="section-subhead animate-on-scroll delay-1">A three-phase engagement designed around your operation's hidden leverage point.</p>

        <div class="phase-cards">
          <div class="phase-card animate-on-scroll">
            <div class="phase-number">1</div>
            <div class="phase-body-wrap">
              <h2 class="phase-title">FIND</h2>
              <p class="phase-duration">Duration: 2 weeks</p>
              <div class="phase-body">
                <p>Operational audit, process mapping, hidden cost quantification, ghost employee identification. I pull the real data — transaction logs, error rates, manual touchpoints, shadow workflows — and document every dollar your operation is losing in places you can't see.</p>
                <p class="phase-deliverable">Deliverable: A detailed report showing exactly where the bleed is, how much it costs, and where the lever sits.</p>
              </div>
              <a href="/contact" class="text-link text-link--coral phase-cta" data-link>Start with a FIND &rarr;</a>
            </div>
          </div>

          <div class="phase-card animate-on-scroll delay-1">
            <div class="phase-number">2</div>
            <div class="phase-body-wrap">
              <h2 class="phase-title">BUILD</h2>
              <p class="phase-duration">Duration: 3 to 4 weeks</p>
              <div class="phase-body">
                <p>Custom AI tool development, workflow automation, system integration. Not a slide deck. A working solution deployed in your environment.</p>
                <p class="phase-deliverable">Built by someone who's run operations like yours for 30 years. Not by a developer who's never seen a warehouse.</p>
              </div>
            </div>
          </div>

          <div class="phase-card animate-on-scroll delay-2">
            <div class="phase-number">3</div>
            <div class="phase-body-wrap">
              <h2 class="phase-title">LIFT</h2>
              <p class="phase-duration">Duration: Ongoing</p>
              <div class="phase-body">
                <p>Impact measurement, optimization, scaling. I don't disappear after delivery.</p>
                <p class="phase-deliverable">Quantified ROI — dollars saved, hours recovered, availability maintained. Real numbers you can take to your leadership team.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="page-section page-section--sand" aria-labelledby="also-heading">
      <div class="container">
        <div class="section-tag tag-animate">
          <div class="tag-stripes tag-stripes--teal">
            <span></span><span></span><span></span>
          </div>
          <span class="tag-label" style="color: var(--color-navy-light)">ALSO AVAILABLE AS</span>
        </div>
        <h2 id="also-heading" class="section-heading animate-on-scroll">Other Ways to Work Together</h2>
        <div class="also-grid stagger-children">
          <div class="also-card">
            <p class="also-card-title">Fractional Head of AI / Operations</p>
          </div>
          <div class="also-card">
            <p class="also-card-title">AI Strategy Advisory</p>
          </div>
          <div class="also-card">
            <p class="also-card-title">Speaking / Keynotes</p>
          </div>
          <div class="also-card">
            <p class="also-card-title">"Your Most Expensive Employee Doesn't Exist"</p>
          </div>
        </div>
      </div>
    </section>

    <section class="page-section page-section--cream" aria-labelledby="fit-heading">
      <div class="container">
        <div class="section-tag tag-animate">
          <div class="tag-stripes tag-stripes--coral">
            <span></span><span></span><span></span>
          </div>
          <span class="tag-label" style="color: var(--color-navy-light)">THE RIGHT FIT</span>
        </div>
        <h2 id="fit-heading" class="section-heading animate-on-scroll">Is This for You?</h2>
        <p class="section-subhead animate-on-scroll delay-1">This is for operations leaders at $50M to $500M industrial distributors who know something is wrong but can't find it.</p>
        <div class="right-fit-symptoms stagger-children">
          <div class="symptom-item">
            <div class="symptom-bullet"></div>
            <span>Your teams are exhausted but output hasn't improved</span>
          </div>
          <div class="symptom-item">
            <div class="symptom-bullet"></div>
            <span>Margins are thinning and nobody can explain why</span>
          </div>
          <div class="symptom-item">
            <div class="symptom-bullet"></div>
            <span>Error rates won't drop no matter what you try</span>
          </div>
          <div class="symptom-item">
            <div class="symptom-bullet"></div>
            <span>Metrics look fine on paper but everything feels broken</span>
          </div>
          <div class="symptom-item">
            <div class="symptom-bullet"></div>
            <span>Adding headcount doesn't help — it just spreads the problem</span>
          </div>
        </div>
        <div style="margin-top: var(--space-2xl);">
          <a href="/contact" class="btn btn--coral btn-press animate-on-scroll" data-link>Ready to Find Your Lever? &rarr;</a>
        </div>
      </div>
    </section>

    <div class="wave-divider" aria-hidden="true">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0,50 C360,0 720,70 1080,20 C1260,5 1380,30 1440,20 L1440,80 L0,80 Z" fill="var(--color-navy-deep)"/>
      </svg>
    </div>

    <section class="page-section page-section--navy-deep cta-section" aria-labelledby="services-cta-heading">
      <div class="container" style="position: relative; z-index: 1;">
        <div class="retro-sun-bg" aria-hidden="true"></div>
        <h2 id="services-cta-heading" class="cta-headline animate-on-scroll">Every operation has a lever.</h2>
        <p class="cta-subtext animate-on-scroll delay-1">The question is whether you've found yours.</p>
        <a href="/contact" class="btn btn--coral btn--lg btn-press animate-on-scroll delay-2" data-link>Let's Find It Together &rarr;</a>
      </div>
    </section>
  `;
}
