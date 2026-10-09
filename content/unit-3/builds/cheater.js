// Editable course content.
const UNIT_3_BUILD_CHEATER = {
  mission:
    "Write a rock-paper-scissors opponent that deliberately chooses its move after seeing yours.",
  tasks: [
    "Ask for <code>1–20</code> rounds. Accept lowercase <code>rock</code>, <code>paper</code>, or <code>scissors</code>; invalid moves do not consume a round.",
    "On each valid round, the computer has a <strong>50% chance to win, 25% to draw, and 25% to lose</strong>. These are probabilities, not promised counts in a match.",
    "Display both moves, the result, and cumulative player/computer/draw scores. Show the final scores after the selected number of rounds.",
  ],
  hints: [
    "Four equally likely slots can represent computer win, computer win, draw, and player win.",
    "Once the outcome is chosen, map the player’s move to the computer move that produces it.",
  ],
  solutionCode: `import java.util.Scanner;
import java.util.Random;

public class Main {
  public static void main(String[] args) {
    Scanner input = new Scanner(System.in);

    Random random = new Random();
    int rounds;
    while (true) {
      System.out.println("Rounds (1–20):");
      if (!input.hasNextInt()) { input.next(); continue; }
      rounds = input.nextInt();
      if (rounds >= 1 && rounds <= 20) break;
    }
    input.nextLine();
    int playerWins = 0, computerWins = 0, draws = 0;

    for (int round = 1; round <= rounds; round++) {
      String player;
      do {
        System.out.println("rock / paper / scissors:");
        player = input.nextLine();
      } while (!player.equals("rock") && !player.equals("paper") && !player.equals("scissors"));

      int slot = random.nextInt(4);
      String computer;
      String result;
      if (slot < 2) {
        computer = switch (player) {
          case "rock" -> "paper";
          case "paper" -> "scissors";
          default -> "rock";
        };
        computerWins++;
        result = "Computer wins";
      } else if (slot == 2) {
        computer = player;
        draws++;
        result = "Draw";
      } else {
        computer = switch (player) {
          case "rock" -> "scissors";
          case "paper" -> "rock";
          default -> "paper";
        };
        playerWins++;
        result = "Player wins";
      }

      System.out.println("Round " + round + ": " + player + " / " + computer);
      System.out.println(result);
      System.out.println("Player " + playerWins + " | Computer " + computerWins + " | Draws " + draws);
    }
  }
}`,
  sampleOutput: `One possible round:
Round 1: rock / paper
Computer wins
Player 0 | Computer 1 | Draws 0`,
  fields: [],
};
