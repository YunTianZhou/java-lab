// Quiz types: choice, text, multi-select, and click-to-order code blocks.
function freshQuizState() {
  return { q: 0, selected: null, checked: false, response: "", selections: [], order: [] };
}
function normalizeAnswer(value, compact = false) {
  const text = String(value).replace(/\r/g, "").trim();
  return compact
    ? text.replace(/\s+/g, "")
    : text
        .split("\n")
        .map((line) => line.trimEnd())
        .join("\n");
}
function hasQuizAnswer(question, state) {
  if (question.kind === "text") return !!String(state.response || "").trim();
  if (question.kind === "multi") return !!state.selections?.length;
  if (question.kind === "order") return state.order?.length === question.options.length;
  return state.selected !== null;
}
function quizAnswerCorrect(question, state) {
  if (question.kind === "text")
    return question.answers.some(
      (answer) =>
        normalizeAnswer(answer, question.compact) ===
        normalizeAnswer(state.response, question.compact),
    );
  if (question.kind === "multi")
    return (
      JSON.stringify([...(state.selections || [])].sort()) ===
      JSON.stringify([...question.answerIndices].sort())
    );
  if (question.kind === "order")
    return JSON.stringify(state.order) === JSON.stringify(question.answerOrder);
  return state.selected === question.answerIndex;
}
function quizAnswerHTML(question, state) {
  const disabled = state.checked ? "disabled" : "";
  if (question.kind === "text")
    return (
      '<label class="field">Your answer<textarea id="quiz-response" class="quiz-response" rows="3" spellcheck="false" ' +
      disabled +
      ">" +
      escapeHTML(state.response || "") +
      "</textarea></label>"
    );
  if (question.kind === "order") {
    const ordered = state.order || [];
    return (
      '<p>Select the code blocks in the order they should run.</p><div class="order-selection" aria-label="Your ordered code">' +
      ordered
        .map(
          (index, position) =>
            "<div><span>" +
            (position + 1) +
            "</span><code>" +
            escapeHTML(question.options[index]) +
            "</code></div>",
        )
        .join("") +
      '</div><div class="order-options">' +
      question.options
        .map(
          (option, index) =>
            '<button type="button" class="choice" data-order="' +
            index +
            '" ' +
            (state.checked || ordered.includes(index) ? "disabled" : "") +
            '><span class="answer-text">' +
            escapeHTML(option) +
            "</span></button>",
        )
        .join("") +
      '</div><button type="button" class="button secondary" id="clear-order" ' +
      disabled +
      ">Clear order</button>"
    );
  }
  const multi = question.kind === "multi";
  return (
    (multi ? "<p>Select all that apply.</p>" : "") +
    '<div role="group" aria-label="Answer choices">' +
    question.options
      .map((option, index) => {
        const selected = multi
          ? (state.selections || []).includes(index)
          : state.selected === index;
        return (
          '<button type="button" class="choice ' +
          (selected ? "selected" : "") +
          '" data-choice="' +
          index +
          '" aria-pressed="' +
          selected +
          '" ' +
          disabled +
          '><span class="letter">' +
          (multi ? (selected ? "✓" : "□") : String.fromCharCode(65 + index)) +
          '</span><span class="answer-text">' +
          escapeHTML(option) +
          "</span></button>"
        );
      })
      .join("") +
    "</div>"
  );
}
function renderQuiz(key) {
  const questions = quizzes[key];
  let state = quizState[key];
  if (!state || !Number.isInteger(state.q) || state.q < 0 || state.q > questions.length)
    state = quizState[key] = freshQuizState();
  if (state.q === questions.length)
    return (
      '<section class="panel quiz-panel completion"><div class="completion-icon">✓</div><h2>Completed!</h2><p>You solved all ' +
      questions.length +
      ' questions.</p><button class="button secondary" id="review-quiz">Try the quiz again</button></section>'
    );
  const question = questions[state.q];
  return (
    '<section class="panel quiz-panel"><div class="question-count">QUESTION ' +
    (state.q + 1) +
    " / " +
    questions.length +
    '</div><h2 tabindex="-1" id="question-title">' +
    escapeHTML(question.title) +
    "</h2>" +
    (question.scenario ? "<p>" + richText(question.scenario) + "</p>" : "") +
    (question.code ? codeBlock(question.code, "Quiz snippet") : "") +
    quizAnswerHTML(question, state) +
    '<div id="quiz-feedback" role="status">' +
    (state.checked ? '<div class="feedback">✓ ' + richText(question.explanation) + "</div>" : "") +
    '</div><div class="quiz-actions"><button class="button" id="check-answer" ' +
    (!hasQuizAnswer(question, state) && !state.checked ? "disabled" : "") +
    ">" +
    (state.checked
      ? state.q === questions.length - 1
        ? "Finish quiz"
        : "Next question"
      : "Check answer") +
    "</button></div></section>"
  );
}
function refreshQuiz(key) {
  document.querySelector("#lesson-content").innerHTML = renderQuiz(key);
  bindQuiz(key);
  save();
}
function bindQuiz(key) {
  const state = quizState[key],
    review = document.querySelector("#review-quiz");
  if (review) {
    review.onclick = () => {
      quizState[key] = freshQuizState();
      refreshQuiz(key);
    };
    return;
  }
  const question = quizzes[key][state.q];
  document.querySelectorAll("[data-choice]").forEach(
    (button) =>
      (button.onclick = () => {
        const index = Number(button.dataset.choice);
        if (question.kind === "multi") {
          const selected = new Set(state.selections || []);
          selected.has(index) ? selected.delete(index) : selected.add(index);
          state.selections = [...selected];
        } else state.selected = index;
        refreshQuiz(key);
        document.querySelector('[data-choice="' + index + '"]').focus();
      }),
  );
  document.querySelectorAll("[data-order]").forEach(
    (button) =>
      (button.onclick = () => {
        state.order = [...(state.order || []), Number(button.dataset.order)];
        refreshQuiz(key);
      }),
  );
  const clear = document.querySelector("#clear-order");
  if (clear)
    clear.onclick = () => {
      state.order = [];
      refreshQuiz(key);
    };
  const response = document.querySelector("#quiz-response");
  if (response)
    response.oninput = () => {
      state.response = response.value;
      save();
      document.querySelector("#quiz-feedback").textContent = "";
      document.querySelector("#check-answer").disabled = !hasQuizAnswer(question, state);
    };
  document.querySelector("#check-answer").onclick = () => {
    if (state.checked) {
      state.q++;
      state.selected = null;
      state.checked = false;
      state.response = "";
      state.selections = [];
      state.order = [];
      if (state.q === quizzes[key].length) markComplete(current);
      refreshQuiz(key);
      document.querySelector("#question-title")?.focus();
      return;
    }
    if (quizAnswerCorrect(question, state)) {
      state.checked = true;
      refreshQuiz(key);
      document.querySelector("#check-answer").focus();
    } else
      document.querySelector("#quiz-feedback").innerHTML =
        '<div class="feedback error">Not quite. ' +
        richText(question.explanation) +
        " Try again.</div>";
  };
}
