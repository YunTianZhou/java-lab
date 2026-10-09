// Editable course content.
const UNIT_1_LESSONS = {
  structure: {
    heading: "Basic program structure",
    text: "A Java program groups instructions inside a class. The <code>main</code> method is the starting point for this kind of program. Save this example as <code>Main.java</code>, then select a part to see its role.",
    code: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, world!");
  }
}`,
    experiment: "structure",
    note: "Keep this outer structure for now. Code in later examples belong inside <code>main</code> unless a full class is shown.",
  },
  print: {
    heading: "Same line or next line?",
    text: "Output is information a program displays for the user. Here, the console displays text: <code>print</code> writes it, while <code>println</code> also <strong>moves to the next line</strong>. Put literal text inside <strong>double quotes</strong> and end each statement with a <strong>semicolon</strong>.",
    code: `System.out.print("Hello ");
System.out.println("Java!");
System.out.println("Name: Lauder\\nHobby: Motorcycling");`,
    experiment: "print",
    note: "Java is case-sensitive: System works; system does not. The escape sequence \\n creates a new line inside a string.",
  },
  variables: {
    heading: "Declaration and assignment",
    text: "Variables are containers that store data. A declaration gives a variable a <strong>type</strong> and <strong>name</strong>. Assignment puts a value there. Initialization is the first assignment. The = sign stores a value. <strong>It does not compare two values</strong>.",
    code: `int coins;       // Declaration
coins = 10;      // First assignment
coins = 25;      // Reassignment
int lives = 3;   // Declaration + initialization`,
    experiment: "variables",
    note: "Use names like playerScore. Names cannot begin with a digit or be keywords. A local variable must receive a value before you read it.",
  },
  types: {
    heading: "Choose a container that fits",
    text: "A data type defines what kind of value a variable can hold and which operations make sense for it. Java has <strong>eight primitive types</strong> for values such as numbers, truth values, and characters. Start with <code>int</code>, <code>double</code>, <code>boolean</code>, and <code>char</code>. <code>String</code> is an object type for text, not a primitive.",
    code: `int items = 3;
double battery = 87.5;
boolean ready = true;
char team = 'R';`,
    experiment: "types",
    note: "<code>char</code> uses single quotes; <code>String</code> uses <code>double</code> quotes. A <code>char</code> holds one UTF-16 code unit, which covers most ordinary letters but not every emoji.",
  },
  input: {
    heading: "Turn typing into data",
    text: "<code>Scanner</code> allows you to read data from keyboard input. <code>nextLine</code> reads the rest of a line, <code>nextInt</code> reads an integer, and <code>nextDouble</code> reads a decimal number. Run the example with different input types.",
    code: `import java.util.Scanner;
// Inside main:
Scanner input = new Scanner(System.in);
String name = input.nextLine();
int age = input.nextInt();
double luggage = input.nextDouble();`,
    experiment: "input",
    note: "After <code>nextInt</code> or <code>nextDouble</code>, a following <code>nextLine</code> can read an empty remainder of the current line. Consume that remainder with an extra <code>nextLine</code> before asking for a new line.",
  },
  math: {
    heading: "Math in Java",
    text: "Arithmetic operators calculate numeric results from values. Use <code>+</code> to add, <code>-</code> to subtract, <code>*</code> to multiply, <code>/</code> to divide, and <code>%</code> to find a remainder. Multiplication, division, and remainder precede addition and subtraction. Parentheses change the grouping.",
    code: `int total = (2 + 3) * 4; // 20
int share = 7 / 2;       // 3
double exact = 7.0 / 2;  // 3.5
int left = 7 % 2;        // 1`,
    experiment: "math",
    note: "Integer division rounds toward zero. Integer division or remainder by zero is an error. Floating-point division can produce Infinity or NaN.",
  },
  strings: {
    heading: "String concatenation",
    text: "A <code>String</code> stores text in <strong>double quotes</strong>. Put + between values to join them. Use spaces in your literal text when you want spaces in the result.",
    code: `String name = "Tim";
int moons = 2;
System.out.println(name + " found " + moons + " moons.");
System.out.println("Score: " + 2 + 3);
System.out.println("Score: " + (2 + 3));`,
    experiment: "strings",
    note: "Once an addition expression becomes text, later + operations concatenate. Parentheses let you do arithmetic before joining the result to text.",
  },
  shortcuts: {
    heading: "Update a value in place",
    text: "Compound assignment updates a variable using its current value. Operators such as <code>+=</code>, <code>-=</code>, <code>*=</code>, <code>/=</code>, and <code>%=</code> combine a calculation and assignment. For an <code>int</code> variable and operand, <code>score += 3</code> performs the same update as <code>score = score + 3</code>. <strong>The variable must already have a value</strong>.",
    code: `int score = 10;
score += 3;  // 13
score -= 2;  // 11
score *= 2;  // 22
score /= 4;  // 5: still integer division
score %= 3;  // 2
score++;     // 3
score--;     // 2`,
    note: "<code>++</code> adds one; <code>--</code> subtracts one. Prefer a separate statement when the expression does not need the old or new value. <strong>Shorter syntax does not prevent overflow or division by zero</strong>.",
    experimentTitle: "Compare the updates",
    cases: [
      {
        title: "Compound assignment",
        code: `int points = 8;
points += 2 * 3;
System.out.println(points);`,
        output: "14",
        explanation:
          "The right-hand calculation happens before assignment: <code>8 + (2 * 3)</code>. <code>+=</code> updates the existing value.",
      },
      {
        title: "Prefix and postfix",
        code: `int count = 4;
System.out.println(count++);
System.out.println(count);
System.out.println(++count);
System.out.println(count);`,
        output: `4
5
6
6`,
        explanation:
          "<code>count++</code> supplies the old value, then increments. <code>++count</code> increments first and supplies the new value. Both update <code>count</code>.",
      },
      {
        title: "Decrement",
        code: `int lives = 3;
System.out.println(lives--);
System.out.println(--lives);
System.out.println(lives);`,
        output: `3
1
1`,
        explanation:
          "The same timing applies to <code>--</code>. A standalone <code>lives--;</code> or <code>--lives;</code> leaves the same final value.",
      },
      {
        title: "+= is not =+",
        code: `int first = 10;
int second = 10;
first += 3;
second = +3;
System.out.println(first);
System.out.println(second);`,
        output: `13
3`,
        explanation:
          "<code>= +3</code> assigns positive three. It does not add to the previous value. <strong>Operator order matters</strong>.",
      },
      {
        title: "An implicit conversion",
        code: `int total = 5;
total += 2.9;
System.out.println(total);
// total = total + 2.9; // Does not compile`,
        output: "7",
        explanation:
          "Compound assignment converts the result back to the variable’s type. Here it behaves like <code>total = (int) (total + 2.9)</code>. The next lesson explains why the fraction disappears.",
      },
    ],
  },
  casting: {
    heading: "Convert between different types",
    text: "Type conversion represents a value using a different data type. A <strong>cast</strong> explicitly requests a conversion with <code>(type) expression</code>. Some conversions lose precision or range; casting does not guarantee that the original value is preserved.",
    code: `int count = 7;
double widened = count;    // 7.0
double price = 7.9;
int whole = (int) price;   // 7
System.out.println(price); // 7.9: price was not reassigned`,
    note: "<strong>Casting is not rounding, parsing, or validation</strong>. Check whether the destination can represent the value and cast before an operation when its type needs to change.",
    experimentTitle: "Inspect a casting edge case",
    cases: [
      {
        title: "Negative decimals",
        code: `System.out.println((int) 7.9);
System.out.println((int) -7.9);`,
        output: `7
-7`,
        explanation:
          "A floating-point value cast to an integer loses its fractional part <strong>toward zero</strong>. It does not round to the nearest integer or always round downward.",
      },
      {
        title: "Cast before division",
        code: `System.out.println((double) (7 / 2));
System.out.println((double) 7 / 2);`,
        output: `3.0
3.5`,
        explanation:
          "The first expression divides integers before converting. The second converts an operand first, so division uses floating point. A later cast cannot recover the discarded fraction.",
      },
      {
        title: "A smaller integer wraps",
        code: `int value = 130;
byte small = (byte) value;
System.out.println(small);
System.out.println((int) small);`,
        output: `-126
-126`,
        explanation:
          "<code>byte</code> holds −128 to 127. Narrowing from <code>int</code> keeps only its lowest eight bits, so 130 becomes −126. <strong>No overflow exception is raised</strong>.",
      },
      {
        title: "Widening can lose precision",
        code: `int original = 16777217;
float approximate = original;
System.out.println((int) approximate);`,
        output: "16777216",
        explanation:
          "A <code>float</code> cannot represent every <code>int</code> exactly. Widening to a floating-point type may lose precision even without an explicit cast.",
      },
      {
        title: "Huge values and NaN",
        code: `System.out.println((int) 1e20);
System.out.println((int) Double.NEGATIVE_INFINITY);
System.out.println((int) Double.NaN);`,
        output: `2147483647
-2147483648
0`,
        explanation:
          "For conversion from <code>double</code> to <code>int</code>, out-of-range values reach the nearest <code>int</code> bound; <code>NaN</code> becomes zero. This is different from integer-to-integer wrapping and is <strong>not input validation</strong>.",
      },
      {
        title: "Characters are numeric codes",
        code: `System.out.println((int) '7');
System.out.println((char) 65);`,
        output: `55
A`,
        explanation:
          "Casting a <code>char</code> gives its UTF-16 code-unit value, not the numeric meaning of a digit. Casting 65 to <code>char</code> gives <code>A</code>.",
      },
      {
        title: "Conversions a cast cannot do",
        code: `// Neither statement compiles:
// int amount = (int) "42";
// int ready = (int) true;
System.out.println(Integer.parseInt("42"));`,
        output: "42",
        explanation:
          "Text needs parsing, such as <code>Integer.parseInt</code>; malformed text causes <code>NumberFormatException</code>. Java does not cast <code>boolean</code> to or from numeric types.",
      },
    ],
  },
};
