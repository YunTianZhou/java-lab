// Editable course content.
const UNIT_2_LESSONS = {
  expressions: {
    heading: "Values and actions",
    text: "An <strong>expression produces a value</strong>, such as <code>3 + 4</code>. A statement describes an action or declaration. A statement can contain expressions. Some expressions, such as assignments and increments, can also be used as statements when followed by <code>;</code>.",
    code: `int score = 3 + 4; // declaration statement
score = score + 2; // expression statement
System.out.println(score); // method invocation statement`,
    note: "<code>score + 2;</code> alone is not a valid Java statement. Arithmetic produces a value, but Java does not permit every expression as a standalone statement.",
    experimentTitle: "Predict, then trace",
    cases: [
      {
        title: "Inside an assignment",
        code: `int points = 6;
points = points + 4;
System.out.println(points);`,
        output: "10",
        explanation:
          "<code>points + 4</code> produces 10. The assignment stores it; the print statement displays it.",
        trace: ["Read points: 6", "Evaluate 6 + 4: 10", "Assign points: 10", "Print: 10"],
      },
      {
        title: "An expression can update a variable",
        code: `int n = 2;
int previous = n++;
System.out.println(previous);
System.out.println(n);`,
        output: `2
3`,
        explanation:
          "<code>n++</code> is an expression with both a value and a side effect. It supplies 2, then leaves <code>n</code> at 3.",
        trace: [],
      },
      {
        title: "Not every call produces a value",
        code: `int length = "Java".length();
System.out.println(length);
// int result = System.out.println(length); // invalid`,
        output: "4",
        explanation:
          "<code>length()</code> returns a value. <code>println</code> returns nothing, so its result cannot initialize an <code>int</code>.",
        trace: [],
      },
    ],
  },
  logic: {
    heading: "Combine boolean conditions",
    text: "Logical operators work with <code>boolean</code> values. <code>A && B</code> is true only when <strong>both</strong> conditions are true. <code>A || B</code> is true when <strong>at least one</strong> condition is true, including when both are true. <code>!A</code> reverses A: true becomes false, and false becomes true.",
    code: `boolean member = true;
boolean invited = false;
System.out.println(member && invited); // false
System.out.println(member || invited); // true
System.out.println(!member);           // false`,
    note: "Use <code>&&</code> for “both,” <code>||</code> for “either,” and <code>!</code> for “not.” Java evaluates <code>!</code> before <code>&&</code>, then <code>||</code>. Use parentheses to make your intended grouping clear.",
    details: [
      {
        title: "Combine comparisons",
        text: "Each comparison already produces a boolean, so <code>age >= 13 && age <= 19</code> checks an inclusive range. Do not write <code>13 <= age <= 19</code>: the first comparison produces a boolean that cannot be compared with 19.",
      },
    ],
    playground: {
      type: "logic",
      title: "Change the boolean values",
      button: "Evaluate",
      fields: [
        {
          id: "left",
          label: "A",
          value: "true",
          options: ["true", "false"],
        },
        {
          id: "operator",
          label: "Expression",
          value: "A && B",
          options: ["A && B", "A || B", "!A", "!B"],
        },
        {
          id: "right",
          label: "B",
          value: "false",
          options: ["true", "false"],
        },
      ],
    },
  },
  branches: {
    heading: "Exactly one branch, but maybe several checks",
    text: "Branching lets a program choose which instructions to run based on a condition. An <code>if</code> runs its block when its condition is <code>true</code>. An <code>else if</code> is considered only when earlier conditions failed; an <code>else</code> handles the remaining cases. <strong>An if/else-if chain selects at most one branch</strong>. Write <code>if</code> first, then any <code>else if</code> branches, and at most one final <code>else</code>.",
    code: `int score = 85;

if (score >= 90) {
  System.out.println("A");
} else if (score >= 80) {
  System.out.println("B");
} else {
  System.out.println("Keep practicing");
}`,
    note: "Use braces, including for one statement. A semicolon immediately after <code>if (condition)</code> creates an empty statement and can disconnect the intended block.",
    experimentTitle: "Predict, then trace",
    cases: [
      {
        title: "First matching branch",
        code: `int score = 95;
if (score >= 90) {
  System.out.println("A");
} else if (score >= 80) {
  System.out.println("B");
}`,
        output: "A",
        explanation: "Once the first condition matches, the remaining branches are skipped.",
        trace: ["95 >= 90: true", "Print A", "Skip else-if"],
      },
      {
        title: "Independent checks",
        code: `int temperature = 35;
if (temperature > 30) {
  System.out.println("Hot");
}
if (temperature > 20) {
  System.out.println("Warm");
}`,
        output: `Hot
Warm`,
        explanation:
          "These are two independent statements. Both conditions are true, so both blocks run.",
        trace: [],
      },
      {
        title: "Order matters",
        code: `int score = 95;
if (score >= 50) {
  System.out.println("Pass");
} else if (score >= 90) {
  System.out.println("Distinction");
}`,
        output: "Pass",
        explanation:
          "Logic flaw: the second branch is always skipped. Check the highest threshold first.",
        trace: [],
      },
    ],
  },
  inputChecks: {
    heading: "Check, then read",
    text: "Input validation checks whether entered data has an acceptable type and value before the program uses it. <code>hasNext()</code> checks for another token—a chunk of input separated by whitespace by default. <code>hasNextInt()</code> and <code>hasNextDouble()</code> check its type. <strong>These checks do not consume the token</strong>. Read it with the matching <code>next...</code> method, then check its allowed range.",
    code: `// With Scanner input already created:
if (input.hasNextInt()) {
  int age = input.nextInt();
  System.out.println(age);
} else {
  System.out.println("Enter a whole number");
}`,
    note: "These methods can wait for keyboard input. Examples use a fixed input stream for clarity. <code>return;</code> inside <code>main</code> ends the program early; later builds use it after an error.",
    experimentTitle: "Predict, then trace",
    cases: [
      {
        title: "Checking twice",
        code: `Scanner input = new Scanner("12 hello");
System.out.println(input.hasNextInt());
System.out.println(input.hasNextInt());
System.out.println(input.nextInt());
System.out.println(input.next());`,
        output: `true
true
12
hello`,
        explanation: "Both checks inspect the same token. Only <code>nextInt()</code> consumes 12.",
        trace: ["Inspect 12: true", "Inspect 12 again: true", "Consume 12", "Consume hello"],
      },
      {
        title: "Wrong type is still there",
        code: `Scanner input = new Scanner("twelve 12");
System.out.println(input.hasNextInt());
System.out.println(input.hasNext());
System.out.println(input.next());
System.out.println(input.nextInt());`,
        output: `false
true
twelve
12`,
        explanation:
          "A failed numeric check does not discard the token. <code>next()</code> consumes the invalid word.",
        trace: [],
      },
      {
        title: "Type is not range",
        code: `Scanner input = new Scanner("-3");

if (input.hasNextInt()) {
  int count = input.nextInt();

  if (count > 0) {
    System.out.println("Accepted");
  } else {
    System.out.println("Must be positive");
  }
}`,
        output: "Must be positive",
        explanation:
          "Negative three is an integer, but it does not satisfy this program’s positive-count rule.",
        trace: [],
      },
    ],
  },
  nested: {
    heading: "Check the outer condition first",
    text: "A nested <code>if</code> makes a decision inside an existing branch. The inner check runs only when that outer branch is entered. <strong>An else belongs to the nearest unmatched if</strong>. Braces make the intended structure explicit.",
    code: `boolean signedIn = true;
boolean editor = false;

if (signedIn) {
  if (editor) {
    System.out.println("Edit");
  } else {
    System.out.println("View");
  }
} else {
  System.out.println("Sign in");
}`,
    note: "Use nesting when the inner decision only makes sense after a prerequisite. If only one action depends on two conditions, it is better to use a combined condition.",
    playground: {
      type: "nested",
      title: "Follow your boolean values",
      button: "Run example",
      fields: [
        {
          id: "signedIn",
          label: "signedIn",
          value: "true",
          options: ["true", "false"],
        },
        {
          id: "editor",
          label: "editor",
          value: "false",
          options: ["true", "false"],
        },
      ],
    },
  },
  shortCircuit: {
    heading: "Some expressions are skipped",
    text: "Short-circuit evaluation stops checking a combined condition once its result is already known. <code>A && B</code> skips B when A is false; <code>A || B</code> skips B when A is true. Java evaluates these operands <strong>left to right</strong>, so a safety check can guard an operation that depends on it.",
    code: `int divisor = 0;
if (divisor != 0 && 12 / divisor > 2) {
  System.out.println("Matched");
} else {
  System.out.println("Not matched");
}`,
    note: "With boolean operands, <code>&</code> and <code>|</code> evaluate both sides. They do not provide these guards. Reversing a guard can still cause an exception.",
    experimentTitle: "Predict, then trace",
    cases: [
      {
        title: "Guard division",
        code: `int divisor = 0;
System.out.println(divisor != 0 && 12 / divisor > 2);`,
        output: "false",
        explanation: "The division is skipped.",
        trace: ["divisor != 0: false", "Skip 12 / divisor", "Whole condition: false"],
      },
      {
        title: "An or expression",
        code: `int checks = 0;
boolean result = true || ++checks > 0;
System.out.println(result);
System.out.println(checks);`,
        output: `true
0`,
        explanation: "The left side already makes the expression true. The increment is skipped.",
        trace: ["Left side: true", "Skip ++checks > 0", "checks stays 0"],
      },
      {
        title: "The wrong order",
        code: `int divisor = 0;
System.out.println(12 / divisor > 2 && divisor != 0);`,
        output: "ArithmeticException: / by zero",
        explanation:
          "Java attempts the division before reaching the guard. The program does not print a boolean value.",
        trace: ["Evaluate 12 / 0", "Exception", "Guard never reached"],
      },
      {
        title: "Single ampersand",
        code: `int divisor = 0;
System.out.println(divisor != 0 & 12 / divisor > 2);`,
        output: "ArithmeticException: / by zero",
        explanation:
          "Boolean <code>&</code> evaluates the right operand even when the left operand is false.",
        trace: [],
      },
    ],
  },
  ternary: {
    heading: "Choose one of two values",
    text: "A conditional expression chooses one of two values based on a boolean condition. Its syntax is <code>condition ? valueIfTrue : valueIfFalse</code>. Often called “inline if,” it <strong>produces a value</strong>; only the chosen branch is evaluated.",
    code: `int age = 16;
String ticket = age < 18 ? "Junior" : "Adult";
System.out.println(ticket);`,
    note: "Use <code>if</code> for a sequence of actions. Keep <code>?:</code> for a simple choice between compatible values, and avoid nested conditional expressions that are difficult to read.",
    experimentTitle: "Predict, then trace",
    cases: [
      {
        title: "Choose a surcharge",
        code: `boolean weekend = true;
int surcharge = weekend ? 200 : 0;
System.out.println(surcharge);`,
        output: "200",
        explanation: "The condition selects one value in cents; it does not run both alternatives.",
        trace: [],
      },
      {
        title: "Boundary value",
        code: `int age = 18;
System.out.println(age < 18 ? "Junior" : "Adult");`,
        output: "Adult",
        explanation: "Age 18 fails the strict comparison.",
        trace: [],
      },
      {
        title: "Only one calculation runs",
        code: `int divisor = 0;
int result = divisor == 0 ? 0 : 12 / divisor;
System.out.println(result);`,
        output: "0",
        explanation:
          "The selected value is zero. The division in the unselected branch is skipped.",
        trace: [],
      },
    ],
  },
  switching: {
    heading: "Match a value with arrow cases",
    text: "A <code>switch</code> chooses a case by matching a single value against named alternatives. This is useful for menus or categories. Modern arrow cases use <code>case ... -></code>; group labels with commas and use <code>default</code> for unmatched values. <strong>Arrow cases do not fall through into the next case</strong>.",
    code: `int choice = 2;
switch (choice) {
  case 1 -> System.out.println("Standard");
  case 2 -> System.out.println("Premium");
  default -> System.out.println("Invalid choice");
}`,
    note: "Use Java 17 or later for this course. A switch expression returns a value and must cover every possible selector value. With an int or String selector, include <code>default</code>. Use <code>if</code> for ranges or unrelated conditions.",
    experimentTitle: "Predict, then trace",
    cases: [
      {
        title: "No fall-through",
        code: `int choice = 1;
switch (choice) {
  case 1 -> System.out.println("One");
  case 2 -> System.out.println("Two");
  default -> System.out.println("Other");
}`,
        output: "One",
        explanation: "The matching arrow case finishes without needing <code>break</code>.",
        trace: ["Match case 1", "Print One", "Leave switch"],
      },
      {
        title: "A switch expression",
        code: `String day = "Sat";
int extra = switch (day) {
  case "Sat", "Sun" -> 200;
  default -> 0;
};
System.out.println(extra);`,
        output: "200",
        explanation:
          "The switch returns an int value for assignment. The declaration ends with a semicolon.",
        trace: [],
      },
      {
        title: "Return from a case block",
        code: `int category = 2;
int price = switch (category) {
  case 1 -> 1000;
  case 2 -> {
    int base = 1000;
    yield base + 500;
  }
  default -> 0;
};

System.out.println(price);`,
        output: "1500",
        explanation:
          "In a switch-expression block, <code>yield</code> supplies that case’s result. It is different from <code>return</code>, which leaves the method.",
        trace: [],
      },
    ],
  },
  comparisons: {
    heading: "A condition answers a yes-or-no question",
    text: "A <strong>condition is an expression that produces a boolean value</strong>: <code>true</code> when its test succeeds, or <code>false</code> when it does not. For example, <code>age >= 18</code> asks whether age is at least 18. In Java, a condition must be boolean: a number such as <code>1</code> is not a condition.",
    code: `int age = 18;
boolean adult = age >= 18;
System.out.println(adult); // true`,
    note: '<code>==</code> tests equality; <code>=</code> assigns a value. For String contents use <code>"yes".equals(answer)</code>, not <code>==</code>. Use the text mode to compare exact contents, including spaces and letter case.',
    details: [
      {
        title: "Compare numeric values",
        text: "<code>==</code>: equal to. <code>!=</code>: not equal to. <code><</code>: less than. <code>></code>: greater than. <code><=</code> and <code>>=</code> include equality. Try equal values to see which comparisons accept the boundary.",
      },
    ],
    playground: {
      type: "comparison",
      title: "Compare your own values",
      button: "Compare",
      fields: [
        {
          id: "mode",
          label: "Value type",
          value: "Numbers",
          options: ["Numbers", "Text"],
        },
        {
          id: "left",
          label: "Left value",
          value: "18",
        },
        {
          id: "operator",
          label: "Comparison",
          value: ">=",
          options: ["==", "!=", "<", "<=", ">", ">="],
        },
        {
          id: "right",
          label: "Right value",
          value: "18",
        },
      ],
    },
  },
};
