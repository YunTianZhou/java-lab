// Editable course content.
const UNIT_2_QUIZZES = {
  conditions: [
    {
      title: "Which fragment is an expression that produces a value? ",
      code: null,
      options: ["int total = 3 + 4;", "3 + 4", "if (ready) { }"],
      answerIndex: 1,
      explanation: "3 + 4 evaluates to 7. The declaration contains this expression.",
    },
    {
      kind: "multi",
      title: "Select every valid standalone statement",
      code: null,
      options: ["count++;", "count + 1;", "int count = 1;", "System.out.println(count);"],
      answerIndices: [0, 2, 3],
      explanation:
        "Increment, declarations, and method calls are permitted statements. A bare addition is not.",
    },
    {
      kind: "choice",
      title: "Choose the two boolean results",
      code: `int age = 18;
System.out.println(age >= 13 && age <= 18);
System.out.println(age > 13 && age < 18);`,
      explanation: "The first range includes its endpoints. The second excludes 18.",
      scenario: "",
      options: [
        `true
true`,
        `true
false`,
        `false
true`,
        `false
false`,
      ],
      answerIndex: 1,
    },
    {
      kind: "text",
      title: "Fill in the logical operator",
      code: `// Either a member OR an invited guest may enter.
boolean allowed = member ___ invited;`,
      answers: ["||"],
      explanation: "Either condition is sufficient. Use logical OR.",
      scenario: "",
    },
    {
      title: "Which comparison checks the entered word?",
      code: null,
      options: ['answer == "yes"', '"yes".equals(answer)', 'answer = "yes"'],
      answerIndex: 1,
      explanation:
        "equals compares String contents. Assignment stores a value, while == compares references here.",
    },
    {
      kind: "choice",
      title: "Predict the boolean output",
      code: `boolean member = true, guest = false, banned = true;
System.out.println((member || guest) && !banned);`,
      explanation: "Although the visitor is a member, the not-banned condition fails.",
      scenario: "A visitor must be eligible and must not be banned.",
      options: ["true", "false"],
      answerIndex: 1,
    },
  ],
  branches: [
    {
      kind: "text",
      title: "Type the exact output",
      code: `int score = 95;
if (score >= 50) System.out.println("Pass");
else if (score >= 90) System.out.println("Distinction");`,
      answers: ["Pass"],
      explanation: "The first condition wins. The second condition was skipped.",
      scenario: "",
    },
    {
      kind: "text",
      title: "Type every printed line",
      code: `int temperature = 35;
if (temperature > 30) System.out.println("Hot");
if (temperature > 20) System.out.println("Warm");`,
      answers: [
        `Hot
Warm`,
      ],
      explanation: "Independent if statements may both execute.",
      scenario: "",
    },
    {
      title: "What prints at the boundary?",
      code: `int age = 18;
if (age < 18) System.out.println("Junior");
else System.out.println("Adult");`,
      options: ["Junior", "Adult", "Nothing"],
      answerIndex: 1,
      explanation: "Age 18 is not less than 18, so else runs.",
    },
    {
      title: "Find the bug",
      code: `boolean ready = false;
if (ready);
{
  System.out.println("Start");
}`,
      options: [
        "The semicolon makes the if body empty",
        "false must be quoted",
        "Braces are forbidden",
      ],
      answerIndex: 0,
      explanation: "The following block is separate and runs regardless of ready.",
    },
    {
      kind: "order",
      title: "Order the branches from most specific to fallback",
      options: [
        'else { System.out.println("Below pass"); }',
        'if (score >= 90) { System.out.println("A"); }',
        'else if (score >= 50) { System.out.println("Pass"); }',
      ],
      answerOrder: [1, 2, 0],
      explanation: "Check the highest threshold first, then the broader pass threshold, then else.",
    },
    {
      kind: "text",
      title: "Give one integer that exposes the boundary bug",
      code: `// Free admission is intended for ages 0 through 5.
if (age < 5) System.out.println("Free");
else System.out.println("Paid");`,
      answers: ["5"],
      explanation: "Five should be free but the strict comparison rejects it.",
      scenario: "",
    },
  ],
  inputChecks: [
    {
      kind: "text",
      title: "Type the output",
      code: `Scanner input = new Scanner("12 cat");
System.out.println(input.hasNextInt());
System.out.println(input.hasNextInt());
System.out.println(input.nextInt());`,
      answers: [
        `true
true
12`,
      ],
      explanation: "Checking does not consume the token. Both checks inspect 12.",
      scenario: "",
    },
    {
      kind: "text",
      title: "What token does next() return?",
      code: `Scanner input = new Scanner("oops 8");
input.hasNextInt();
System.out.println(input.next());`,
      answers: ["oops"],
      explanation: "The failed check leaves oops waiting.",
      scenario: "",
    },
    {
      title: "Which check also enforces the application rule?",
      code: null,
      options: ["hasNextInt() alone", "Read an int, then check count > 0", "hasNext() alone"],
      answerIndex: 1,
      explanation: "Input type and allowed value are separate checks.",
    },
    {
      kind: "order",
      title: "Order this safe input sequence",
      options: [
        "int age = input.nextInt();",
        'if (!input.hasNextInt()) { System.out.println("Invalid"); return; }',
        "System.out.println(age);",
      ],
      answerOrder: [1, 0, 2],
      explanation: "Check type first, consume the number second, then use it.",
    },
    {
      kind: "text",
      title: "Trace the nested conditions",
      code: `boolean signedIn = true, editor = false;
if (signedIn) {
  if (editor) System.out.println("Edit");
  else System.out.println("View");
} else System.out.println("Sign in");`,
      answers: ["View"],
      explanation: "The inner else handles a signed-in non-editor.",
      scenario: "",
    },
    {
      kind: "multi",
      title: "Which claims are correct?",
      code: null,
      options: [
        "hasNextInt() consumes an integer",
        "hasNext() can wait for console input",
        "A numeric check validates a positive range",
        "nextInt() consumes a token",
      ],
      answerIndices: [1, 3],
      explanation:
        "Checks may wait and do not consume input. Reading and validating an allowed range are separate actions.",
    },
  ],
  guards: [
    {
      kind: "choice",
      title: "Choose the boolean output",
      code: `int d = 0;
System.out.println(d != 0 && 12 / d > 2);`,
      explanation: "The first operand is false; division is skipped.",
      scenario: "",
      options: ["true", "false", "ArithmeticException"],
      answerIndex: 1,
    },
    {
      kind: "text",
      title: "Type both outputs",
      code: `int checks = 0;
boolean result = true || ++checks > 0;
System.out.println(result);
System.out.println(checks);`,
      answers: [
        `true
0`,
      ],
      explanation: "The true left operand means the increment is not evaluated.",
      scenario: "",
    },
    {
      title: "What happens?",
      code: `int d = 0;
System.out.println(12 / d > 2 && d != 0);`,
      options: ["false", "true", "ArithmeticException"],
      answerIndex: 2,
      explanation: "The division runs before the guard.",
    },
    {
      kind: "multi",
      title: "Select the guards that avoid division by zero",
      code: null,
      options: [
        "d != 0 && 12 / d > 2",
        "d == 0 || 12 / d > 2",
        "d != 0 & 12 / d > 2",
        "12 / d > 2 || d == 0",
      ],
      answerIndices: [0, 1],
      explanation:
        "Both short-circuit forms skip division for zero. A single ampersand is an and a late guard do not. Avoid using a single ampersand as a logic operator.",
    },
    {
      kind: "text",
      title: "Give an input that breaks this guard",
      code: `// d may be any int.
boolean matched = d >= 0 && 24 / d == 2;`,
      answers: ["0"],
      explanation: "Zero passes d >= 0 and then causes division by zero.",
      scenario: "",
    },
    {
      kind: "choice",
      title: "Choose the printed result",
      code: `int n = 49;
System.out.println(n / 2 == 24 && n % 2 == 0);`,
      explanation:
        "Integer division gives 24, but the nonzero remainder shows the division was not exact.",
      scenario: "",
      options: ["true", "false"],
      answerIndex: 1,
    },
  ],
  selection: [
    {
      kind: "text",
      title: "Predict the selected label",
      code: `int age = 18;
String label = age < 18 ? "Junior" : "Adult";
System.out.println(label);`,
      answers: ["Adult"],
      explanation: "The strict comparison is false at 18.",
      scenario: "",
    },
    {
      kind: "text",
      title: "Predict the arrow-switch output",
      code: `int choice = 1;
switch (choice) {
  case 1 -> System.out.println("One");
  case 2 -> System.out.println("Two");
  default -> System.out.println("Other");
}`,
      answers: ["One"],
      explanation: "Arrow cases do not fall through.",
      scenario: "",
    },
    {
      title: "Choose a structure for temperature ranges",
      code: null,
      options: [
        "if / else if / else",
        "switch with case temperature > 30",
        "Three nested conditional expressions",
      ],
      answerIndex: 0,
      explanation: "An if chain directly expresses ordered range comparisons.",
    },
    {
      kind: "text",
      title: "Type the missing keyword",
      code: `int cost = switch (kind) {
  case 1 -> {
    int base = 10;
    ___ base + 2;
  }
  default -> 0;
};`,
      answers: ["yield"],
      explanation: "yield supplies the value from a switch-expression block.",
      scenario: "",
    },
    {
      kind: "multi",
      title: "Select equivalent expressions for int score",
      code: null,
      options: [
        'score >= 50 ? "Pass" : "Retry"',
        'score < 50 ? "Retry" : "Pass"',
        'score > 50 ? "Pass" : "Retry"',
        'score >= 50 ? "Retry" : "Pass"',
      ],
      answerIndices: [0, 1],
      explanation: "The first two agree for every int score, including exactly 50.",
    },
    {
      kind: "text",
      title: "Trace a switch expression followed by a conditional expression",
      code: `String day = "Sun";
int extra = switch (day) {
  case "Sat", "Sun" -> 2;
  default -> 0;
};
System.out.println(extra > 0 ? "Weekend" : "Weekday");`,
      answers: ["Weekend"],
      explanation: "Sun matches the grouped case, so extra is 2 and the condition selects Weekend.",
      scenario: "",
    },
  ],
};
