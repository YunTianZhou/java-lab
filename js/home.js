let homeUnit = 1;
try {
  const stored = Number(sessionStorage.getItem("java-lab-home-unit"));
  if (HOME_CONTENT.units[stored]) homeUnit = stored;
} catch {}
function rememberHomeUnit(unit) {
  if (!HOME_CONTENT.units[unit]) return;
  homeUnit = unit;
  try {
    sessionStorage.setItem("java-lab-home-unit", String(unit));
  } catch {}
}
function renderHome() {
  const banner = HOME_CONTENT.units[homeUnit];
  const content = courseContent[homeUnit];
  const done = loadUnitState(homeUnit).completed;

  return /* HTML */ `<div class="enter">
    <div class="intro">
      <div>
        <h1>${escapeHTML(HOME_CONTENT.title)}</h1>
        <p>${escapeHTML(HOME_CONTENT.subtitle)}</p>
      </div>
      <span class="tag">NO EXPERIENCE NEEDED</span>
    </div>
    <section class="hero" data-unit="${homeUnit}" style="--hero-bg:${banner.background};--hero-border:${banner.border};--hero-accent:${banner.accent}">
      <div class="hero-copy">
        <h2>${escapeHTML(banner.title)}</h2>
        <p>${escapeHTML(banner.description)}</p>
        <a class="button" href="${lessonHref(nextIncomplete(homeUnit), homeUnit)}"><span>▷</span> ${done.size === content.steps.length ? "Review" : done.size ? "Continue" : "Start"} Unit ${homeUnit}</a>
      </div>
      <div class="hero-code"><div class="window-bar"><i></i><i></i><i></i><span>${escapeHTML(banner.file)}</span></div><pre><code>${highlight(banner.code)}</code></pre><div class="hero-output"><span>›</span> ${escapeHTML(banner.output)}<span class="cursor"> ▍</span></div></div>
    </section>
    <div class="metrics">
      <div class="metric">
        <span class="metric-icon">▤</span>
        <div><strong>Bite-sized units</strong><small>A clear path from zero</small></div>
      </div>
      <div class="metric">
        <span class="metric-icon">⌘</span>
        <div><strong>Learn by doing</strong><small>Less reading, more trying</small></div>
      </div>
      <div class="metric">
        <span class="metric-icon">⚑</span>
        <div><strong>Build something yours</strong><small>Mini projects along the way</small></div>
      </div>
    </div>
    <div class="section-heading"><h2>Your learning path</h2></div>
    <section class="unit-grid">
      <a class="unit-card featured" href="#lesson/${nextIncomplete()}"
        ><div class="unit-art">
          <span class="art-label">THE STARTING POINT</span><span class="code-glyph">{ ; }</span>
        </div>
        <div class="unit-body">
          <div class="unit-meta">
            <span>UNIT 01</span
            ><span class="status"
              >${completed.size === steps.length ? "Completed" : "READY WHEN YOU ARE"}</span
            >
          </div>
          <h3>The fundamentals</h3>
          <p>Say hello, store your ideas, and give your data a type.</p>
          <div class="chips">
            <span>System I/O</span><span>Variables</span><span>Data types</span
            ><span>Arithmetic</span><span>Strings</span>
          </div>
          <div class="unit-footer">
            <span
              >${
                completed.size === steps.length
                  ? "Review unit"
                  : completed.size
                    ? "Continue unit"
                    : "Explore unit"
              } <span style="color:#739550">↗</span></span
            ><small
              >${
                completed.size
                  ? completed.size + "/" + steps.length + " complete"
                  : `${steps.length} steps · ${steps.filter((step) => step.type === "build").length} builds`
              }</small
            >
          </div>
        </div></a
      >
      <a class="unit-card featured" href="${lessonHref(nextIncomplete(2), 2)}">
        <div class="unit-art purple"><span class="art-label">CHOOSE YOUR PATH</span><span class="code-glyph">? :</span></div>
        <div class="unit-body"><div class="unit-meta"><span>UNIT 02</span><span class="status">${loadUnitState(2).completed.size === UNIT_2_CONTENT.steps.length ? "Completed" : "AVAILABLE"}</span></div>
        <h3>Making decisions</h3><p>Compare values, validate input, and choose what your program does next.</p>
        <div class="chips"><span>Conditions</span><span>Input checks</span><span>if / else</span><span>?:</span><span>switch</span></div>
        <div class="unit-footer"><span>${loadUnitState(2).completed.size ? "Continue unit" : "Explore unit"} ↗</span><small>${loadUnitState(2).completed.size ? loadUnitState(2).completed.size + "/" + UNIT_2_CONTENT.steps.length + " complete" : UNIT_2_CONTENT.steps.length + " steps · 4 builds"}</small></div></div>
      </a>
      <a class="unit-card featured" href="${lessonHref(nextIncomplete(3), 3)}">
        <div class="unit-art peach"><span class="art-label">REPEAT AND REFINE</span><span class="code-glyph">↻</span></div>
        <div class="unit-body"><div class="unit-meta"><span>UNIT 03</span><span class="status">${loadUnitState(3).completed.size === UNIT_3_CONTENT.steps.length ? "Completed" : "AVAILABLE"}</span></div>
        <h3>On repeat</h3><p>Trace loops, validate input, and build games that keep going.</p>
        <div class="chips"><span>while / do-while</span><span>for</span><span>Scanner</span><span>Random</span></div>
        <div class="unit-footer"><span>${loadUnitState(3).completed.size === UNIT_3_CONTENT.steps.length ? "Review unit" : loadUnitState(3).completed.size ? "Continue unit" : "Explore unit"} ↗</span><small>${loadUnitState(3).completed.size ? loadUnitState(3).completed.size + "/" + UNIT_3_CONTENT.steps.length + " complete" : "18 steps · 5 builds"}</small></div></div>
      </a>
    </section>
    <div class="howto">
      <strong>Your learning path:</strong><span><b>▤</b> Learn a concept</span
      ><span><b>◇</b> Try it out</span><span><b>⚑</b> Make it yours</span>
    </div>
  </div>`;
}
