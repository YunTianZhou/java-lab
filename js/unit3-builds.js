function renderUnit3Build(key) {
  const b = builds[key];
  return `<div class="lesson-columns build-columns"><section class="panel">
    <h2>Instructions</h2><p>${richText(b.mission)}</p><ul class="mission-list">${b.tasks.map((t) => `<li>${richText(t)}</li>`).join("")}</ul>
    <h3>Example result</h3><pre class="sample-output">${escapeHTML(b.sampleOutput)}</pre>
    <h3>Hints</h3>${b.hints.map((h, i) => `<details><summary>Hint ${i + 1}</summary><p>${richText(h)}</p></details>`).join("")}
    <details id="solution"><summary>Reveal full solution</summary><p>Write and run your program first. This is one possible implementation.</p>${codeBlock(b.solutionCode, "Solution Main.java")}</details>
    ${b.extension ? `<details class="build-extension"><summary>${escapeHTML(b.extension.title)}</summary><p>${richText(b.extension.text)}</p><details><summary>Extension hint</summary><p>${richText(b.extension.hint)}</p>${codeBlock(b.extension.code, "Opponent selection")}</details></details>` : ""}
    </section><section class="panel playground"><h2>${key === "target" ? "Check your output" : "Playground"}</h2>
    <p>${key === "target" ? "Run your program with different odd sizes. Check the dimensions, border, crosshairs, and center against the example." : "This demonstrates the expected behavior. It does not execute or check your Java code."}</p>
    ${unit3BuildControls(key)}<div id="game-feedback" role="status"></div><div id="game-state" aria-live="polite"></div>
    ${key === "target" ? "" : consoleBox("game-output", "", false)}
    <div class="build-self-check"><label><input type="checkbox" id="build-written"> I wrote and ran my program and compared its output.</label><button class="button secondary" id="complete-build" disabled>Mark build complete</button><p id="self-check-status" role="status"></p></div>
    </section></div>`;
}
function unit3BuildControls(key) {
  if (key === "digits")
    return `<form id="digits-form"><div class="input-grid">${builds.digits.fields.map((f) => renderField(f, {})).join("")}</div><button class="button lime" type="submit">Inspect digits</button></form>`;
  if (key === "guess")
    return `<p>Think of a number from 1 to 100. Replies describe <strong>the computer’s guess</strong>.</p><form id="guess-form"><label class="field">Reply<input name="reply" placeholder="high / low / correct" autocomplete="off"></label><div class="action-row"><button class="button lime" type="submit">Send reply</button><button class="button secondary" type="button" id="guess-reset">New number</button></div></form><div class="type-buttons"><button data-reply="high">Too high</button><button data-reply="low">Too low</button><button data-reply="correct">Correct</button></div>`;
  if (key === "cheater")
    return `<form id="rps-start"><label class="field">Rounds (1–20)<input name="rounds" value="5"></label><button class="button secondary" type="submit">Start / restart match</button></form><form id="rps-turn"><div class="input-grid"><label class="field">Your move<input name="move" value="rock" autocomplete="off"></label><label class="field">Outcome mode<select name="mode"><option value="random">Random (50 / 25 / 25)</option><option value="win">Example: computer wins</option><option value="draw">Example: draw</option><option value="lose">Example: player wins</option></select></label></div><button class="button lime" type="submit">Play round</button></form>`;
  if (key === "duel")
    return `<form id="duel-turn"><div class="input-grid"><label class="field">Action<input name="action" value="+" autocomplete="off"></label><label class="field">Computer mode<select name="opponent"><option value="random">Random legal action</option><option value="smart">Smart opponent (extension)</option><option value="+">Example: charge</option><option value="-">Example: single shot</option><option value="=">Example: double shot</option><option value="|">Example: single shield</option><option value="#">Example: double shield</option></select></label></div><div class="duel-actions" role="group" aria-label="Choose your action"><button type="button" data-action="+" aria-label="Charge">+ Charge</button><button type="button" data-action="-" aria-label="Single shot">− Shoot 1</button><button type="button" data-action="=" aria-label="Double shot">= Shoot 2</button><button type="button" data-action="|" aria-label="Single shield">| Shield 1</button><button type="button" data-action="#" aria-label="Double shield"># Shield 2</button></div><div class="action-row"><button class="button lime" type="submit">Play turn</button><button class="button secondary" type="button" id="duel-quit">Quit</button></div></form><div id="duel-replay" hidden><p>Play again?</p><div class="action-row"><button class="button lime" id="duel-yes">Yes</button><button class="button secondary" id="duel-no">No</button></div></div>`;
  return "<p>Also try sizes <code>7</code> and <code>15</code>, then invalid values such as <code>6</code> or <code>abc</code>.</p>";
}
function digitReport(raw) {
  const original = numberValue(raw, "Positive integer", { integer: true, min: 1, max: 2147483647 });
  let n = original,
    count = 0,
    sum = 0,
    reverse = 0;
  while (n > 0) {
    const digit = n % 10;
    count++;
    sum += digit;
    reverse = reverse * 10 + digit;
    n = Math.trunc(n / 10);
  }
  return `Digits: ${count}\nSum: ${sum}\nReverse: ${reverse}\nPalindrome: ${reverse === original}`;
}
const duelActions = ["+", "-", "=", "|", "#"];
function legalDuelAction(action, ammo) {
  return (
    duelActions.includes(action) && !(action === "-" && ammo < 1) && !(action === "=" && ammo < 2)
  );
}
function opponentDuelActions(state, smart = false) {
  // Only public, pre-turn ammunition is considered; the player's chosen action is not an input.
  return duelActions.filter(
    (action) =>
      legalDuelAction(action, state.opponentAmmo) &&
      (!smart || !((action === "|" && state.ammo < 1) || (action === "#" && state.ammo < 2))),
  );
}
function resolveDuel(state, player, opponent) {
  if (!legalDuelAction(player, state.ammo))
    throw Error(
      duelActions.includes(player)
        ? "Not enough ammunition. The turn has not advanced."
        : "Unknown action. Use +, -, =, |, #, or quit.",
    );
  if (!legalDuelAction(opponent, state.opponentAmmo))
    throw Error(
      "The example opponent cannot afford that shot. Choose another action. The turn has not advanced.",
    );
  const next = { ...state, turn: state.turn + 1 };
  const change = (a) => (a === "+" ? 1 : a === "-" ? -1 : a === "=" ? -2 : 0);
  next.ammo += change(player);
  next.opponentAmmo += change(opponent);
  if (player !== opponent) {
    if (
      (player === "-" && opponent !== "|" && opponent !== "=") ||
      (player === "=" && opponent !== "#")
    )
      next.opponentHp--;
    if (
      (opponent === "-" && player !== "|" && player !== "=") ||
      (opponent === "=" && player !== "#")
    )
      next.hp--;
  }
  next.finished = next.hp === 0 || next.opponentHp === 0;
  return next;
}
function cheaterMove(player, slot) {
  if (!["rock", "paper", "scissors"].includes(player))
    throw Error("Enter rock, paper, or scissors. This round has not been used.");
  return slot < 2
    ? { rock: "paper", paper: "scissors", scissors: "rock" }[player]
    : slot === 2
      ? player
      : { rock: "scissors", paper: "rock", scissors: "paper" }[player];
}
function bindUnit3Build(key) {
  const feedback = document.querySelector("#game-feedback"),
    stateView = document.querySelector("#game-state"),
    out = document.querySelector("#game-output");
  const show = (text) => animateConsole(out, text);
  const safe = (fn) => {
    try {
      feedback.textContent = "";
      fn();
    } catch (e) {
      feedback.textContent = e.message;
    }
  };
  document.querySelector("#build-written").onchange = (e) =>
    (document.querySelector("#complete-build").disabled = !e.target.checked);
  document.querySelector("#complete-build").onclick = () => {
    if (!document.querySelector("#build-written").checked) return;
    markComplete(current);
    document.querySelector("#self-check-status").textContent =
      "Marked complete based on your confirmation.";
  };
  if (key === "digits") {
    const form = document.querySelector("#digits-form");
    form.onsubmit = (e) => {
      e.preventDefault();
      safe(() => show(digitReport(new FormData(form).get("number"))));
    };
    show(digitReport("1200"));
  }
  if (key === "guess") {
    const form = document.querySelector("#guess-form");
    let low, high, guess, count, ended, log;
    const paint = () => {
      stateView.innerHTML = `<div class="game-score"><strong>${ended ? "Finished" : `Guess ${count}: ${guess}`}</strong><span>${low <= high ? `Possible range: ${low}–${high}` : "No possible number remains"}</span></div>`;
      form.querySelector('button[type="submit"]').disabled = ended;
      document.querySelectorAll("[data-reply]").forEach((b) => (b.disabled = ended));
      show(log.join("\n"));
    };
    const reset = () => {
      low = 1;
      high = 100;
      guess = 50;
      count = 1;
      ended = false;
      log = ["Guess 1: 50"];
      feedback.textContent = "";
      form.elements.reply.value = "";
      paint();
    };
    const reply = (value) =>
      safe(() => {
        if (ended) return;
        if (!["high", "low", "correct"].includes(value))
          throw Error("Use high, low, or correct. The guess and range have not changed.");
        log.push("Reply: " + value);
        if (value === "correct") {
          ended = true;
          log.push(`Found in ${count} guesses`);
        } else {
          if (value === "high") high = guess - 1;
          else low = guess + 1;
          if (low > high) {
            ended = true;
            log.push("Contradictory feedback");
          } else {
            guess = low + Math.floor((high - low) / 2);
            count++;
            log.push(`Guess ${count}: ${guess}`);
          }
        }
        form.elements.reply.value = "";
        paint();
      });
    form.onsubmit = (e) => {
      e.preventDefault();
      reply(form.elements.reply.value);
    };
    document
      .querySelectorAll("[data-reply]")
      .forEach((b) => (b.onclick = () => reply(b.dataset.reply)));
    document.querySelector("#guess-reset").onclick = reset;
    reset();
  }
  if (key === "cheater") {
    const setup = document.querySelector("#rps-start"),
      form = document.querySelector("#rps-turn");
    let rounds = 5,
      round = 0,
      playerWins = 0,
      computerWins = 0,
      draws = 0,
      log = [];
    const paint = () => {
      stateView.innerHTML = `<div class="game-score"><strong>${round === rounds ? "Match complete" : `Round ${round + 1} of ${rounds}`}</strong><span>Player ${playerWins} · Computer ${computerWins} · Draws ${draws}</span></div>`;
      form.querySelector("button").disabled = round === rounds;
      show(log.join("\n"));
    };
    setup.onsubmit = (e) => {
      e.preventDefault();
      safe(() => {
        const n = loopInteger(setup.elements.rounds.value, "Rounds", 1, 20);
        rounds = n;
        round = playerWins = computerWins = draws = 0;
        log = [];
        paint();
      });
    };
    form.onsubmit = (e) => {
      e.preventDefault();
      safe(() => {
        if (round === rounds) return;
        const player = form.elements.move.value,
          mode = form.elements.mode.value;
        // Validate before drawing a random outcome or updating the counters.
        cheaterMove(player, 2);
        const slot =
            mode === "random"
              ? Math.floor(Math.random() * 4)
              : mode === "win"
                ? 0
                : mode === "draw"
                  ? 2
                  : 3,
          computer = cheaterMove(player, slot);
        round++;
        let result;
        if (slot < 2) {
          computerWins++;
          result = "Computer wins";
        } else if (slot === 2) {
          draws++;
          result = "Draw";
        } else {
          playerWins++;
          result = "Player wins";
        }
        log.push(
          `${mode === "random" ? "" : "[Example mode] "}Round ${round}: ${player} / ${computer}`,
          result,
          `Player ${playerWins} | Computer ${computerWins} | Draws ${draws}`,
        );
        paint();
      });
    };
    paint();
  }
  if (key === "duel") {
    const form = document.querySelector("#duel-turn"),
      replay = document.querySelector("#duel-replay");
    let state, log;
    const paint = () => {
      stateView.innerHTML = `<div class="duel-score">${[
        ["You", state.hp, state.ammo],
        ["Computer", state.opponentHp, state.opponentAmmo],
      ]
        .map(
          ([name, hp, ammo]) =>
            `<div><strong>${name}</strong><span class="hp" aria-label="${hp} health">${"●".repeat(hp)}${"○".repeat(3 - hp)}</span><span>HP ${hp} · Ammo ${ammo}</span></div>`,
        )
        .join("")}</div><p>Valid turns: ${state.turn}</p>`;
      document
        .querySelectorAll("[data-action], #duel-turn button")
        .forEach((b) => (b.disabled = state.finished));
      replay.hidden = !state.finished;
      show(log.slice(-120).join("\n"));
    };
    const reset = () => {
      state = { hp: 3, opponentHp: 3, ammo: 0, opponentAmmo: 0, turn: 0, finished: false };
      log = ["HP 3:3 | Ammo 0:0"];
      feedback.textContent = "";
      paint();
    };
    const play = (action) =>
      safe(() => {
        if (state.finished) return;
        if (action === "quit") {
          state.finished = true;
          log.push("Duel ended");
          paint();
          return;
        }
        if (!legalDuelAction(action, state.ammo))
          throw Error(
            duelActions.includes(action)
              ? "Not enough ammunition. The turn has not advanced."
              : "Unknown action. Use +, -, =, |, #, or quit.",
          );
        const mode = form.elements.opponent.value,
          legal = opponentDuelActions(state, mode === "smart");
        const opponent =
          mode === "random" || mode === "smart"
            ? legal[Math.floor(Math.random() * legal.length)]
            : mode;
        state = resolveDuel(state, action, opponent);
        log.push(
          `${mode === "smart" ? "[Smart opponent] " : mode === "random" ? "" : "[Example mode] "}Turn ${state.turn}: ${action} / ${opponent}`,
          `HP ${state.hp}:${state.opponentHp} | Ammo ${state.ammo}:${state.opponentAmmo}`,
        );
        if (state.hp === 0) log.push("Computer wins");
        else if (state.opponentHp === 0) log.push("You win");
        paint();
      });
    form.onsubmit = (e) => {
      e.preventDefault();
      play(form.elements.action.value);
    };
    document.querySelectorAll("[data-action]").forEach(
      (b) =>
        (b.onclick = () => {
          form.elements.action.value = b.dataset.action;
          play(b.dataset.action);
        }),
    );
    document.querySelector("#duel-quit").onclick = () => play("quit");
    document.querySelector("#duel-yes").onclick = reset;
    document.querySelector("#duel-no").onclick = () => {
      replay.hidden = true;
      feedback.textContent = "Duel closed. Refresh this page to play again.";
    };
    reset();
  }
}
