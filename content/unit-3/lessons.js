// Editable course content.
const UNIT_3_LESSONS = {
  while: {
    heading: "A condition controls repetition",
    text: "A loop repeats a block of instructions without writing that block multiple times. A <code>while</code> loop repeats as long as its <strong>boolean condition is true</strong>, checking <strong>before every pass</strong>. If it starts false, the body runs zero times. An update should eventually make the condition false.",
    code: `int n = 1;

while (n <= 4) {
  System.out.println(n);
  n++;
}

System.out.println("Final: " + n);`,
    note: "Changing a variable is not enough by itself: the change must move the condition toward false.",
    details: [],
    lab: {
      title: "Step through a while loop",
      fields: [
        {
          id: "start",
          label: "Start (0–10)",
          value: "1",
        },
        {
          id: "limit",
          label: "Limit (0–10)",
          value: "4",
        },
        {
          id: "change",
          label: "Update amount (−3–3)",
          value: "1",
        },
      ],
    },
  },
  doWhile: {
    heading: "Body first, condition second",
    text: "A <code>do-while</code> loop executes its body <strong>at least once</strong>, then checks whether to repeat. This fits an action that must happen before a decision, such as asking whether to play again.",
    code: `int n = 5;

do {
  System.out.println(n);
  n++;
} while (n <= 4);`,
    note: "The semicolon after <code>while (...);</code> is required. A while loop with the same initial values would print nothing.",
    details: [],
    lab: {
      title: "Compare before and after",
      fields: [
        {
          id: "kind",
          label: "Loop",
          value: "do-while",
          options: ["do-while", "while"],
        },
        {
          id: "start",
          label: "Start (0–10)",
          value: "5",
        },
        {
          id: "limit",
          label: "Limit (0–10)",
          value: "4",
        },
        {
          id: "change",
          label: "Update amount (−3–3)",
          value: "1",
        },
      ],
    },
  },
  control: {
    heading: "Exit a loop or skip one pass",
    text: "Loop control lets a program end repetition early or skip work for one pass. <code>break</code> exits the nearest loop immediately. <code>continue</code> skips the remaining body and moves to the next condition check in a <code>while</code> loop.",
    code: `int n = 0;

while (n < 6) {
  n++;
  if (n == 3) continue;
  if (n == 5) break;
  System.out.println(n);
}

System.out.println("Stopped at " + n);`,
    note: "An update after <code>continue</code> is skipped too. In a while loop, that can leave the same condition true forever.",
    details: [],
    lab: {
      title: "Follow the skipped code",
      fields: [
        {
          id: "skip",
          label: "Skip value (0–6)",
          value: "3",
        },
        {
          id: "stop",
          label: "Stop value (0–6)",
          value: "5",
        },
        {
          id: "update",
          label: "Update position",
          value: "before checks",
          options: ["before checks", "after checks"],
        },
      ],
    },
  },
  validation: {
    heading: "Reject, consume, retry",
    text: "Repeated input validation gives the user another chance after an invalid entry, instead of ending the program. A loop can keep asking until both the type and range are acceptable. <code>hasNextInt()</code> checks the next token without consuming it; <strong>consume rejected input before retrying</strong> so the next check can make progress.",
    code: `int level;

while (true) {
  System.out.println("Level (1–10):");
  if (!input.hasNextInt()) {
    input.next();
    System.out.println("Enter an integer");
    continue;
  }

  level = input.nextInt();
  if (level >= 1 && level <= 10) break;
  System.out.println("Choose 1–10");
}`,
    note: "Use <code>input.nextLine()</code> instead of <code>input.next()</code> when you intend to discard the entire remainder of the rejected input line.",
    details: [],
    lab: {
      title: "Feed a sequence of inputs",
      fields: [
        {
          id: "tokens",
          label: "Input tokens (up to 8)",
          value: "cat -2 5",
        },
        {
          id: "consume",
          label: "Consume invalid tokens",
          value: "yes",
          options: ["yes", "no"],
        },
      ],
    },
  },
  lines: {
    heading: "Scanner has a position in the input",
    text: "A <strong>token</strong> is one chunk of input; by default, Scanner separates tokens at whitespace such as spaces, tabs, and line endings. A <strong>line</strong> is the text up to a line ending and can contain several tokens—or be empty. For example, <code>Tim Zhou</code> is two tokens on one line.",
    code: `System.out.println("Age:");
int age = input.nextInt();
input.nextLine(); // Discard the rest of the age line

System.out.println("Full name:");
String name = input.nextLine();
System.out.println(name + ": " + age);`,
    note: "<code>nextLine()</code> is not a general buffer reset.",
    details: [
      {
        title: "How Scanner moves through input",
        text: "<code>nextInt()</code> and <code>next()</code> read tokens. <code>nextLine()</code> reads the remainder of the current line and passes its ending. After a number, that remainder is often empty—so the next read may return an empty string.",
      },
    ],
    lab: {
      title: "Watch the input cursor",
      fields: [
        {
          id: "input",
          label: "Input (use \\n for a new line)",
          value: "18\\nHello world!\\n",
        },
        {
          id: "method",
          label: "First read",
          value: "nextInt",
          options: ["nextInt", "next"],
        },
        {
          id: "discard",
          label: "Discard remainder before name",
          value: "yes",
          options: ["yes", "no"],
        },
      ],
    },
  },
  for: {
    heading: "A loop with a counter",
    text: "A <code>for</code> loop repeats work with its counter setup, condition, and update grouped in one place. It is often useful when the number of passes is known. Initialization runs once; the condition is checked before each pass; the update follows the body. <code>continue</code> still reaches the update, while <code>break</code> exits without it.",
    code: `int total = 0;

for (int n = 1; n <= 4; n++) {
  total += n;
}

System.out.println(total);`,
    note: "A variable declared in the for header belongs to that loop and cannot be accessed outside. An accumulator declared before the loop is still available afterward.",
    details: [
      {
        title: "Counting down",
        text: "Use a negative update with a condition such as <code>n >= limit</code>. Check that the direction and condition agree.",
      },
    ],
    lab: {
      title: "Count and accumulate",
      fields: [
        {
          id: "start",
          label: "Start (0–10)",
          value: "1",
        },
        {
          id: "limit",
          label: "Limit (0–10)",
          value: "4",
        },
        {
          id: "change",
          label: "Update amount (−3–3)",
          value: "1",
        },
        {
          id: "comparison",
          label: "Condition",
          value: "<=",
          options: ["<=", ">="],
        },
      ],
    },
  },
  random: {
    heading: "Randomly sample from a range",
    text: "Random sampling chooses a value from a set of possible outcomes, allowing games and simulations to vary between runs. Java’s <code>Random</code> generates pseudorandom values. Create one with <code>new Random()</code> and reuse it. <code>nextInt(bound)</code> returns an integer from <code>0</code> <strong>inclusive</strong> to <code>bound</code> <strong>exclusive</strong>; add an offset to shift that range.",
    code: `import java.util.Random;

// Inside main:
Random random = new Random();
int wins = 0;

for (int i = 0; i < 20; i++) {
  int slot = random.nextInt(4);
  if (slot < 2) wins++;
}

System.out.println(wins);`,
    note: "A 50% winning chance does not mean exactly half of a short run will win.",
    details: [
      {
        title: "Weighted outcomes",
        text: "Use random integer slots to generate weighted outcomes. Four equally likely slots can represent win, win, draw, lose. Two of four slots give a 50% win probability.",
      },
      {
        title: "Limitations",
        text: "The bound must be positive. Random produces pseudorandom values; it is useful for games and experiments, not passwords or security tokens.",
      },
    ],
    lab: {
      title: "Investigate the distribution",
      fields: [
        {
          id: "bound",
          label: "Bound (1–8)",
          value: "4",
        },
        {
          id: "offset",
          label: "Offset (−10–10)",
          value: "0",
        },
        {
          id: "samples",
          label: "Number of samples (1–100)",
          value: "20",
        },
        {
          id: "seed",
          label: "Optional seed (blank for normal sampling)",
          value: "",
          optional: true,
        },
      ],
    },
    tips: [
      {
        title: "Tip: repeat an experiment with a seed",
        text: "For debugging, <code>new Random(42)</code> starts a repeatable sequence. The same seed and the same calls give the same results. Leave the seed out for ordinary play; set one only when you want reproducible results.",
      },
    ],
  },
  nested: {
    heading: "One complete inner loop per outer pass",
    text: "Nested loops repeat one task inside another—for example, visiting every column within each row of a grid. The inner loop starts again on each outer pass. Follow the pair <code>(row, col)</code> to see which position is being processed.",
    code: `for (int row = 1; row <= 3; row++) {
  for (int col = 1; col <= 4; col++) {
    System.out.print("*");
  }
  System.out.println();
}`,
    note: "An unlabeled break or continue affects only the nearest enclosing loop. For a rectangle, the body runs rows × columns times.",
    details: [
      {
        title: "A growing inner loop",
        text: "For a triangle, let the inner limit be the current row. Three rows visit 1 + 2 + 3 positions rather than 3 × 3.",
      },
    ],
    lab: {
      title: "Trace the grid",
      fields: [
        {
          id: "rows",
          label: "Rows (1–4)",
          value: "3",
        },
        {
          id: "cols",
          label: "Columns (1–4)",
          value: "4",
        },
        {
          id: "shape",
          label: "Shape",
          value: "rectangle",
          options: ["rectangle", "triangle"],
        },
        {
          id: "action",
          label: "At column 2",
          value: "none",
          options: ["none", "continue", "break"],
        },
      ],
    },
  },
};
