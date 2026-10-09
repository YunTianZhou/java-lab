// Editable course content.
const UNIT_2_BUILD_TWENTYFOUR = {
  hints: [
    "Implement addition first and use a <code>boolean found = false;</code> to record whether anything matched.",
    "For division, check a nonzero divisor, then a zero remainder, then whether the quotient equals 24. Order the checks with <code>&&</code>.",
    "A match should set <code>found = true</code>. Do not connect the operation checks with <code>else if</code>.",
  ],
  try: "Compare 48 and 2 with 49 and 2. Try 24 and 0, 50 and 26, and −48 and −2.",
  sampleInput: `48
2`,
  validationNote:
    "Validate the inputs described in the requirements. The playground demonstrates the expected behavior; it does not run your code.",
  mission: "Read two integers and print every permitted expression that produces exactly 24.",
  tasks: [
    "Accept two integers from −1000 to 1000. Bad types or values produce <code>Invalid input</code>.",
    "Use both numbers exactly once with one of <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, or <code>%</code>. Either operand order is allowed.",
    "Division must be exact: <code>48 / 2</code> qualifies, but <code>49 / 2</code> does not. Division and remainder with a zero divisor are not permitted.",
    "Display every distinct matching expression, in any order, or <code>No match</code> if none produces 24.",
  ],
  fields: [
    {
      id: "a",
      label: "First integer",
      value: "48",
    },
    {
      id: "b",
      label: "Second integer",
      value: "2",
    },
  ],
  inputInstructions:
    "Enter two integer tokens. Java remainder can be negative when the left operand is negative; use Java’s result, not a positive-modulo rule.",
  sampleOutput: "48 / 2 = 24",
  solutionCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner input = new Scanner(System.in);

    if (!input.hasNextInt()) { System.out.println("Invalid input"); return; }
    int a = input.nextInt();

    if (!input.hasNextInt()) { System.out.println("Invalid input"); return; }
    int b = input.nextInt();

    if (a < -1000 || a > 1000 || b < -1000 || b > 1000) {
      System.out.println("Invalid input"); return;
    }
    boolean found = false;

    if (a + b == 24) {
      System.out.println(a + " + " + b + " = 24");
      found = true;
    }

    if (a * b == 24) {
      System.out.println(a + " * " + b + " = 24");
      found = true;
    }

    if (a - b == 24) {
      System.out.println(a + " - " + b + " = 24");
      found = true;
    }

    if (a != b && b - a == 24) {
      System.out.println(b + " - " + a + " = 24");
      found = true;
    }

    if (b != 0 && a % b == 0 && a / b == 24) {
      System.out.println(a + " / " + b + " = 24");
      found = true;
    }

    if (a != b && a != 0 && b % a == 0 && b / a == 24) {
      System.out.println(b + " / " + a + " = 24");
      found = true;
    }

    if (b != 0 && a % b == 24) {
      System.out.println(a + " % " + b + " = 24");
      found = true;
    }

    if (a != b && a != 0 && b % a == 24) {
      System.out.println(b + " % " + a + " = 24");
      found = true;
    }

    if (!found) System.out.println("No match");
  }
}`,
};
