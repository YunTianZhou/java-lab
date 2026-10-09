// Editable course content.
const UNIT_1_BUILD_PIZZA = {
  mission: "Calculate the total slices, whole slices per guest, and leftovers for a pizza order.",
  tasks: [
    "Accept the pizza count, slices per pizza, and guest count. Assume valid integers and at least one guest.",
    "Display total slices, the number of whole slices each guest receives, and the number left over.",
  ],
  fields: [
    {
      id: "pizzas",
      label: "Pizzas (0–100)",
      value: "3",
    },
    {
      id: "slices",
      label: "Slices per pizza (1–24)",
      value: "8",
    },
    {
      id: "guests",
      label: "Guests (1–100)",
      value: "5",
    },
  ],
  hints: [
    "Use <code>Scanner</code> to read the three integer inputs.",
    "Find the total by multiplying pizzas by slices per pizza.",
    "Integer division gives the number per guest; the remainder operator gives leftovers.",
  ],
  solutionCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner input = new Scanner(System.in);

    System.out.println("Enter pizzas, slices per pizza, and guests:");
    int pizzas = input.nextInt();
    int slices = input.nextInt();
    int guests = input.nextInt();

    int total = pizzas * slices;
    int each = total / guests;
    int leftover = total % guests;

    System.out.print("Total slices: ");
    System.out.println(total);
    System.out.print("Slices per guest: ");
    System.out.println(each);
    System.out.print("Leftover slices: ");
    System.out.println(leftover);
  }
}`,
  inputInstructions: "Enter pizzas, slices per pizza, and guests in that order.",
  sampleInput: `3
8
5`,
  sampleOutput: `Total slices: 24
Slices per guest: 4
Leftover slices: 4`,
};
