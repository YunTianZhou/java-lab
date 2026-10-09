// Editable build requirements, hints, and solution.
const UNIT_1_BUILD_MONEY = {
  mission:
    "Convert a customer’s requested amount into bills and coins, and report how the change adds up.",
  tasks: [
    "Accept a full customer name and an amount from $0 to $9999.99 with at most two decimal places. Assume valid input.",
    "Use only <strong>$100, $50, $10, $5, and $1 bills</strong> and <strong>25, 10, 5, and 1 cent coins</strong>. Give exact change with the fewest pieces.",
    "Report the name, requested amount, total cents, every denomination count including zeros, bill count, coin count, and total pieces.",
    "Report the reconstructed value in cents and whether it matches the requested total. <strong>No cents may be lost</strong>.",
  ],
  fields: [
    {
      id: "name",
      label: "Customer name",
      value: "Tim",
    },
    {
      id: "amount",
      label: "Amount in dollars (0–9999.99)",
      value: "186.41",
    },
  ],
  inputInstructions:
    "Enter a name, then a <strong>nonnegative amount with at most two decimal places</strong>, on separate lines. Use a decimal point. Assume valid console input for this unit. The playground checks input before demonstrating the result. These denominations are chosen for the exercise; there is no $20 bill or $2 coin.",
  sampleInput: `Tim
186.41`,
  sampleOutput: `=== CHANGE REPORT ===
Customer: Tim
Requested: $186.41
Total cents: 18641
$100 bills: 1
$50 bills: 1
$10 bills: 3
$5 bills: 1
$1 bills: 1
25-cent coins: 1
10-cent coins: 1
5-cent coins: 1
1-cent coins: 1
Bills: 7, coins: 4
Total pieces: 11
Reconstructed cents: 18641
Balanced: true`,
  solutionCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner input = new Scanner(System.in);

    System.out.println("Enter customer name:");
    String name = input.nextLine();

    System.out.println("Enter amount (0 to 9999.99):");
    double amount = input.nextDouble();

    char currency = '$';

    int cents = (int) Math.round(amount * 100);
    int remaining = cents;

    int hundreds = remaining / 10000;
    remaining = remaining % 10000;
    int fifties = remaining / 5000;
    remaining = remaining % 5000;
    int tens = remaining / 1000;
    remaining = remaining % 1000;
    int fives = remaining / 500;
    remaining = remaining % 500;
    int ones = remaining / 100;
    remaining = remaining % 100;

    int quarters = remaining / 25;
    remaining = remaining % 25;
    int dimes = remaining / 10;
    remaining = remaining % 10;
    int nickels = remaining / 5;
    remaining = remaining % 5;
    int pennies = remaining;

    int billCount = hundreds + fifties + tens + fives + ones;
    int coinCount = quarters + dimes + nickels + pennies;
    int reconstructed = hundreds * 10000 + fifties * 5000
        + tens * 1000 + fives * 500 + ones * 100
        + quarters * 25 + dimes * 10 + nickels * 5 + pennies;

    boolean balanced = reconstructed == cents;

    System.out.println("=== CHANGE REPORT ===");
    System.out.println("Customer: " + name);
    System.out.println("Requested: " + currency + amount);
    System.out.println("Total cents: " + cents);
    System.out.println("$100 bills: " + hundreds);
    System.out.println("$50 bills: " + fifties);
    System.out.println("$10 bills: " + tens);
    System.out.println("$5 bills: " + fives);
    System.out.println("$1 bills: " + ones);
    System.out.println("25-cent coins: " + quarters);
    System.out.println("10-cent coins: " + dimes);
    System.out.println("5-cent coins: " + nickels);
    System.out.println("1-cent coins: " + pennies);
    System.out.println("Bills: " + billCount + ", coins: " + coinCount);
    System.out.println("Total pieces: " + (billCount + coinCount));
    System.out.println("Reconstructed cents: " + reconstructed);
    System.out.println("Balanced: " + balanced);
  }
}`,
  conceptNotes: [
    {
      title: "Convert a double to whole cents",
      text: "Binary floating-point values are approximate. Multiplying by 100 can leave a value just below an integer; <strong>casting alone can drop a cent</strong>. <code>Math.round</code> rounds to the nearest integer and returns a <code>long</code> here. Cast the rounded value to <code>int</code>; the exercise limit keeps it safely within range.",
      code: "int cents = (int) Math.round(amount * 100);",
    },
    {
      title: "Keep the original total",
      text: "Reassign a separate <code>remaining</code> variable after each denomination. <strong>Do not overwrite the original cent total</strong>, because you need it for verification.",
    },
    {
      title: "Check equality without a condition",
      text: "The <code>==</code> operator compares two values and produces a <code>boolean</code>. It differs from <code>=</code>, which assigns a value. Store and print the comparison result; <strong>no if statement is needed</strong>.",
      code: "boolean same = firstTotal == secondTotal;",
    },
  ],
  hints: [
    "Convert the decimal amount to whole cents once. Keep the original total separately from the amount still to distribute.",
    "Try the largest denomination first. Integer division gives its count; remainder gives the amount still unallocated.",
    "Reconstruct the value by adding count × denomination for all bills and coins. Compare it with the original total.",
  ],
  try: "Compare 0.00, 0.41, 50.00, 186.41, and 9999.99. Try 0.29 to investigate floating-point conversion. Test a multiword customer name. The playground rejects negative amounts, text, and more than two decimal places.",
  checklist: [
    "0.00 produces zero of every bill and coin.",
    "50.00 produces one $50 bill and no coins.",
    "186.41 produces 7 bills and 4 coins.",
    "Every valid run reports Balanced: true.",
  ],
  extension:
    "Optional extension: add a $20 bill. Update the distribution, printed counts, total-piece count, and reconstruction check. Compare how many pieces the same amount requires.",
};
