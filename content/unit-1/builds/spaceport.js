// Editable course content.
const UNIT_1_BUILD_SPACEPORT = {
  mission:
    "Read a traveler’s full name, age, and luggage weight. Print each value on its own line to make a boarding pass.",
  tasks: [
    "Accept a traveler’s full name, integer age, and decimal luggage weight. Names may contain spaces.",
    "Display the boarding-pass heading followed by each entered value on its own line.",
  ],
  fields: [
    {
      id: "name",
      label: "Traveler name",
      value: "Tim Zhou",
    },
    {
      id: "age",
      label: "Age (0–130)",
      value: "24",
    },
    {
      id: "weight",
      label: "Luggage kg (0–100)",
      value: "12.5",
    },
  ],
  hints: [
    "Read the full name with <code>nextLine</code> so spaces are preserved.",
    "Read age with <code>nextInt</code> and luggage with <code>nextDouble</code>. Reading the name first avoids the numeric-input newline issue.",
  ],
  solutionCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner input = new Scanner(System.in);

    System.out.println("Enter name, age, and luggage kg:");
    String name = input.nextLine();
    int age = input.nextInt();
    double luggage = input.nextDouble();

    System.out.println("=== BOARDING PASS ===");
    System.out.println(name);
    System.out.println(age);
    System.out.println(luggage);
  }
}`,
  inputInstructions:
    "Enter the full name, age, and luggage weight in that order. Use a decimal point for weight. Assume valid input.",
  sampleInput: `Tim Zhou
24
12.5`,
  sampleOutput: `=== BOARDING PASS ===
Tim Zhou
24
12.5`,
};
