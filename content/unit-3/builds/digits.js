// Editable course content.
const UNIT_3_BUILD_DIGITS = {
  mission: "Read a positive integer and reveal the structure of its digits.",
  tasks: [
    "Accept an integer from <code>1</code> to <code>2147483647</code>; keep asking after invalid input.",
    "Display the digit count, digit sum, numeric reverse, and whether the original is a palindrome. A palindrome is a positive integer that <strong>strictly equals to its numeric reverse</strong>.",
    "Use <strong>integer operations</strong> to extract the digits rather than converting the number to a String. Leading zeros in the reversed number disappear.",
  ],
  hints: [
    "The last digit is <code>n % 10</code>. Integer division by 10 removes that digit.",
	"Extract each digit from right to left by repeatedly reading and removing the last digit. Make a copy of the original integer to preserve it.",
    "Use <code>long</code> for the reverse: reversing a valid int can exceed the int range.",
  ],
  solutionCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner input = new Scanner(System.in);

    int original;
    while (true) {
      System.out.println("Positive integer:");
      if (!input.hasNextInt()) {
        input.next();
        System.out.println("Enter a valid int");
        continue;
      }
      original = input.nextInt();
      if (original > 0) break;
      System.out.println("Must be positive");
    }

    int remaining = original, count = 0, sum = 0;
    long reversed = 0;
    while (remaining > 0) {
      int digit = remaining % 10;
      count++;
      sum += digit;
      reversed = reversed * 10 + digit;
      remaining /= 10;
    }

    System.out.println("Digits: " + count);
    System.out.println("Sum: " + sum);
    System.out.println("Reverse: " + reversed);
    System.out.println("Palindrome: " + (original == reversed));
  }
}`,
  sampleOutput: `Digits: 4
Sum: 3
Reverse: 21
Palindrome: false`,
  fields: [
    {
      id: "number",
      label: "Positive integer",
      value: "1200",
    },
  ],
};
