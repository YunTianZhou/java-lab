// Separate unit records preserve Unit 1's existing browser-tab storage.
let completed = new Set(),
  drafts = {},
  quizState = {},
  current = -1;
const unitStateCache = {};
const legacyStepKeys = [
  "lesson:structure",
  "lesson:print",
  "quiz:print",
  "build:intro",
  "lesson:variables",
  "quiz:variables",
  "build:swap",
  "lesson:types",
  "quiz:types",
  "build:robot",
  "lesson:input",
  "quiz:input",
  "build:spaceport",
  "lesson:math",
  "quiz:math",
  "build:pizza",
  "lesson:strings",
  "quiz:strings",
  "build:story",
  "build:money",
];

function storageKey(unit) {
  return unit === 1 ? "java-lab-unit1-v2" : `java-lab-unit${unit}-v1`;
}
function loadUnitState(unit) {
  if (!unitStateCache[unit]) {
    let record = {};
    try {
      record = JSON.parse(sessionStorage.getItem(storageKey(unit)) || "{}") || {};
    } catch {}
    const content = courseContent[unit];
    const keys = new Set(
      Array.isArray(record.completedKeys)
        ? record.completedKeys
        : unit === 1
          ? (Array.isArray(record.completed) ? record.completed : [])
              .map((index) => legacyStepKeys[index])
              .filter(Boolean)
          : [],
    );
    const done = new Set(
      content.steps.flatMap((step, index) => (keys.has(step.type + ":" + step.key) ? [index] : [])),
    );
    const attempts = record.quizzes && typeof record.quizzes === "object" ? record.quizzes : {};
    if (unit === 1 && record.operatorsQuizVersion !== 1) {
      done.delete(content.steps.findIndex((step) => step.type === "quiz" && step.key === "math"));
      if (attempts.math && attempts.math.q >= 3)
        attempts.math = { q: 3, selected: null, checked: false };
    }
    if (unit === 1 && record.moneyProjectVersion !== 1)
      done.delete(content.steps.findIndex((step) => step.key === "money"));
    unitStateCache[unit] = {
      completed: done,
      drafts: record.drafts && typeof record.drafts === "object" ? record.drafts : {},
      quizzes: attempts,
    };
  }
  return unitStateCache[unit];
}
function activateUnit(unit) {
  selectCourse(unit);
  const state = loadUnitState(unit);
  completed = state.completed;
  drafts = state.drafts;
  quizState = state.quizzes;
}
function save() {
  try {
    sessionStorage.setItem(
      storageKey(activeUnit),
      JSON.stringify({
        completed: [...completed],
        completedKeys: [...completed].map((index) => steps[index].type + ":" + steps[index].key),
        drafts,
        quizzes: quizState,
        moneyProjectVersion: 1,
        operatorsQuizVersion: 1,
      }),
    );
  } catch {}
}
function getDraft(key, defaults) {
  if (!drafts[key] || typeof drafts[key] !== "object") drafts[key] = { ...defaults };
  return drafts[key];
}
function nextIncomplete(unit = activeUnit) {
  const content = courseContent[unit];
  const done = loadUnitState(unit).completed;
  for (let i = 0; i < content.steps.length; i++) if (!done.has(i)) return i;
  return 0;
}
function setCurrent(index) {
  current = index;
}
activateUnit(1);
