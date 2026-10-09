const escapeHTML = (text) =>
  String(text).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
function highlight(code) {
  return String(code)
    .split(
      /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\/[^\n]*|\b(?:public|class|static|void|int|double|float|long|short|byte|boolean|char|new|true|false|import|if|else|switch|case|default|yield|return|break|while|do|for|continue)\b|\b\d+(?:\.\d+)?[fFL]?\b)/g,
    )
    .map((t) => {
      const e = escapeHTML(t);
      return /^['"]/.test(t)
        ? `<span class="str">${e}</span>`
        : /^\/\//.test(t)
          ? `<span class="comment">${e}</span>`
          : /^(public|class|static|void|int|double|float|long|short|byte|boolean|char|new|true|false|import|if|else|switch|case|default|yield|return|break|while|do|for|continue)$/.test(
                t,
              )
            ? `<span class="kw">${e}</span>`
            : /^\d/.test(t)
              ? `<span class="num">${e}</span>`
              : e;
    })
    .join("");
}
const codeBlock = (code, file = "Main.java") => /* HTML */ `<div class="code-panel">
    <div class="window-bar">
      <i></i><i></i><i></i><span>${escapeHTML(file)}</span
      ><button class="copy-code" type="button" aria-label="Copy code from ${escapeHTML(file)}">
        Copy code
      </button>
    </div>
    <pre tabindex="0"><code>${highlight(code)}</code></pre>
    <span class="copy-status" role="status"></span>
  </div>`;
// Keep output adjacent to its tags: pre-wrap displays template indentation verbatim.
function consoleBox(id, text = "Run the example to see its output.", showLabel = true) {
  const label = showLabel ? '<span class="console-label">CONSOLE</span>' : "";
  return (
    '<div class="console" id="' +
    escapeHTML(id) +
    '" role="status">' +
    label +
    escapeHTML(text) +
    "</div>"
  );
}
function renderField(f, v) {
  return /* HTML */ `<label class="field ${f.code ? "code-field" : ""}"
    >${escapeHTML(f.label)}${
      f.options
        ? `<select name="${f.id}">${f.options.map((o) => /* HTML */ `<option value="${escapeHTML(o)}" ${v[f.id] === o ? "selected" : ""}>${escapeHTML(o)}</option>`).join("")}</select>`
        : `<input name="${f.id}" value="${escapeHTML(v[f.id] ?? f.value)}" ${f.placeholder ? `placeholder="${escapeHTML(f.placeholder)}"` : ""} maxlength="${f.code ? 80 : 60}" autocomplete="off" spellcheck="false">`
    }</label
  >`;
}

function richText(text) {
  return escapeHTML(text).replace(/&lt;(\/?)(code|strong|em)&gt;/g, "<$1$2>");
}
