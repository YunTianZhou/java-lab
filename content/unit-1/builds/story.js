// Editable course content.
const UNIT_1_BUILD_STORY = {
  mission: "Create a sentence from a name, place, plural object name, and starting count.",
  tasks: [
    "Accept multiword text for the name, place, and plural object. The starting count is an integer.",
    "Display the sentence shown in the example, using your inputs and <strong>one more than the starting count</strong>. Keep spaces and punctuation readable.",
  ],
  fields: [
    {
      id: "name",
      label: "Hero name",
      value: "Milo",
    },
    {
      id: "place",
      label: "Place",
      value: "the Moon",
    },
    {
      id: "object",
      label: "Object (plural)",
      value: "dancing potatoes",
    },
    {
      id: "count",
      label: "Starting object count (0–999)",
      value: "3",
    },
  ],
  hints: [
    "Read full lines for the three text values, then read the integer.",
    "Calculate the new count separately or use parentheses before concatenating it with the sentence.",
    "Use <code>nextLine</code> for each text field, including values with spaces.",
    "Parentheses around the count calculation make addition happen before concatenation.",
  ],
  solutionCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner input = new Scanner(System.in);

    System.out.println("Enter name, place, plural object, and count:");
    String name = input.nextLine();
    String place = input.nextLine();
    String object = input.nextLine();
    int count = input.nextInt();

    System.out.println(name + " visited " + place + " with " + (count + 1) + " " + object + ".");
  }
}`,
  inputInstructions: "Enter a name, place, plural object name, and starting count, in that order.",
  sampleInput: `Milo
the Moon
dancing potatoes
3`,
  sampleOutput: "Milo visited the Moon with 4 dancing potatoes.",
};
