if (document.modelContext?.registerTool) {
  try {
    Promise.resolve(
      document.modelContext.registerTool({
        name: "navigate_java_lesson",
        description: "Open a lesson, quiz, or build in Unit 1, Unit 2, or Unit 3 without completing it.",
        inputSchema: {
          type: "object",
          properties: {
            unit: { type: "integer", enum: [1, 2, 3] },
            step: {
              type: "integer",
              minimum: 1,
              maximum: Math.max(...Object.values(courseContent).map(content => content.steps.length)),
            },
          },
          required: ["step"],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute: ({ step, unit = 1 }) => {
          if (!courseContent[unit]) throw Error("Choose Unit 1, Unit 2, or Unit 3.");
          const content = courseContent[unit];
          if (!Number.isInteger(step) || step < 1 || step > content.steps.length)
            throw Error(`Choose a step from 1 to ${content.steps.length}.`);
          history.replaceState(null, "", lessonHref(step - 1, unit));
          render();
          return { unit, step, title: steps[step - 1].title };
        },
      }),
    ).catch(() => {});
  } catch {}
}
window.addEventListener("hashchange", render);
render();
