// Editable course content.
const UNIT_1_QUIZZES = {
  print: [
    {
      title: "What appears on the console?",
      code: `System.out.print("Hi ");
System.out.println("Java!");
System.out.println("Ready.");`,
      options: [
        `Hi Java!
Ready.`,
        `Hi
Java!
Ready.`,
        "Hi Java! Ready.",
      ],
      answerIndex: 0,
      explanation: "print stays on the line; println starts a new line after printing.",
    },
    {
      title: "Which line correctly prints your hobby?",
      code: null,
      options: [
        'system.out.println("Drawing");',
        'System.out.println("Drawing");',
        "System.out.println(Drawing);",
      ],
      answerIndex: 1,
      explanation: "Java is case-sensitive. System starts with S, and text needs double quotes.",
    },
    {
      title: "How do you put two lines inside one message?",
      code: null,
      options: [
        'System.out.println("Name /n Hobby");',
        'System.out.println("Name \\nHobby");',
        'System.out.println("Name + Hobby");',
      ],
      answerIndex: 1,
      explanation: "The escape sequence \\n makes a newline.",
    },
  ],
  variables: [
    {
      title: "Which line declares a variable without assigning its value?",
      code: null,
      options: ["int coins;", "coins = 10;", "System.out.println(coins);"],
      answerIndex: 0,
      explanation: "int coins; creates the local variable. Assign a value before you read it.",
    },
    {
      title: "What values remain after these assignments?",
      code: `int left = 1;
int right = 2;
left = right;
right = left;`,
      options: ["left = 2, right = 1", "left = 1, right = 2", "left = 2, right = 2"],
      answerIndex: 2,
      explanation:
        "The first assignment replaces the original 1. The second copies 2 again; it cannot recover the lost value.",
    },
    {
      title: "Which first step protects the original left value?",
      code: null,
      options: ["right = left;", "int temp = left;", "left = right;"],
      answerIndex: 1,
      explanation:
        "Save the original left value in temporary storage before overwriting left. This is useful in the next build.",
    },
  ],
  types: [
    {
      title: "Which declaration holds a decimal battery reading?",
      code: null,
      options: ["int battery = 87.5;", "double battery = 87.5;", "boolean battery = 87.5;"],
      answerIndex: 1,
      explanation: "double holds decimal measurements. int is for whole numbers.",
    },
    {
      title: "Find the type mismatch.",
      code: null,
      options: ["char team = 'R';", 'boolean ready = "true";', "int items = 5;"],
      answerIndex: 1,
      explanation: '"true" is a String. A boolean uses true or false without quotes.',
    },
    {
      title: "Which declaration stores one ordinary team letter?",
      code: null,
      options: ["String team = R;", "char team = 'R';", 'char team = "R";'],
      answerIndex: 1,
      explanation:
        "A char uses single quotes and holds one UTF-16 code unit. Double quotes create a String.",
    },
  ],
  input: [
    {
      title: "Read the full name “Tim Zhou”. Which method fits?",
      code: null,
      options: ["next()", "nextInt()", "nextLine()"],
      answerIndex: 2,
      explanation: "nextLine reads a full line including spaces. next reads only one token.",
    },
    {
      title: "What happens if nextInt reads “twelve”?",
      code: "int age = input.nextInt();",
      options: ["It returns 12.", "It reports an input mismatch.", "It returns 0."],
      answerIndex: 1,
      explanation:
        "nextInt expects an integer token. Our playground reports this without crashing; the basic Java program needs valid input.",
    },
    {
      title: "Why is name empty after entering 12 and then pressing Enter?",
      code: `int age = input.nextInt();
String name = input.nextLine();`,
      options: [
        "The remaining newline ends the current line.",
        "String cannot follow int.",
        "nextLine only reads numbers.",
      ],
      answerIndex: 0,
      explanation:
        "nextInt leaves the newline behind. Use an extra input.nextLine(); to consume the remainder before reading the next full line.",
    },
  ],
  math: [
    {
      title: "Predict the result.",
      code: "System.out.println(7 / 2);",
      options: ["3.5", "3", "4"],
      answerIndex: 1,
      explanation: "Both operands are integers, so division rounds toward zero.",
    },
    {
      title: "Which calculation gives leftover slices after sharing 17 among 5?",
      code: null,
      options: ["17 / 5", "17 * 5", "17 % 5"],
      answerIndex: 2,
      explanation: "Remainder gives 2 leftover slices. Division gives 3 slices per person.",
    },
    {
      title: "How do you add first and then multiply?",
      code: null,
      options: ["2 + 3 * 4", "(2 + 3) * 4", "2 * 3 + 4"],
      answerIndex: 1,
      explanation:
        "Parentheses group the addition. Multiplication and division otherwise happen before addition and subtraction.",
    },
    {
      title: "What values are printed?",
      code: `int count = 4;
count += 3;
System.out.println(count++);
System.out.println(count);`,
      options: [
        `7
8`,
        `8
8`,
        `7
7`,
      ],
      answerIndex: 0,
      explanation:
        "The update makes count 7. Postfix increment prints the old value, then changes count to 8.",
    },
    {
      title: "Which expression produces 3.5?",
      code: null,
      options: ["(double) (7 / 2)", "(double) 7 / 2", "(int) 3.5"],
      answerIndex: 1,
      explanation:
        "Cast an operand before division. Casting the integer result afterward gives 3.0; casting 3.5 to int discards the fraction.",
    },
  ],
  strings: [
    {
      title: "What gets printed?",
      code: 'System.out.println("Score: " + 2 + 3);',
      options: ["Score: 5", "Score: 23", "Compilation error"],
      answerIndex: 1,
      explanation:
        "Evaluation goes left to right. After text is involved, + joins the numbers as text.",
    },
    {
      title: "Which expression evaluates to “Score: 5”?",
      code: null,
      options: ['"Score: " + (2 + 3)', '"Score: " + 2 + 3', '"Score: (2 + 3)"'],
      answerIndex: 0,
      explanation: "The parentheses calculate 5 before it is joined to the text.",
    },
    {
      title: "Which line joins the two variables with a space?",
      code: `String name = "Tim";
String place = "Mars";`,
      options: [
        'System.out.println("name place");',
        'System.out.println(name + " " + place);',
        "System.out.println(name place);",
      ],
      answerIndex: 1,
      explanation:
        "Quoted text is literal. Unquoted variable names supply their stored values; + joins the parts.",
    },
  ],
};
