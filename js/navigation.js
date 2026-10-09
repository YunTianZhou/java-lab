const app = document.querySelector("#app");
const stepScrollPositions = new Map();
function render() {
  const stepNav = document.querySelector("#lesson-nav");
  if (stepNav.dataset.unit) stepScrollPositions.set(stepNav.dataset.unit, stepNav.scrollTop);
  const unitMatch = location.hash.match(/^#unit\/([123])\/lesson\/(\d+)$/);
  const match = location.hash.match(/^#lesson\/(\d+)$/);
  activateUnit(unitMatch ? Number(unitMatch[1]) : 1);
  setCurrent(unitMatch ? Number(unitMatch[2]) : match ? Number(match[1]) : -1);
  if (current >= steps.length) {
    setCurrent(-1);
    activateUnit(1);
  }
  if (current >= 0) rememberHomeUnit(activeUnit);
  if (current >= 0) {
    const unitLink = document.querySelector(
      activeUnit === 1 ? "#unit-link" : `#unit${activeUnit}-link`,
    );
    if (unitLink.nextElementSibling !== stepNav) unitLink.after(stepNav);
  }
  document.querySelector("#home-link").classList.toggle("active", current < 0);
  document.querySelector("#unit-link").classList.toggle("active", current >= 0 && activeUnit === 1);
  document
    .querySelector("#unit2-link")
    .classList.toggle("active", current >= 0 && activeUnit === 2);
  document
    .querySelector("#unit3-link")
    .classList.toggle("active", current >= 0 && activeUnit === 3);
  document.querySelector("#breadcrumb").textContent =
    current < 0
      ? "Overview"
      : `Unit ${String(activeUnit).padStart(2, "0")} · ${unitTitles[activeUnit]}`;
  if (current < 0) {
    stepNav.replaceChildren();
    delete stepNav.dataset.unit;
  } else {
    // Keep the same list nodes while moving between steps in a unit.
    if (stepNav.dataset.unit !== String(activeUnit)) {
      stepNav.innerHTML = `<nav class="subnav" aria-label="Unit ${activeUnit} steps">${steps.map((s, i) => /* HTML */ `<a href="${lessonHref(i)}"><span>${s.icon}</span><span>${String(i + 1).padStart(2, "0")} ${s.title}</span></a>`).join("")}</nav>`;
      stepNav.dataset.unit = String(activeUnit);
      stepNav.scrollTop = stepScrollPositions.get(String(activeUnit)) || 0;
    }
    stepNav.querySelectorAll(".subnav a").forEach((link, i) => {
      link.classList.toggle("current", i === current);
      link.classList.toggle("done", completed.has(i));
      if (i === current) link.setAttribute("aria-current", "step");
      else link.removeAttribute("aria-current");
      link.firstElementChild.textContent = completed.has(i) ? "✓" : steps[i].icon;
    });
  }
  app.innerHTML = current < 0 ? renderHome() : renderLesson(current);
  if (current >= 0) bindStep();
  document.title = current < 0 ? "Java Lab" : steps[current].title + " — Java Lab";
  window.scrollTo(0, 0);
  const active = document.querySelector(".subnav .current");
  if (active) {
    const bounds = stepNav.getBoundingClientRect(),
      item = active.getBoundingClientRect();
    // Reveal only the part outside the viewport; never scroll the whole page or restart at the top.
    if (item.top < bounds.top) stepNav.scrollTop -= bounds.top - item.top;
    else if (item.bottom > bounds.bottom) stepNav.scrollTop += item.bottom - bounds.bottom;
  }
}
function renderLesson(i) {
  const s = steps[i];
  return /* HTML */ `<article class="enter">
    <div class="lesson-meta">
      <span>STEP ${String(i + 1).padStart(2, "0")} OF ${steps.length}</span
      ><span class="lesson-kind"
        >${s.icon} ${i === steps.length - 1 ? "FINAL PROJECT" : s.type.toUpperCase()} ·
        ${s.time}</span
      >
    </div>
    <h1 class="lesson-title">${s.title}</h1>
    <p class="lesson-description">${s.description}</p>
    <div
      class="progress-track"
      role="progressbar"
      aria-label="Unit ${activeUnit} completed steps"
      aria-valuemin="0"
      aria-valuemax="${steps.length}"
      aria-valuenow="${completed.size}"
    >
      <div style="width:${(completed.size / steps.length) * 100}%"></div>
    </div>
    <div id="lesson-content">
      ${
        s.type === "quiz"
          ? renderQuiz(s.key)
          : s.type === "build"
            ? renderBuild(s.key)
            : renderConcept(s.key)
      }
    </div>
    <div class="lesson-bottom">
      <a class="button secondary" href="${i === 0 ? "#home" : lessonHref(i - 1)}"
        >${i === 0 ? "Course overview" : "Previous step"}</a
      ><span id="completion-count">${completed.size} of ${steps.length} completed</span
      ><button
        class="button"
        id="next-step"
        ${s.type !== "lesson" && !completed.has(i) ? "disabled" : ""}
      >
        ${
          i === steps.length - 1
            ? "Finish unit"
            : s.type === "lesson"
              ? "Complete & continue"
              : "Next step"
        }
      </button>
    </div>
    <p class="save-note"></p>
  </article>`;
}
function bindStep() {
  document.querySelector("#next-step").onclick = () => {
    markComplete(current);
    if (current < steps.length - 1) {
      location.hash = lessonHref(current + 1);
      return;
    }
    app.innerHTML = /* HTML */ `<section class="panel completion enter">
      <div class="completion-icon">⚑</div>
      <div class="eyebrow">
        ${completed.size === steps.length ? `UNIT ${String(activeUnit).padStart(2, "0")} COMPLETE` : "FINAL PROJECT COMPLETE"}
      </div>
      <h1>Unit ${activeUnit} project complete</h1>
      <p>
        ${activeUnit === 3 ? "You built a turn-based duel with validation, random choices, and replay." : activeUnit === 1 ? "You converted a decimal amount into bills and coins and verified the total." : "You validated a booking, applied pricing rules, and printed a ticket receipt."}
        ${
          completed.size === steps.length
            ? `You finished all ${steps.length} steps.`
            : `${steps.length - completed.size} earlier steps are still waiting for you.`
        }
      </p>
      <a class="button lime" href="#home">Back to your learning path</a>
    </section>`;
    window.scrollTo(0, 0);
  };
  const s = steps[current];
  if (s.type === "quiz") bindQuiz(s.key);
  else if (s.type === "build") bindBuild(s.key);
  else bindConcept(s.key);
}
