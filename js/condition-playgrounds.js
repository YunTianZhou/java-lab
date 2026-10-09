// Editable controls follow the Unit 1 input -> code -> console pattern.
function renderConditionPlayground(key) {
  const config = lessons[key].playground;
  const draft = getDraft(
    "playground-" + key,
    Object.fromEntries(config.fields.map((field) => [field.id, field.value])),
  );
  return (
    "<h2>" +
    escapeHTML(config.title) +
    '</h2><form id="condition-form" novalidate><div class="input-grid">' +
    config.fields.map((field) => renderField(field, draft)).join("") +
    '</div><button type="submit" class="button lime">' +
    escapeHTML(config.button) +
    '</button></form><div id="condition-code"></div>' +
    consoleBox("demo-output", "", false) +
    '<ol id="condition-trace" class="execution-trace"></ol>'
  );
}
function conditionExample(type, values) {
  if (type === "comparison") {
    const text = values.mode === "Text",
      op = values.operator;
    const valid = text ? ["==", "!="] : ["==", "!=", "<", "<=", ">", ">="];
    if (!valid.includes(op)) throw Error("Choose a supported comparison.");
    const a = text
      ? String(values.left)
      : numberValue(values.left, "Left value", { min: -1000000, max: 1000000 });
    const b = text
      ? String(values.right)
      : numberValue(values.right, "Right value", { min: -1000000, max: 1000000 });
    const result =
      op === "=="
        ? a === b
        : op === "!="
          ? a !== b
          : op === "<"
            ? a < b
            : op === "<="
              ? a <= b
              : op === ">"
                ? a > b
                : a >= b;
    const literal = (value) =>
      text ? javaString(value) : Number.isInteger(value) ? value + ".0" : String(value);
    const expression = text
      ? (op === "!=" ? "!" : "") + "left.equals(right)"
      : "left " + op + " right";
    return {
      code:
        (text ? "String" : "double") +
        " left = " +
        literal(a) +
        ";\n" +
        (text ? "String" : "double") +
        " right = " +
        literal(b) +
        ";\nboolean result = " +
        expression +
        ";\nSystem.out.println(result);",
      output: String(result),
      trace: [],
    };
  }
  if (type === "logic") {
    const a = values.left === "true",
      b = values.right === "true",
      op = values.operator;
    const result = op === "A && B" ? a && b : op === "A || B" ? a || b : op === "!A" ? !a : !b;
    return {
      code: "boolean A = " + a + ";\nboolean B = " + b + ";\nSystem.out.println(" + op + ");",
      output: String(result),
      trace: [],
    };
  }
  const signedIn = values.signedIn === "true",
    editor = values.editor === "true";
  return {
    code:
      "boolean signedIn = " +
      signedIn +
      ";\nboolean editor = " +
      editor +
      ';\nif (signedIn) {\n  if (editor) {\n    System.out.println("Edit");\n  } else {\n    System.out.println("View");\n  }\n} else {\n  System.out.println("Sign in");\n}',
    output: signedIn ? (editor ? "Edit" : "View") : "Sign in",
    trace: signedIn
      ? ["signedIn: true", "editor: " + editor, editor ? "Inner if → Edit" : "Inner else → View"]
      : ["signedIn: false", "Inner editor check skipped", "Outer else → Sign in"],
  };
}
function bindConditionPlayground(key) {
  const config = lessons[key].playground,
    form = document.querySelector("#condition-form");
  const draft = getDraft("playground-" + key, {});
  function adjustControls() {
    if (config.type === "comparison") {
      const text = form.elements.mode.value === "Text",
        op = form.elements.operator;
      for (const option of op.options) {
        option.disabled = text && !["==", "!="].includes(option.value);
        option.textContent = text
          ? option.value === "=="
            ? "equals()"
            : option.value === "!="
              ? "not equals()"
              : option.value
          : option.value;
      }
      if (op.selectedOptions[0].disabled) op.value = "==";
    }
    if (config.type === "logic") {
      form.elements.left.disabled = form.elements.operator.value === "!B";
      form.elements.right.disabled = form.elements.operator.value === "!A";
    }
  }
  function update(animate = true) {
    adjustControls();
    for (const field of config.fields) draft[field.id] = form.elements[field.id].value;
    save();
    const output = document.querySelector("#demo-output"),
      code = document.querySelector("#condition-code"),
      trace = document.querySelector("#condition-trace");
    try {
      const example = conditionExample(config.type, draft);
      code.innerHTML = codeBlock(example.code);
      output.textContent = example.output;
      output.classList.remove("console-error");
      trace.innerHTML = example.trace
        .map(
          (line, index) =>
            '<li style="animation-delay:' + index * 100 + 'ms">' + escapeHTML(line) + "</li>",
        )
        .join("");
    } catch (error) {
      code.innerHTML = "";
      output.textContent = error.message;
      output.classList.add("console-error");
      trace.innerHTML = "";
    }
    output.classList.remove("console-updated");
    if (animate) {
      void output.offsetWidth;
      output.classList.add("console-updated");
    }
  }
  form.oninput = () => update();
  form.onsubmit = (event) => {
    event.preventDefault();
    update();
  };
  update(false);
}
