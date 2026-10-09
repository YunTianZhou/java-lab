const UNIT_1_STRUCTURE_PARTS = {
  class: {
    code: "public class Main",
    description: "The class is the program’s outer container.",
  },
  main: {
    code: "public static void main(String[] args)",
    description:
      "Java starts running instructions inside this method. Keep the signature exactly as shown for now.",
  },
  braces: {
    code: `{
  // instructions belong here
}`,
    description: "Braces enclose blocks. Every opening brace needs a closing brace.",
  },
  statement: {
    code: 'System.out.println("Hello, world!");',
    description:
      "This instruction prints a message. You need a semicolon at the end of every statement.",
  },
};
const UNIT_1_TYPE_EXAMPLES = {
  byte: {
    code: "byte lives = 3;",
    description: "8-bit integer from −128 to 127.",
  },
  short: {
    code: "short altitude = 1200;",
    description: "16-bit integer from −32,768 to 32,767.",
  },
  int: {
    code: "int score = 42;",
    description: "32-bit integer from −2,147,483,648 to 2,147,483,647. Use it for everyday counts.",
  },
  long: {
    code: "long distance = 9000000000L;",
    description: "64-bit integer. Add L to large integer literals.",
  },
  float: {
    code: "float speed = 3.5f;",
    description: "32-bit floating point. Use f on the literal; decimal values are approximate.",
  },
  double: {
    code: "double battery = 87.5;",
    description:
      "64-bit floating point. The usual choice for decimal measurements; values can be approximate.",
  },
  boolean: {
    code: "boolean ready = true;",
    description: "Only true or false, without quotes.",
  },
  char: {
    code: "char initial = 'R';",
    description: "One character, using single quotes.",
  },
};
