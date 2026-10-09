function renderBuild(key) {
  if (activeUnit === 3) return renderUnit3Build(key);
  const b = builds[key],
    v = getDraft(key, Object.fromEntries(b.fields.map((f) => [f.id, f.value])));
  return /* HTML */ `<div class="lesson-columns build-columns">
    <section class="panel">
      <h2>Instructions</h2>
      <p>${richText(b.mission)}</p>
      <ul class="mission-list">
        ${b.tasks.map((t) => /* HTML */ `<li>${richText(t)}</li>`).join("")}
      </ul>
      ${b.printOnly ? "" : `<h3>Input and output</h3><p>${richText(b.inputInstructions)}</p>`}${
        !b.printOnly && b.sampleInput !== null
          ? `<p>Sample console input, one value per line</p><pre class="sample-output">${escapeHTML(b.sampleInput)}</pre>`
          : ""
      }${
        b.printOnly
          ? ""
          : `<p>Expected result${b.sampleInput !== null ? " after the input prompts" : ""}</p><pre class="sample-output">${escapeHTML(b.sampleOutput)}</pre>`
      }<h3>Hints</h3>${(b.conceptNotes || [])
        .map(
          (n) => /* HTML */ `<details>
              <summary>${escapeHTML(n.title)}</summary>
              <p>${richText(n.text)}</p>
              ${n.code ? codeBlock(n.code, "New concept") : ""}
            </details>`,
        )
        .join("")}${
        b.starterCode
          ? `<details><summary>Optional program structure</summary><p>${richText(b.starterDescription || "This supplies the declarations. Write the swap and output statements yourself.")}</p>${codeBlock(b.starterCode, "Starter Main.java")}</details>`
          : ""
      }${b.hints
        .map(
          (h, n) => /* HTML */ `<details>
              <summary>Hint ${n + 1}</summary>
              <p>${richText(h)}</p>
            </details>`,
        )
        .join("")}
      <details id="solution">
        <summary>Reveal full solution</summary>
        <p>
          Try writing and running your program first. This is one complete solution; other correct
          implementations are possible.
        </p>
        ${codeBlock(b.solutionCode, "Solution Main.java")}
      </details>
      ${b.try?.trim() ? `<p class="try-note">${richText(b.try)}</p>` : ""}${
        b.checklist
          ? `<h3>Check your program</h3><ul>${b.checklist.map((t) => /* HTML */ `<li>${richText(t)}</li>`).join("")}</ul>`
          : ""
      }${b.extension ? `<p class="callout">${richText(b.extension)}</p>` : ""}
    </section>
    <section class="panel playground">
      <h2>${b.printOnly ? "Example result" : "Playground"}</h2>
      ${
        b.printOnly
          ? ""
          : `<p>Change the values to see the result your program should produce. This demonstration does not execute or check your Java code.</p><form id="build-form" novalidate><div class="input-grid">${b.fields.map((f) => renderField(f, v)).join("")}</div><div class="action-row"><button type="submit" class="button lime">Preview expected output</button><button type="button" class="button secondary" id="reset-build">Reset inputs</button></div></form>`
      }
      ${key === "board" ? '<p>Click a cell to toggle X/O; the row inputs update with it.</p><div id="board-grid" class="board-grid" role="group" aria-label="Tic-tac-toe board"></div>' : ""}<div id="build-feedback" role="status"></div>
      ${
        key === "swap"
          ? '<details><summary>Explore the swap step by step</summary><div id="swap-stage"></div><div class="action-row"><button class="button secondary" id="swap-next" type="button">Next assignment</button><button class="button secondary" id="swap-bad" type="button">Try without the table</button></div></details>'
          : ""
      }
      ${consoleBox("build-output", b.printOnly ? b.sampleOutput : v.output || b.sampleOutput, false)}
      ${
        b.printOnly
          ? ""
          : `<p class="save-note">${richText(b.validationNote || "The playground rejects invalid values. Your Unit 1 program may assume valid input; implementing validation comes later.")}</p>`
      }
      <div class="build-self-check">
        <label
          ><input type="checkbox" id="build-written" /> I wrote and ran my program and compared its
          output.</label
        ><button type="button" class="button secondary" id="complete-build" disabled>
          Mark build complete
        </button>
        <p id="self-check-status" role="status"></p>
      </div>
    </section>
  </div>`;
}
function bindBuild(key) {
  if (activeUnit === 3) return bindUnit3Build(key);
  const b = builds[key],
    v = drafts[key],
    form = document.querySelector("#build-form");
  let swapStep = 0;
  if (key === "board") bindBoard(v, form);
  if (form)
    form.oninput = () => {
      for (const [k, value] of new FormData(form)) v[k] = value;
      v.output = "";
      if (key === "board") drawBoard(v);
      save();
      document.querySelector("#build-feedback").textContent = "";
      document.querySelector("#build-output").classList.add("console-stale");
      if (key === "swap") {
        swapStep = 0;
        drawSwap();
      }
    };
  if (form)
    form.onsubmit = (e) => {
      e.preventDefault();
      try {
        v.output = evaluateBuild(key, v);
        if (key === "board") drawBoard(v, true);
        save();
        const out = document.querySelector("#build-output");
        out.textContent = v.output;
        out.classList.remove("console-stale", "console-updated");
        void out.offsetWidth;
        out.classList.add("console-updated");
        document.querySelector("#build-feedback").textContent = "";
        if (key === "swap") {
          swapStep = 0;
          drawSwap();
        }
      } catch (error) {
        document.querySelector("#build-feedback").innerHTML =
          `<div class="feedback error">${escapeHTML(error.message)}</div>`;
        document.querySelector("#build-output").textContent =
          "Correct the input values to preview a result.";
      }
    };
  if (form)
    document.querySelector("#reset-build").onclick = () => {
      drafts[key] = Object.fromEntries(b.fields.map((f) => [f.id, f.value]));
      save();
      document.querySelector("#lesson-content").innerHTML = renderBuild(key);
      bindBuild(key);
    };

  document.querySelector("#build-written").onchange = (e) => {
    document.querySelector("#complete-build").disabled = !e.target.checked;
  };
  document.querySelector("#complete-build").onclick = () => {
    if (!document.querySelector("#build-written").checked) return;
    markComplete(current);
    document.querySelector("#self-check-status").textContent =
      "Marked complete based on your confirmation.";
  };
  function drawSwap(bad = false) {
    const left = v.left || "(empty)",
      right = v.right || "(empty)";
    const states = [
      { left, right, temp: "Empty table" },
      { left, right, temp: left },
      { left: right, right, temp: left },
      { left: right, right: left, temp: left },
    ];
    const x = bad ? { left: right, right, temp: "Not used" } : states[swapStep];
    document.querySelector("#swap-stage").innerHTML = /* HTML */ `<div class="swap-boxes">
        ${[
          ["Left hand", x.left],
          ["Table · temp", x.temp],
          ["Right hand", x.right],
        ]
          .map(
            ([label, value]) => /* HTML */ `<div class="memory-box">
                <small>${label}</small><strong>${escapeHTML(value)}</strong>
              </div>`,
          )
          .join("")}
      </div>
      <p class="swap-caption" role="status">
        ${
          bad
            ? "left = right; right = left; — the original left value was overwritten."
            : [
                "Starting state",
                "temp = left; — save the original",
                "left = right; — replace left",
                "right = temp; — restore the saved value",
              ][swapStep]
        }
      </p>`;
    document.querySelector("#swap-next").textContent =
      swapStep === 3 ? "Replay swap" : "Next assignment";
  }
  if (key === "swap") {
    drawSwap();
    document.querySelector("#swap-next").onclick = () => {
      try {
        textValue(v.left, "Left item");
        textValue(v.right, "Right item");
        swapStep = (swapStep + 1) % 4;
        drawSwap();
      } catch (error) {
        document.querySelector("#build-feedback").textContent = error.message;
      }
    };
    document.querySelector("#swap-bad").onclick = () => drawSwap(true);
  }
}
