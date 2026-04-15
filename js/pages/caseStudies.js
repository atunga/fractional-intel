export function renderCaseStudies() {
  document.title = 'Case Studies | The Fractional Intelligence Company';

  return `
    <section class="page-section page-section--cream" style="padding-top: calc(72px + var(--space-3xl));" aria-labelledby="cases-heading">
      <div class="container">
        <div class="section-tag tag-animate">
          <div class="tag-stripes tag-stripes--coral">
            <span></span><span></span><span></span>
          </div>
          <span class="tag-label" style="color: var(--color-navy-light)">CASE STUDIES</span>
        </div>
        <h1 id="cases-heading" class="section-heading animate-on-scroll">The Lever in Action</h1>
        <p class="section-subhead animate-on-scroll delay-1">Real operations. Real hidden costs. Real results — measured in dollars, hours, and availability.</p>

        <div class="case-studies-grid" style="margin-top: var(--space-2xl);">

          <div class="case-card animate-on-scroll">
            <h2 class="case-card-title">The Ghost Workforce</h2>
            <p class="case-card-industry">Industrial Distribution / 40+ Branches</p>
            <div class="case-phase">
              <div class="case-phase-label">
                <div class="case-phase-stripe case-phase-stripe--coral"></div>
                <span class="case-phase-name case-phase-name--coral">THE FORCE</span>
              </div>
              <p class="case-phase-text">Operational audit, 2 weeks. Mapped every manual touchpoint, shadow workflow, and rekeying process across the organization.</p>
            </div>
            <div class="case-phase">
              <div class="case-phase-label">
                <div class="case-phase-stripe case-phase-stripe--teal"></div>
                <span class="case-phase-name case-phase-name--teal">THE FULCRUM</span>
              </div>
              <p class="case-phase-text">Discovered 150 to 200 hours per week of manual rekeying, error correction, and shadow processes. An invisible workforce hiding in plain sight.</p>
            </div>
            <div class="case-phase">
              <div class="case-phase-label">
                <div class="case-phase-stripe case-phase-stripe--gold"></div>
                <span class="case-phase-name case-phase-name--gold">THE LIFT</span>
              </div>
              <p class="case-phase-text">Built AI tools eliminating the ghost work — equivalent of 4 to 5 full-time employees freed to do real work.</p>
            </div>
            <div class="case-stat">
              <span class="case-stat-number">150-200</span>
              <span class="case-stat-label">hrs/week saved</span>
            </div>
          </div>

          <div class="case-card animate-on-scroll delay-1">
            <h2 class="case-card-title">The Million-Dollar Shelf</h2>
            <p class="case-card-industry">Hose &amp; Coupling Distribution</p>
            <div class="case-phase">
              <div class="case-phase-label">
                <div class="case-phase-stripe case-phase-stripe--coral"></div>
                <span class="case-phase-name case-phase-name--coral">THE FORCE</span>
              </div>
              <p class="case-phase-text">Inventory diagnostic. Pulled the real numbers behind the dashboard metrics that looked green across the board.</p>
            </div>
            <div class="case-phase">
              <div class="case-phase-label">
                <div class="case-phase-stripe case-phase-stripe--teal"></div>
                <span class="case-phase-name case-phase-name--teal">THE FULCRUM</span>
              </div>
              <p class="case-phase-text">Found 25% dead inventory hiding behind 98% availability metrics. A million dollars sitting on shelves that nobody needed.</p>
            </div>
            <div class="case-phase">
              <div class="case-phase-label">
                <div class="case-phase-stripe case-phase-stripe--gold"></div>
                <span class="case-phase-name case-phase-name--gold">THE LIFT</span>
              </div>
              <p class="case-phase-text">Reduced dead stock 60%, freed $1M+ cash, maintained 98%+ availability. Better results with less inventory.</p>
            </div>
            <div class="case-stat">
              <span class="case-stat-number">$1M+</span>
              <span class="case-stat-label">cash freed</span>
            </div>
          </div>

          <div class="case-card animate-on-scroll delay-2">
            <h2 class="case-card-title">The Invisible Payroll</h2>
            <p class="case-card-industry">Industrial Distribution / $50M Revenue</p>
            <div class="case-phase">
              <div class="case-phase-label">
                <div class="case-phase-stripe case-phase-stripe--coral"></div>
                <span class="case-phase-name case-phase-name--coral">THE FORCE</span>
              </div>
              <p class="case-phase-text">AI operations engagement. Full process audit focused on daily time-sinks across the team.</p>
            </div>
            <div class="case-phase">
              <div class="case-phase-label">
                <div class="case-phase-stripe case-phase-stripe--teal"></div>
                <span class="case-phase-name case-phase-name--teal">THE FULCRUM</span>
              </div>
              <p class="case-phase-text">Identified 3 to 4 hours of daily Excel analysis per person that should take minutes. The entire team was doing the computer's job by hand.</p>
            </div>
            <div class="case-phase">
              <div class="case-phase-label">
                <div class="case-phase-stripe case-phase-stripe--gold"></div>
                <span class="case-phase-name case-phase-name--gold">THE LIFT</span>
              </div>
              <p class="case-phase-text">Custom AI tools cut analysis from hours to minutes. 20% annual supply chain cost reduction.</p>
            </div>
            <div class="case-stat">
              <span class="case-stat-number">20%</span>
              <span class="case-stat-label">cost reduction</span>
            </div>
          </div>

        </div>
      </div>
    </section>

    <div class="wave-divider" aria-hidden="true">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0,50 C360,0 720,70 1080,20 C1260,5 1380,30 1440,20 L1440,80 L0,80 Z" fill="var(--color-navy-deep)"/>
      </svg>
    </div>

    <section class="page-section page-section--navy-deep cta-section" aria-labelledby="cases-cta-heading">
      <div class="container" style="position: relative; z-index: 1;">
        <div class="retro-sun-bg" aria-hidden="true"></div>
        <h2 id="cases-cta-heading" class="cta-headline animate-on-scroll">Your operation has a story like these.</h2>
        <p class="cta-subtext animate-on-scroll delay-1">The question is whether you've found the lever yet.</p>
        <a href="/contact" class="btn btn--coral btn--lg btn-press animate-on-scroll delay-2" data-link>Let's Find Yours &rarr;</a>
      </div>
    </section>
  `;
}
