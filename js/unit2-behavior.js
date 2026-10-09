// Unit 2 simulations model the expected output; they do not execute Java.
const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function boardCells(values) {
  return ["row1", "row2", "row3"].flatMap((key, index) => {
    const text = String(values[key]).trim();
    if (!/^[01]{1,3}$/.test(text))
      throw Error("Row " + (index + 1) + " needs one to three binary digits, such as 010.");
    return text.padStart(3, "0").split("").map(Number);
  });
}
function boardWins(cells) {
  return winningLines.filter((line) => line.every((index) => cells[index] === cells[line[0]]));
}
const unit2BuildBehavior = {
  board: {
    run: (values) => {
      const cells = boardCells(values),
        wins = boardWins(cells);
      if (new Set(wins.map((line) => cells[line[0]])).size > 1)
        throw Error("Use a board with at most one winning side.");
      return wins.length ? (cells[wins[0][0]] ? "X wins" : "O wins") : "Tie";
    },
  },
  rps: {
    run: (values) => {
      const a = String(values.p1).trim(),
        b = String(values.p2).trim(),
        allowed = ["rock", "paper", "scissors"];
      if (!allowed.includes(a) || !allowed.includes(b)) return "Invalid choice";
      if (a === b) return "Draw";
      return (a === "rock" && b === "scissors") ||
        (a === "paper" && b === "rock") ||
        (a === "scissors" && b === "paper")
        ? "Player 1 wins"
        : "Player 2 wins";
    },
  },
  twentyFour: {
    run: (values) => {
      let a, b;
      try {
        a = numberValue(values.a, "First integer", { integer: true, min: -1000, max: 1000 });
        b = numberValue(values.b, "Second integer", { integer: true, min: -1000, max: 1000 });
      } catch {
        return "Invalid input";
      }
      const matches = [];
      const add = (left, op, right, result) => {
        if (result === 24) matches.push(left + " " + op + " " + right + " = 24");
      };
      add(a, "+", b, a + b);
      add(a, "*", b, a * b);
      add(a, "-", b, a - b);
      if (a !== b) add(b, "-", a, b - a);
      if (b !== 0 && a % b === 0) add(a, "/", b, a / b);
      if (a !== b && a !== 0 && b % a === 0) add(b, "/", a, b / a);
      if (b !== 0) add(a, "%", b, a % b);
      if (a !== b && a !== 0) add(b, "%", a, b % a);
      return matches.join("\n") || "No match";
    },
  },
  tickets: {
    run: (values) => {
      let category, age, quantity, weekend;
      try {
        category = numberValue(values.category, "Category", { integer: true, min: 1, max: 3 });
        age = numberValue(values.age, "Age", { integer: true, min: 0, max: 120 });
        quantity = numberValue(values.quantity, "Quantity", { integer: true, min: 1, max: 10 });
        weekend = numberValue(values.weekend, "Weekend", { integer: true, min: 0, max: 1 });
      } catch {
        return "Invalid booking";
      }
      const base = [0, 10, 15, 20][category],
        name = ["", "Standard", "Premium", "IMAX"][category];
      const discount = age < 12 ? 3 : age >= 65 ? 2 : 0,
        surcharge = weekend === 1 ? 2 : 0,
        price = base - discount + surcharge;
      return [
        "=== TICKET RECEIPT ===",
        "Category: " + name,
        "Age: " + age,
        "Quantity: " + quantity,
        "Base per ticket: $" + base,
        "Discount per ticket: $" + discount,
        "Weekend surcharge: $" + surcharge,
        "Price per ticket: $" + price,
        "Total: $" + price * quantity,
      ].join("\n");
    },
  },
};
function drawBoard(values, highlight = false) {
  const grid = document.querySelector("#board-grid");
  if (!grid) return;
  let cells;
  try {
    cells = boardCells(values);
  } catch {
    grid.innerHTML = "<p>Enter valid binary rows to display the board.</p>";
    return;
  }
  const wins = boardWins(cells);
  const valid = new Set(wins.map((line) => cells[line[0]])).size <= 1;
  const marked = new Set(highlight && valid ? wins.flat() : []);
  grid.innerHTML = cells
    .map(
      (cell, index) =>
        '<button type="button" data-cell="' +
        index +
        '" class="board-cell ' +
        (marked.has(index) ? "winning" : "") +
        '" aria-label="Row ' +
        (Math.floor(index / 3) + 1) +
        ", column " +
        ((index % 3) + 1) +
        ": " +
        (cell ? "X" : "O") +
        '; click to toggle">' +
        (cell ? "X" : "O") +
        "</button>",
    )
    .join("");
}
function bindBoard(values, form) {
  drawBoard(values, true);
  document.querySelector("#board-grid").onclick = (event) => {
    const button = event.target.closest("[data-cell]");
    if (!button) return;
    const cells = boardCells(values),
      index = Number(button.dataset.cell);
    cells[index] = 1 - cells[index];
    for (let row = 0; row < 3; row++)
      form.elements["row" + (row + 1)].value = cells.slice(row * 3, row * 3 + 3).join("");
    form.dispatchEvent(new Event("input", { bubbles: true }));
    form.requestSubmit();
  };
}
