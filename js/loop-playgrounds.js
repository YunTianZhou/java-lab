// Unit 3 lesson simulations. Text and field definitions live in content/unit-3/lessons.js.
function renderLoopPlayground(key) {
  const lab = lessons[key].lab;
  return `<div class="loop-lab${key === "nested" ? " nested-lab" : ""}"><h2>${escapeHTML(lab.title)}</h2>
    <form id="loop-form"><div class="input-grid">${lab.fields
      .filter((f) => !f.optional)
      .map((f) => renderField(f, {}))
      .join("")}</div>
    ${
      lab.fields.some((f) => f.optional)
        ? `<details><summary>Optional: reproduce a sequence</summary>${lab.fields
            .filter((f) => f.optional)
            .map((f) => renderField(f, {}))
            .join("")}</details>`
        : ""
    }
    <div class="action-row"><button class="button lime" type="submit">${key === "random" ? "Sample" : "Run example"}</button><button class="button secondary" type="button" id="loop-next">Next step</button><button class="button secondary" type="button" id="loop-reset">Reset trace</button></div></form>
    <div id="loop-feedback" role="status"></div>${key === "doWhile" ? '<div id="loop-comparison" class="loop-comparison" aria-live="polite"></div>' : ""}${key === "nested" ? '<details class="loop-source"><summary>View generated Java</summary><div id="loop-code"></div></details>' : '<div id="loop-code"></div>'}
    <div id="loop-state" class="loop-state" aria-live="polite"></div>
    <div class="loop-results"><div id="loop-visual"></div>${consoleBox("loop-output", "", false)}</div></div>`;
}
function loopInteger(v, label, min = -100, max = 100) {
  return numberValue(v, label, { integer: true, min, max });
}
// java.util.Random's 48-bit algorithm, including nextInt rejection sampling.
function javaRandom(seed) {
  let state = (BigInt(seed) ^ 0x5deece66dn) & ((1n << 48n) - 1n);
  const bits = (n) => {
    state = (state * 0x5deece66dn + 11n) & ((1n << 48n) - 1n);
    return Number(state >> BigInt(48 - n));
  };
  return (bound) => {
    if ((bound & -bound) === bound) return Number((BigInt(bound) * BigInt(bits(31))) >> 31n);
    let value, part;
    do {
      part = bits(31);
      value = part % bound;
    } while (part - value + bound - 1 >= 2147483648);
    return value;
  };
}
function loopSimulation(key, v) {
  const frames = [],
    output = [];
  let source = "";
  const add = (state, visual = "") => frames.push({ state, visual, output: output.join("\n") });
  if (["while", "doWhile", "for"].includes(key)) {
    let n = loopInteger(v.start, "Start", 0, 10),
      limit = loopInteger(v.limit, "Limit", 0, 10),
      change = loopInteger(v.change, "Update amount", -3, 3),
      total = 0;
    const kind = key === "doWhile" ? v.kind : key,
      comparison = key === "for" ? v.comparison : "<=";
    const condition = () => (comparison === ">=" ? n >= limit : n <= limit);
    if (kind === "for" && (change === 0 || (condition() && (comparison === ">=" ? change > 0 : change < 0)))) {
      throw Error("Choose a nonzero update that moves toward the limit: positive for <=, negative for >=.");
    }
    const update = `n += ${change};`;
    source =
      kind === "for"
        ? `int total = 0;\n\nfor (int n = ${n}; n ${comparison} ${limit}; n += ${change}) {\n  total += n;\n}\n\nSystem.out.println(total);`
        : `int n = ${n};\n\n${kind === "do-while" ? "do {" : `while (n <= ${limit}) {`}\n  System.out.println(n);\n  ${update}\n}${kind === "do-while" ? ` while (n <= ${limit});` : ""}\n\nSystem.out.println("Final: " + n);`;
    add(`Initialize n = ${n}${kind === "for" ? "; total = 0" : ""}`);
    let count = 0;
    while ((kind === "do-while" && count === 0) || condition()) {
      if (count >= 12) {
        add(
          "Preview paused after 12 passes. This is a preview limit, not a Java loop exit. Inspect the update and condition.",
        );
        return { source, frames };
      }
      if (!(kind === "do-while" && count === 0)) add(`Check ${n} ${comparison} ${limit} → true`);
      if (kind === "for") {
        total += n;
        add(`Add ${n}: total = ${total}`);
      } else {
        output.push(String(n));
        add(`Print n = ${n}`);
      }
      n += change;
      count++;
      add(`Update n = ${n}`);
      if (kind !== "for" && change <= 0 && condition()) {
        add("This loop will not terminate: the update cannot make the condition false. Preview stopped after one pass.");
        return { source, frames };
      }
    }
    add(`Check ${n} ${comparison} ${limit} → false; exit loop`);
    output.push(kind === "for" ? String(total) : `Final: ${n}`);
    add("Execute the statement after the loop");
  } else if (key === "control") {
    const skip = loopInteger(v.skip, "Skip value", 0, 6),
      stop = loopInteger(v.stop, "Stop value", 0, 6),
      before = v.update === "before checks";
    source = `int n = 0;\n\nwhile (n < 6) {\n${before ? "  n++;\n" : ""}  if (n == ${skip}) continue;\n  if (n == ${stop}) break;\n  System.out.println(n);\n${before ? "" : "  n++;\n"}}\n\nSystem.out.println("Stopped at " + n);`;
    let n = 0;
    add("Initialize n = 0");
    while (n < 6) {
      add(`${n} < 6 → true`);
      if (before) {
        n++;
        add(`Update n = ${n}`);
      }
      if (n === skip) {
        add(`n = ${n}: continue skips the rest of the body`);
        if (!before) {
          add("The update is skipped every time. n never changes; this loop does not terminate.");
          return { source, frames };
        }
        continue;
      }
      if (n === stop) {
        add(`n = ${n}: break exits the loop`);
        break;
      }
      output.push(String(n));
      add(`Print ${n}`);
      if (!before) {
        n++;
        add(`Update n = ${n}`);
      }
    }
    output.push(`Stopped at ${n}`);
    add("Execute the statement after the loop");
  } else if (key === "validation") {
    const tokens = String(v.tokens).trim().split(/\s+/).filter(Boolean);
    if (tokens.length > 8) throw Error("Use at most 8 input tokens for this preview.");
    source = lessons[key].code.replace(
      "    input.next();",
      v.consume === "yes" ? "    input.next();" : "    // No token consumed",
    );
    const visual = (i) =>
      `<div class="token-stream">${tokens.map((t, j) => `<code class="${j < i ? "consumed" : j === i ? "active" : ""}">${escapeHTML(t)}</code>`).join("")}</div>`;
    add("Scanner is before the first token", visual(0));
    let accepted = false;
    for (let i = 0; i < tokens.length; i++) {
      output.push("Level (1–10):");
      const t = tokens[i],
        isInt = /^[+-]?\d+$/.test(t) && Number(t) >= -2147483648 && Number(t) <= 2147483647;
      add(`hasNextInt() → ${isInt}; no input consumed`, visual(i));
      if (!isInt) {
        if (v.consume === "no") {
          output.push("Enter an integer");
          add("The same invalid token is checked forever. Consume it before retrying.", visual(i));
          return { source, frames };
        }
        output.push("Enter an integer");
        add(`next() consumes ${t}; continue retries`, visual(i + 1));
        continue;
      }
      add(`nextInt() consumes ${t}`, visual(i + 1));
      if (Number(t) >= 1 && Number(t) <= 10) {
        add(`Accepted level = ${Number(t)}; break exits validation`, visual(i + 1));
        accepted = true;
        break;
      }
      output.push("Choose 1–10");
      add("Integer is out of range; retry", visual(i + 1));
    }
    if (!accepted) {
      output.push("Level (1–10):");
      add("Waiting for another token in an interactive terminal", visual(tokens.length));
    }
  } else if (key === "lines") {
    const input = String(v.input).replace(/\\n/g, "\n");
    let cursor = 0;
    const visual = () =>
      `<pre class="scanner-stream" aria-label="Input cursor after ${cursor} characters"><span class="consumed">${escapeHTML(input.slice(0, cursor).replace(/\n/g, "↵\n"))}</span><span class="scanner-cursor" aria-hidden="true"></span>${escapeHTML(input.slice(cursor).replace(/\n/g, "↵\n"))}</pre>`;
    source = `${v.method === "nextInt" ? "int age" : "String token"} = input.${v.method}();\n${v.discard === "yes" ? "input.nextLine(); // Discard current remainder\n" : ""}\nString name = input.nextLine();\nSystem.out.println(name);`;
    add("Input cursor starts here", visual());
    const m = input.match(/^\s*(\S+)/);
    if (!m) {
      add("Waiting for a token", visual());
      return { source, frames };
    }
    if (
      v.method === "nextInt" &&
      (!/^[+-]?\d+$/.test(m[1]) || Number(m[1]) < -2147483648 || Number(m[1]) > 2147483647)
    ) {
      add(
        "nextInt() would throw InputMismatchException. The invalid token remains unread.",
        visual(),
      );
      return { source, frames };
    }
    cursor = m[0].length;
    add(`${v.method}() returns ${m[1]}; line ending remains`, visual());
    const line = () => {
      if (cursor >= input.length) return null;
      let end = input.indexOf("\n", cursor);
      if (end < 0) end = input.length;
      const result = input.slice(cursor, end);
      cursor = end < input.length ? end + 1 : end;
      return result;
    };
    if (v.discard === "yes") {
      const discarded = line();
      if (discarded === null) {
        add("Waiting for the current line to finish", visual());
        return { source, frames };
      }
      add(`Discarded remainder: ${JSON.stringify(discarded)}`, visual());
    }
    const name = line();
    if (name === null) add("Waiting for the next line", visual());
    else {
      output.push(name);
      add(`name = ${JSON.stringify(name)}`, visual());
    }
  } else if (key === "random") {
    const bound = loopInteger(v.bound, "Bound", 1, 8),
      offset = loopInteger(v.offset, "Offset", -10, 10),
      samples = loopInteger(v.samples, "Samples", 1, 100);
    const seeded = String(v.seed || "").trim() !== "";
    const seed = !seeded
      ? Math.floor(Math.random() * 2147483647)
      : loopInteger(v.seed, "Seed", -2147483648, 2147483647);
    const next = javaRandom(seed),
      counts = Array(bound).fill(0),
      values = [];
    source = `Random random = new Random(${seeded ? seed : ""});\n\nfor (int i = 0; i < ${samples}; i++) {\n  int value = random.nextInt(${bound}) + (${offset});\n  System.out.println(value);\n}`;
    add(
      `${seeded ? `Repeatable seed ${seed}; ` : "New random sample; "}possible values ${offset} to ${offset + bound - 1}`,
    );
    for (let i = 0; i < samples; i++) {
      const slot = next(bound);
      counts[slot]++;
      values.push(slot + offset);
      output.push(String(slot + offset));
      add(
        `Sample ${i + 1}/${samples}: ${slot + offset}${seeded ? `. Reusing seed ${seed} repeats this sequence.` : ""}`,
        `<div class="frequency-chart">${counts.map((c, j) => `<div><code>${j + offset}</code><progress value="${c}" max="${i + 1}"></progress><span>${c} (${Math.round((c / (i + 1)) * 100)}%)</span></div>`).join("")}</div>`,
      );
    }
  } else if (key === "nested") {
    const rows = loopInteger(v.rows, "Rows", 1, 4),
      cols = loopInteger(v.cols, "Columns", 1, 4),
      triangle = v.shape === "triangle";
    let printed = "";
    source = `for (int row = 1; row <= ${rows}; row++) {\n  for (int col = 1; col <= ${triangle ? "row" : cols}; col++) {\n${v.action !== "none" ? `    if (col == 2) ${v.action};\n` : ""}    System.out.print("*");\n  }\n  System.out.println();\n}`;
    const visited = new Set();
    const grid = (r, c) =>
      `<div class="loop-grid" style="--columns:${triangle ? rows : cols}">${Array.from({ length: rows }, (_, a) => Array.from({ length: triangle ? rows : cols }, (_, b) => `<span class="${triangle && b > a ? "absent" : a + 1 === r && b + 1 === c ? "active" : visited.has(`${a + 1},${b + 1}`) ? "visited" : ""}">${a + 1},${b + 1}</span>`).join("")).join("")}</div>`;
    add("Initialize the outer loop", grid(0, 0));
    for (let r = 1; r <= rows; r++) {
      add(`row = ${r}; initialize col = 1`, grid(r, 1));
      for (let c = 1; c <= (triangle ? r : cols); c++) {
        add(`row = ${r}, col = ${c}: enter inner body`, grid(r, c));
        if (c === 2 && v.action !== "none") {
          add(`${v.action} affects the inner loop only`, grid(r, c));
          if (v.action === "break") break;
          continue;
        }
        visited.add(`${r},${c}`);
        printed += "*";
        output.splice(0, output.length, printed);
        add("Print a star without a newline", grid(r, c));
      }
      printed += "\n";
      output.splice(0, output.length, printed);
      add(`End row ${r}: println moves to a new line`, grid(r, 0));
    }
    add("Both loops have finished", grid(0, 0));
  }
  return { source, frames };
}
function animateConsole(element, text) {
  element.textContent = text;
  element.classList.remove("console-updated");
  void element.offsetWidth;
  element.classList.add("console-updated");
}
function bindLoopPlayground(key) {
  const form = document.querySelector("#loop-form");
  let simulation,
    index = 0;
  const paint = () => {
    const frame = simulation.frames[index];
    document.querySelector("#loop-state").textContent =
      `${index + 1} / ${simulation.frames.length} · ${frame.state}`;
    document.querySelector("#loop-visual").innerHTML = frame.visual;
    animateConsole(document.querySelector("#loop-output"), frame.output);
    document.querySelector("#loop-next").disabled = index === simulation.frames.length - 1;
  };
  const prepare = () => {
    try {
      const values = Object.fromEntries(new FormData(form));
      simulation = loopSimulation(key, values);
      if (key === "doWhile") {
        document.querySelector("#loop-comparison").innerHTML = ["while", "do-while"]
          .map((kind) => {
            const trace = loopSimulation(key, { ...values, kind });
            const count = trace.frames.filter((frame) =>
              frame.state.startsWith("Print n ="),
            ).length;
            const limited = trace.frames.at(-1).state.startsWith("Preview paused");
            return `<div><code>${kind}</code><strong>${limited ? "At least " : ""}${count} body ${count === 1 ? "execution" : "executions"}</strong></div>`;
          })
          .join("");
      }
      index = 0;
      document.querySelector("#loop-code").innerHTML = codeBlock(simulation.source);
      document.querySelector("#loop-feedback").textContent = "";
      paint();
      return true;
    } catch (e) {
      document.querySelector("#loop-feedback").textContent = e.message;
      document.querySelector("#loop-next").disabled = true;
      return false;
    }
  };
  form.oninput = prepare;
  form.onsubmit = (e) => {
    e.preventDefault();
    if (prepare()) {
      index = simulation.frames.length - 1;
      paint();
    }
  };
  document.querySelector("#loop-next").onclick = () => {
    index = Math.min(index + 1, simulation.frames.length - 1);
    paint();
  };
  document.querySelector("#loop-reset").onclick = prepare;
  prepare();
}
