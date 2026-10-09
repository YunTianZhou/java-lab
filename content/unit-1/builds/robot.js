// Editable course content.
const UNIT_1_BUILD_ROBOT = {
  mission:
    "Write a program that stores and prints a robot’s inventory count, battery reading, ready status, and team letter.",
  tasks: [
    "Use variables to represent an item count, decimal battery percentage, ready status, and single team letter.",
    "Display those four values in that order. Choose your own values and try a second set.",
  ],
  fields: [
    {
      id: "items",
      label: "Item count (0–100)",
      value: "5",
    },
    {
      id: "battery",
      label: "Battery percent (0–100)",
      value: "87.5",
    },
    {
      id: "ready",
      label: "Ready state",
      value: "true",
      options: ["true", "false"],
    },
    {
      id: "team",
      label: "Team initial",
      value: "R",
    },
  ],
  hints: [
    "The natural types here are <code>int</code>, <code>double</code>, <code>boolean</code>, and <code>char</code>.",
    "Match each value to its category: whole number, decimal, true/false, or character.",
  ],
  solutionCode: `public class Main {
  public static void main(String[] args) {
    int items = 5;
    double battery = 87.5;

    boolean ready = true;
    char team = 'R';

    System.out.println(items);
    System.out.println(battery);
    System.out.println(ready);
    System.out.println(team);
  }
}`,
  inputInstructions: "Set the initial values in your program; keyboard input is introduced later.",
  sampleInput: null,
  sampleOutput: `5
87.5
true
R`,
};
