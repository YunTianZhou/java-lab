function markComplete(i) {
  completed.add(i);
  save();
  document.querySelector("#next-step").disabled = false;
  document.querySelector("#completion-count").textContent =
    `${completed.size} of ${steps.length} completed`;
  const bar = document.querySelector(".progress-track");
  bar.setAttribute("aria-valuenow", completed.size);
  bar.firstElementChild.style.width = (completed.size / steps.length) * 100 + "%";
  const link = document.querySelector(`.subnav a[href="${lessonHref(i)}"]`);
  if (link) {
    link.classList.add("done");
    link.firstElementChild.textContent = "✓";
  }
}
