function renderConcept(key) {
  const l = lessons[key];
  return /* HTML */ `<div class="lesson-columns">
    <section class="panel">
      <h2>${l.heading}</h2>
      <p>${richText(l.text)}</p>
      ${codeBlock(l.code)}
      ${(l.details || []).map((section) => `<h3>${escapeHTML(section.title)}</h3><p>${richText(section.text)}</p>`).join("")}
      ${(l.tips || []).map((tip) => `<details><summary>${escapeHTML(tip.title)}</summary><p>${richText(tip.text)}</p></details>`).join("")}
      <div class="callout">${richText(l.note)}</div>
      ${
        key === "structure"
          ? "<details><summary>Run this on your computer</summary><p>With a JDK installed, save the full example as Main.java. Run <code>javac Main.java</code>, then <code>java Main</code> in that folder.</p></details>"
          : ""
      }
    </section>
    <section class="panel">${experimentHTML(key)}</section>
  </div>`;
}
function experimentHTML(key) {
  if (activeUnit === 3) return renderLoopPlayground(key);
  if (lessons[key].playground) return renderConditionPlayground(key);
  if (lessons[key].cases)
    return (
      "<h2>" +
      escapeHTML(lessons[key].experimentTitle) +
      '</h2><div class="type-buttons">' +
      lessons[key].cases
        .map(
          (item, i) =>
            '<button data-case="' +
            i +
            '" aria-pressed="false">' +
            escapeHTML(item.title) +
            "</button>",
        )
        .join("") +
      '</div><div id="case-code"></div><button class="button lime" id="run-case">Show output</button>' +
      consoleBox("demo-output", "Choose an example, predict its output, then reveal it.") +
      '<p id="case-explanation"></p>'
    );

  if (key === "structure")
    return /* HTML */ `<h2>Explore the structure</h2>
      <div class="type-buttons">
        ${["class", "main", "braces", "statement"]
          .map((k) => /* HTML */ `<button data-part="${k}">${k}</button>`)
          .join("")}
      </div>
      <div id="structure-detail" role="status" class="feedback">Choose a part to see its role.</div>
      <div id="structure-code"></div>`;
  if (key === "print")
    return /* HTML */ `<h2>Where does the next word go?</h2>
      <label class="field">First message<input id="first-message" value="Hello " /></label
      ><label class="field">Second message<input id="second-message" value="Java!" /></label
      ><label class="field"
        >First print method<select id="print-method">
          <option>print</option>
          <option>println</option>
        </select></label
      ><button id="run-demo" class="button lime">▷ Run example</button>
      <div id="demo-code"></div>
      ${consoleBox("demo-output")}`;
  if (key === "variables")
    return /* HTML */ `<h2>Watch a variable change</h2>
      <div class="memory-box" id="coin-box">
        <small>int coins</small><strong id="coins-value">Not initialized</strong>
      </div>
      <label class="field"
        >Value to assign (0–999)<input id="coin-input" value="10" inputmode="numeric"
      /></label>
      <div class="action-row">
        <button id="assign-coins" class="button lime">Assign value</button
        ><button id="read-coins" class="button secondary">Read coins</button>
      </div>
      ${consoleBox("demo-output", "int coins; // Declared, not initialized")}`;
  if (key === "types")
    return /* HTML */ `<h2>Explore the eight primitives</h2>
      <div class="type-buttons">
        ${["byte", "short", "int", "long", "float", "double", "boolean", "char"]
          .map((t) => /* HTML */ `<button data-type="${t}" aria-pressed="false">${t}</button>`)
          .join("")}
      </div>
      <div id="type-example" aria-live="polite"></div>`;
  if (key === "input")
    return /* HTML */ `<h2>What can Scanner read?</h2>
      <label class="field"
        >Scanner method<select id="scanner-method">
          <option>nextLine</option>
          <option>nextInt</option>
          <option>nextDouble</option>
        </select></label
      ><label class="field">Console input<input id="scanner-input" value="Tim Zhou" /></label
      ><button id="run-demo" class="button lime">▷ Read input</button>
      <div id="demo-code"></div>
      ${consoleBox("demo-output")}`;
  if (key === "math")
    return /* HTML */ `<h2>Change the calculation</h2>
      <div class="input-grid">
        <label class="field"
          >Left operand<input id="math-left" value="7" inputmode="decimal" /></label
        ><label class="field"
          >Operator<select id="math-op">
            ${["+", "-", "*", "/", "%"]
              .map((x) => /* HTML */ `<option ${x === "/" ? "selected" : ""}>${x}</option>`)
              .join("")}
          </select></label
        ><label class="field"
          >Right operand<input id="math-right" value="2" inputmode="decimal" /></label
        ><label class="field"
          >Number type<select id="math-type">
            <option>int</option>
            <option>double</option>
          </select></label
        >
      </div>
      <button id="run-demo" class="button lime">▷ Calculate</button>
      <div id="demo-code"></div>
      ${consoleBox("demo-output")}`;
  return /* HTML */ `<h2>Text or a total?</h2>
    <label class="field">Message label<input id="string-label" value="Score: " /></label>
    <div class="input-grid">
      <label class="field">First number<input id="string-a" value="2" inputmode="numeric" /></label
      ><label class="field"
        >Second number<input id="string-b" value="3" inputmode="numeric"
      /></label>
    </div>
    <button id="run-demo" class="button lime">▷ Compare expressions</button>
    <div id="demo-code"></div>
    ${consoleBox("demo-output")}`;
}
function bindConcept(key) {
  if (activeUnit === 3) return bindLoopPlayground(key);
  if (lessons[key].playground) {
    bindConditionPlayground(key);
    return;
  }
  const get = (id) => document.getElementById(id).value;
  const result = (text, error = false) => {
    const out = document.querySelector("#demo-output");
    out.textContent = text;
    out.classList.toggle("console-error", error);
  };
  const bindRun = (fn) =>
    (document.querySelector("#run-demo").onclick = () => {
      try {
        fn();
      } catch (e) {
        result(e.message, true);
      }
    });
  // Preserve experiment values when moving between lessons, including reloads in this tab.
  const keyName = "lesson-" + key,
    draft = getDraft(keyName, {});
  document.querySelectorAll("#lesson-content input, #lesson-content select").forEach((el) => {
    if (Object.hasOwn(draft, el.id)) el.value = draft[el.id];
    el.addEventListener("input", () => {
      draft[el.id] = el.value;
      save();
    });
  });
  if (lessons[key].cases) {
    let selected =
      Number.isInteger(draft.selectedCase) && lessons[key].cases[draft.selectedCase]
        ? draft.selectedCase
        : 0;
    function choose(index) {
      selected = index;
      draft.selectedCase = index;
      save();
      document.querySelectorAll("[data-case]").forEach((button) => {
        const active = Number(button.dataset.case) === index;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      document.querySelector("#case-code").innerHTML = codeBlock(lessons[key].cases[index].code);
      result("Predict the output, then select Show output.");
      document.querySelector("#case-explanation").textContent = "";
      document.querySelector("#case-trace")?.remove();
    }
    document
      .querySelectorAll("[data-case]")
      .forEach((button) => (button.onclick = () => choose(Number(button.dataset.case))));
    document.querySelector("#run-case").onclick = () => {
      const example = lessons[key].cases[selected];
      result(example.output);
      document.querySelector("#case-explanation").innerHTML = richText(example.explanation);
      document.querySelector("#case-trace")?.remove();
      if (example.trace?.length)
        document
          .querySelector("#case-explanation")
          .insertAdjacentHTML(
            "beforebegin",
            '<ol id="case-trace" class="execution-trace">' +
              example.trace
                .map(
                  (text, index) =>
                    '<li style="animation-delay:' +
                    index * 100 +
                    'ms">' +
                    escapeHTML(text) +
                    "</li>",
                )
                .join("") +
              "</ol>",
          );
      const output = document.querySelector("#demo-output");
      output.classList.remove("console-updated");
      void output.offsetWidth;
      output.classList.add("console-updated");
    };
    choose(selected);
    return;
  }
  if (key === "structure") {
    const parts = UNIT_1_CONTENT.structureParts;
    document.querySelectorAll("[data-part]").forEach(
      (b) =>
        (b.onclick = () => {
          document.querySelector("#structure-detail").textContent =
            parts[b.dataset.part].description;
          document.querySelector("#structure-code").innerHTML = codeBlock(
            parts[b.dataset.part].code,
            "Selected structure",
          );
        }),
    );
  }
  if (key === "print")
    bindRun(() => {
      const a = get("first-message"),
        b = get("second-message"),
        method = get("print-method");
      document.querySelector("#demo-code").innerHTML = codeBlock(
        `System.out.${method}(${javaString(a)});\nSystem.out.println(${javaString(b)});`,
      );
      result(a + (method === "println" ? "\n" : "") + b + "\n");
    });
  if (key === "variables") {
    let coins = draft.coins ?? null;
    document.querySelector("#coins-value").textContent = coins ?? "Not initialized";
    document.querySelector("#assign-coins").onclick = () => {
      try {
        coins = numberValue(get("coin-input"), "Coins", { integer: true, max: 999 });
        draft.coins = coins;
        save();
        document.querySelector("#coins-value").textContent = coins;
        const box = document.querySelector("#coin-box");
        box.classList.remove("pulse");
        void box.offsetWidth;
        box.classList.add("pulse");
        result(`coins = ${coins};\n// The previous value is replaced.`);
      } catch (e) {
        result(e.message, true);
      }
    };
    document.querySelector("#read-coins").onclick = () =>
      result(
        coins === null
          ? "Initialize coins before reading it. Java rejects a read of an uninitialized local variable."
          : `System.out.println(coins);\n${coins}`,
        coins === null,
      );
  }
  if (key === "types") {
    const examples = UNIT_1_CONTENT.typeExamples;
    function choose(t) {
      document.querySelectorAll("[data-type]").forEach((b) => {
        b.classList.toggle("active", b.dataset.type === t);
        b.setAttribute("aria-pressed", String(b.dataset.type === t));
      });
      document.querySelector("#type-example").innerHTML =
        codeBlock(examples[t].code) + `<p>${examples[t].description}</p>`;
    }
    document
      .querySelectorAll("[data-type]")
      .forEach((b) => (b.onclick = () => choose(b.dataset.type)));
    choose("int");
  }
  if (key === "input")
    bindRun(() => {
      const value = get("scanner-input"),
        method = get("scanner-method");
      document.querySelector("#demo-code").innerHTML = codeBlock(
        `// Scanner input = new Scanner(System.in);\nSystem.out.println(input.${method}());`,
      );
      let parsed = value;
      if (method !== "nextLine") {
        const token = value.trim().split(/\s+/)[0];
        parsed = numberValue(token, "First input token", {
          integer: method === "nextInt",
          min: method === "nextInt" ? -2147483648 : -1e9,
          max: method === "nextInt" ? 2147483647 : 1e9,
        });
      }
      result(
        `Read: ${parsed}${method !== "nextLine" ? "\nNumeric methods leave the rest of the line waiting." : ""}`,
      );
    });
  if (key === "math")
    bindRun(() => {
      const type = get("math-type"),
        op = get("math-op"),
        a = numberValue(get("math-left"), "Left operand", {
          integer: type === "int",
          min: -10000,
          max: 10000,
        }),
        b = numberValue(get("math-right"), "Right operand", {
          integer: type === "int",
          min: -10000,
          max: 10000,
        });
      if ((op === "/" || op === "%") && b === 0)
        throw Error("Use a nonzero right operand for division or remainder.");
      const value =
        op === "+"
          ? a + b
          : op === "-"
            ? a - b
            : op === "*"
              ? a * b
              : op === "%"
                ? a % b
                : type === "int"
                  ? Math.trunc(a / b)
                  : a / b;
      document.querySelector("#demo-code").innerHTML = codeBlock(
        `${type} left = ${type === "double" && Number.isInteger(a) ? a + ".0" : a};\n${type} right = ${type === "double" && Number.isInteger(b) ? b + ".0" : b};\nSystem.out.println(left ${op} right);`,
      );
      result(String(value));
    });
  if (key === "strings")
    bindRun(() => {
      const label = get("string-label"),
        a = numberValue(get("string-a"), "First number", { integer: true, min: -999, max: 999 }),
        b = numberValue(get("string-b"), "Second number", { integer: true, min: -999, max: 999 });
      document.querySelector("#demo-code").innerHTML = codeBlock(
        `System.out.println(${javaString(label)} + ${a} + ${b});\nSystem.out.println(${javaString(label)} + (${a} + ${b}));`,
      );
      result(`Without grouping: ${label}${a}${b}\nWith parentheses: ${label}${a + b}`);
    });
}
