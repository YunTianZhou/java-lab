// Editable course content.
const UNIT_1_BUILD_SWAP = {
  mission:
    "Write a program that swaps two item names without losing either original value. Then <code>print</code> the final values.",
  tasks: [
    "The final left item must match the original right item, and the final right item must match the original left item. Display both results.",
  ],
  fields: [
    {
      id: "left",
      label: "Starting left item",
      value: "Red token",
    },
    {
      id: "right",
      label: "Starting right item",
      value: "Blue token",
    },
  ],
  hints: [
    "What original value would be lost if you assigned right to left first?",
    "Use a temporary variable to store that value. Then overwrite left and restore the saved value into right.",
  ],
  try: "",
  solutionCode: `public class Main {
  public static void main(String[] args) {
    String left = "Red token";
    String right = "Blue token";
    String temp = left;
    left = right;
    right = temp;

    System.out.print("Left: ");
    System.out.println(left);
    System.out.print("Right: ");
    System.out.println(right);
  }
}`,
  inputInstructions:
    "Choose two starting item names in your program. Change them and rerun to test the swap.",
  sampleInput: null,
  sampleOutput: `Left: Blue token
Right: Red token`,
  starterCode: `public class Main {
  public static void main(String[] args) {
    String left = "Red token";
    String right = "Blue token";
    // Write the swap and print both values here.
  }
}`,
};
