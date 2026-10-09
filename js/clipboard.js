// Delegate copying so newly generated examples and revealed solutions work too.
document.addEventListener("click", async (e) => {
  const button = e.target.closest(".copy-code");
  if (!button) return;
  const panel = button.closest(".code-panel"),
    code = panel.querySelector("code") || panel.querySelector("textarea"),
    status = panel.querySelector(".copy-status");
  try {
    if (!navigator.clipboard?.writeText) throw Error("Clipboard unavailable");
    await navigator.clipboard.writeText(
      code instanceof HTMLTextAreaElement ? code.value : code.textContent,
    );
    button.textContent = "Copied!";
    status.textContent = "Code copied.";
    setTimeout(() => {
      if (button.isConnected) button.textContent = "Copy code";
    }, 1800);
  } catch {
    if (code instanceof HTMLTextAreaElement) {
      code.focus();
      code.select();
    } else {
      const selection = window.getSelection(),
        range = document.createRange();
      range.selectNodeContents(code);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    status.textContent =
      "Could not access the clipboard. Code selected: press Ctrl+C or Command+C to copy.";
  }
});
