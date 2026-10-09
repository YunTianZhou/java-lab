// Editable course content.
const UNIT_1_BUILD_INTRO = {
  mission: "Display your name, hobby, and an ASCII signature on <strong>three separate lines</strong>. Choose your own text and layout.",
  tasks: [],
  fields: [
    {
      id: "name",
      label: "Name",
      value: "Tim",
    },
    {
      id: "hobby",
      label: "Hobby",
      value: "drawing robots",
    },
    {
      id: "signature",
      label: "ASCII signature",
      value: "[o_o]",
    },
  ],
  hints: [
    "Put your statements inside a <code>Main</code> class and its <code>main</code> method.",
    "<code>println</code> starts a new line after printing; <code>print</code> does not.",
    "Put literal text in double quotes and end each statement with a semicolon.",
  ],
  try: "",
  solutionCode: `public class Main {
  public static void main(String[] args) {
    System.out.println("Name: Tim");
    System.out.println("Hobby: drawing robots");
    System.out.println("[o_o]");
  }
}`,
  inputInstructions: "",
  sampleInput: null,
  sampleOutput: `Name: Tim
Hobby: drawing robots
[o_o]`,
  printOnly: true,
};
