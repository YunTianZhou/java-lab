// Editable build requirements, hints, and solution.
const UNIT_2_BUILD_TICKETS = {
  hints: [
    "Check each numeric token with <code>hasNextInt()</code>, then validate its allowed range. <code>return;</code> can end the program after an error.",
    "A switch expression can choose the base price and category name. An if/else-if chain can express the age bands; <code>?:</code> can select the surcharge. These are suggestions, not required implementations.",
    "Whole-dollar integers are sufficient here. One useful calculation is <code>(base - discount + surcharge) * quantity</code>.",
    "Keep the receipt separate from error handling so an invalid booking never produces a partial receipt.",
  ],
  try: "Compare the age boundaries 11/12 and 64/65. Toggle weekend status, increase quantity, and test invalid input.",
  sampleInput: `2
10
3
1`,
  validationNote:
    "Validate the inputs described in the requirements. The playground demonstrates the expected behavior; it does not run your code.",
  mission:
    "Build a ticket kiosk that validates a booking, applies clear pricing rules, and prints a complete receipt.",
  tasks: [
    "Accept category (1 standard, 2 premium, 3 IMAX), age (0–120), quantity (1–10), and weekend status (0 no, 1 yes). Invalid input produces <code>Invalid booking</code> and no receipt.",
    "Base prices per ticket: <strong>standard $10, premium $15, IMAX $20</strong>.",
    "Per-ticket age discounts: <strong>under 12: $3 off; age 65 or above: $2 off; otherwise: no discount</strong>. The entered age applies to every ticket in the booking.",
    "Weekend bookings add $2 per ticket. The booking total must include the correct discounts and surcharges for its quantity.",
    "Print a receipt showing category, age, quantity, base price, discount, surcharge, final price per ticket, and booking total.",
  ],
  fields: [
    {
      id: "category",
      label: "Category (1 standard, 2 premium, 3 IMAX)",
      value: "2",
    },
    {
      id: "age",
      label: "Age for this booking",
      value: "10",
    },
    {
      id: "quantity",
      label: "Number of tickets",
      value: "3",
    },
    {
      id: "weekend",
      label: "Weekend? (0 no, 1 yes)",
      value: "1",
    },
  ],
  inputInstructions:
    "Enter four integer tokens in the specified order. Use Java 17 or later. In a terminal, token checks wait for entered data or end-of-input; pressing Enter alone does not supply a missing token.",
  sampleOutput: `=== TICKET RECEIPT ===
Category: Premium
Age: 10
Quantity: 3
Base per ticket: $15
Discount per ticket: $3
Weekend surcharge: $2
Price per ticket: $14
Total: $42`,
  checklist: [
    "Age 11 receives $3 off; age 12 receives no age discount.",
    "Age 64 receives no age discount; age 65 receives $2 off.",
    "Premium, age 10, three tickets, weekend: total $42.",
    "A weekday standard adult ticket costs $10.",
    "Reject category 4, age −1, quantity 0 or 11, weekend 2, and non-integer input.",
  ],
  extension:
    "Optional extension: give a $5 discount on the booking subtotal when it contains at least five tickets. Show this separately on the receipt; do not subtract it from every ticket.",
  solutionCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner input = new Scanner(System.in);

    if (!input.hasNextInt()) { System.out.println("Invalid booking"); return; }
    int category = input.nextInt();

    if (!input.hasNextInt()) { System.out.println("Invalid booking"); return; }
    int age = input.nextInt();

    if (!input.hasNextInt()) { System.out.println("Invalid booking"); return; }
    int quantity = input.nextInt();

    if (!input.hasNextInt()) { System.out.println("Invalid booking"); return; }
    int weekend = input.nextInt();

    if (category < 1 || category > 3 || age < 0 || age > 120
        || quantity < 1 || quantity > 10 || weekend < 0 || weekend > 1) {
      System.out.println("Invalid booking"); return;
    }
    int base = switch (category) {
      case 1 -> 10;
      case 2 -> 15;
      case 3 -> 20;
      default -> 0;
    };
    String name = switch (category) {
      case 1 -> "Standard";
      case 2 -> "Premium";
      case 3 -> "IMAX";
      default -> "Invalid";
    };
    int discount;

    if (age < 12) discount = 3;
    else if (age >= 65) discount = 2;
    else discount = 0;
    int surcharge = weekend == 1 ? 2 : 0;
    int price = base - discount + surcharge;
    int total = price * quantity;

    System.out.println("=== TICKET RECEIPT ===");
    System.out.println("Category: " + name);
    System.out.println("Age: " + age);
    System.out.println("Quantity: " + quantity);
    System.out.println("Base per ticket: $" + base);
    System.out.println("Discount per ticket: $" + discount);
    System.out.println("Weekend surcharge: $" + surcharge);
    System.out.println("Price per ticket: $" + price);
    System.out.println("Total: $" + total);
  }
}`,
};
