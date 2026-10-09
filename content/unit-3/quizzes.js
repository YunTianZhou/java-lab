// Editable course content.
const UNIT_3_QUIZZES = {
  loops: [
    {
      kind: "text",
      title: "Write the printed lines",
      code: `int n = 2;
while (n < 7) {
  System.out.println(n);
  n += 2;
}`,
      answers: [
        `2
4
6`,
      ],
      explanation: "The condition is checked at 2, 4, 6, and finally 8.",
    },
    {
      title: "How many times does the body run?",
      code: `int n = 5;
while (n < 5) { n++; }`,
      options: ["0", "1", "5"],
      answerIndex: 0,
      explanation: "The first condition is false.",
    },
    {
      kind: "text",
      title: "What is the final value of n?",
      code: `int n = 0;
do {
  n += 3;
} while (n < 8);`,
      answers: ["9"],
      explanation: "The last pass changes 6 to 9, then the check fails.",
    },
    {
      title: "Does this terminate?",
      code: `int n = 1;
while (n <= 3) {
  System.out.println(n);
}`,
      options: ["Yes", "No"],
      answerIndex: 1,
      explanation: "No statement changes n, so the condition stays true.",
    },
    {
      title: "Choose the condition that prints 1 through 5",
      code: `int n = 1;
while (/* condition */) {
  System.out.println(n);
  n++;
}`,
      options: ["n < 5", "n <= 5", "n == 5"],
      answerIndex: 1,
      explanation: "The inclusive upper bound lets the pass at 5 execute.",
    },
    {
      title: "Which runs exactly once?",
      code: "int n = 10;",
      options: ["while (n < 0) { n++; }", "do { n++; } while (n < 0);", "while (n > 0) { n++; }"],
      answerIndex: 1,
      explanation: "The do-while body runs before its false condition is checked.",
    },
  ],
  input: [
    {
      kind: "text",
      title: "Predict the output",
      code: `int n = 0;
while (n < 5) {
  n++;
  if (n == 2) continue;
  if (n == 4) break;
  System.out.println(n);
}`,
      answers: [
        `1
3`,
      ],
      explanation: "2 is skipped; 4 breaks before printing.",
    },
    {
      title: "Input is cat then 5. Why is this stuck?",
      code: `while (!input.hasNextInt()) {
  System.out.println("Retry");
}`,
      options: [
        "The failed token is never consumed",
        "5 is not an int",
        "println prevents reading",
      ],
      answerIndex: 0,
      explanation: "hasNextInt repeatedly checks cat. Consume it before checking again.",
    },
    {
      title: "Input is 18 followed by a newline and Tim. What does name contain?",
      code: `int age = input.nextInt();
String name = input.nextLine();`,
      options: ["Tim", "An empty string", "18"],
      answerIndex: 1,
      explanation: "nextLine reads the empty remainder of the number line.",
    },
    {
      title: "Input is 18 Tim on one line. What does nextLine return after nextInt?",
      code: `int age = input.nextInt();
String rest = input.nextLine();`,
      options: ['"Tim"', '" Tim"', '""'],
      answerIndex: 1,
      explanation: "nextLine preserves the space and text remaining on that line.",
    },
    {
      title: "Which condition accepts only levels 1 through 10?",
      code: null,
      options: [
        "level >= 1 || level <= 10",
        "level >= 1 && level <= 10",
        "level > 1 && level < 10",
      ],
      answerIndex: 1,
      explanation: "Both inclusive limits must hold.",
    },
    {
      title: "What is wrong when n reaches 2?",
      code: `int n = 0;
while (n < 4) {
  if (n == 2) continue;
  n++;
}`,
      options: ["It exits early", "The increment is skipped forever", "It increments twice"],
      answerIndex: 1,
      explanation: "continue reaches the condition with n still equal to 2.",
    },
  ],
  counting: [
    {
      kind: "text",
      title: "Write the countdown output",
      code: `for (int n = 3; n >= 1; n--) {
  System.out.println(n);
}`,
      answers: [
        `3
2
1`,
      ],
      explanation: "The decrement follows each completed pass.",
    },
    {
      kind: "text",
      title: "What is printed?",
      code: `int total = 0;
for (int n = 1; n <= 4; n++) {
  total += n;
}
System.out.println(total);`,
      answers: ["10"],
      explanation: "The accumulator adds 1 + 2 + 3 + 4.",
    },
    {
      title: "Which condition performs exactly five passes from i = 0?",
      code: null,
      options: ["i <= 5", "i < 5", "i < 4"],
      answerIndex: 1,
      explanation: "The values are 0, 1, 2, 3, and 4.",
    },
    {
      kind: "text",
      title: "Write the output",
      code: `for (int i = 1; i <= 4; i++) {
  if (i == 2) continue;
  System.out.println(i);
}`,
      answers: [
        `1
3
4`,
      ],
      explanation: "continue skips printing, but the for update still runs.",
    },
    {
      title: "Does this compile?",
      code: `for (int i = 0; i < 3; i++) { }
System.out.println(i);`,
      options: ["Yes", "No"],
      answerIndex: 1,
      explanation: "i is scoped to the loop because it was declared in its header.",
    },
    {
      title: "What must change to count down to zero?",
      code: `for (int n = 5; n >= 0; n++) {
  System.out.println(n);
}`,
      options: ["Use n--", "Use n < 0", "Remove the update"],
      answerIndex: 0,
      explanation: "The update must move n toward the lower bound.",
    },
  ],
  chance: [
    {
      title: "Which values can this produce?",
      code: "random.nextInt(4)",
      options: ["1, 2, 3, 4", "0, 1, 2, 3", "0, 1, 2, 3, 4"],
      answerIndex: 1,
      explanation: "The lower bound is inclusive; the upper bound is exclusive.",
    },
    {
      title: "Which expression models a six-sided die?",
      code: null,
      options: ["random.nextInt(6)", "random.nextInt(6) + 1", "random.nextInt(7) + 1"],
      answerIndex: 1,
      explanation: "Start with 0–5, then add 1 to get 1–6.",
    },
    {
      kind: "multi",
      title: "Select every valid positive bound",
      code: null,
      options: ["0", "1", "4", "-3"],
      answerIndices: [1, 2],
      explanation: "nextInt(bound) requires a strictly positive bound; 1 always produces 0.",
    },
    {
      title:
        "Two new Random(42) objects receive the same calls. Do they produce the same sequence?",
      code: null,
      options: ["Yes", "No"],
      answerIndex: 0,
      explanation: "The same seed and calls reproduce the sequence.",
    },
    {
      title: "A 50% event occurs 7 times in 10 trials. Is this necessarily a bug?",
      code: null,
      options: ["Yes", "No"],
      answerIndex: 1,
      explanation: "Probability does not fix the counts in a short sample.",
    },
  ],
  nesting: [
    {
      kind: "text",
      title: "How many times does print run?",
      code: `for (int r = 0; r < 3; r++) {
  for (int c = 0; c < 4; c++) {
    System.out.print("*");
  }
}`,
      answers: ["12"],
      explanation: "Each of three outer passes performs four inner passes.",
    },
    {
      kind: "text",
      title: "Write the output",
      code: `for (int r = 1; r <= 3; r++) {
  for (int c = 1; c <= r; c++) {
    System.out.print("*");
  }
  System.out.println();
}`,
      answers: [
        `*
**
***`,
      ],
      explanation: "The inner limit grows with the current row.",
    },
    {
      title: "Where should println go to end each row?",
      code: null,
      options: [
        "Inside the inner loop",
        "After the inner loop, inside the outer loop",
        "After both loops",
      ],
      answerIndex: 1,
      explanation: "End the line once all columns for that row are printed.",
    },
    {
      kind: "text",
      title: "How many stars are printed?",
      code: `for (int r = 1; r <= 3; r++) {
  for (int c = 1; c <= 4; c++) {
    if (c == 2) break;
    System.out.print("*");
  }
}`,
      answers: ["3"],
      explanation: "The inner loop prints one star per row. break does not exit the outer loop.",
    },
    {
      kind: "text",
      title: "How many stars are printed?",
      code: `for (int r = 1; r <= 2; r++) {
  for (int c = 1; c <= 3; c++) {
    if (c == 2) continue;
    System.out.print("*");
  }
}`,
      answers: ["4"],
      explanation: "Each row prints at columns 1 and 3.",
    },
    {
      title: "Why does only the first row print stars?",
      code: `int c = 0;
for (int r = 0; r < 3; r++) {
  while (c < 4) {
    System.out.print("*");
    c++;
  }
}`,
      options: [
        "c is not reset for each row",
        "The outer loop runs once",
        "while cannot be nested",
      ],
      answerIndex: 0,
      explanation: "After the first row c is 4 and remains 4.",
    },
  ],
};
