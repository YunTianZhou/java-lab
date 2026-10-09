// Editable course content.
const UNIT_3_BUILD_GUESS = {
  mission: "Think of an integer from 1 to 100. Write a program that asks questions to discover it.",
  tasks: [
    "After each guess, accept <code>high</code> (the guess is too high), <code>low</code> (too low), or <code>correct</code>. Retry unknown replies without counting another guess.",
    "Find any honestly reported number in <strong>at most seven guesses</strong>. Display the number of guesses when successful.",
    "Detect contradictory feedback when no number could fit all the replies. Consistent lies cannot always be detected.",
  ],
  hints: [
    "Track the smallest and largest possible numbers. A guess near the middle removes roughly half of the possibilities.",
    "After high or low, update the bounds base on this new information. If the lower bound exceeds the upper bound, the replies contradict each other.",
  ],
  solutionCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner input = new Scanner(System.in);

    int low = 1, high = 100, guesses = 0;

    while (low <= high) {
      int guess = low + (high - low) / 2;
      guesses++;
	  
      System.out.println("Guess " + guesses + ": " + guess);
      String reply;

      while (true) {
        System.out.println("high / low / correct:");
        reply = input.nextLine();
        if (reply.equals("high") || reply.equals("low") || reply.equals("correct")) break;
        System.out.println("Unknown reply");
      }

      if (reply.equals("correct")) {
        System.out.println("Found in " + guesses + " guesses");
        break;
      }
      if (reply.equals("high")) high = guess - 1;
      else low = guess + 1;
    }

    if (low > high) System.out.println("Contradictory feedback");
  }
}`,
  sampleOutput: `Guess 1: 50
Reply: correct
Found in 1 guesses`,
  fields: [],
};
