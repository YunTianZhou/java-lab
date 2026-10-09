// Editable course content.
const UNIT_2_BUILD_RPS = {
  hints: [
    "Use <code>.equals()</code> to compare the contents of the entered words.",
    "Check whether each word is one of the three allowed choices. Nest the result logic inside the valid-input branch.",
    "Check a draw before checking wins, this reduces the number of checks. Player 1 wins with rock/scissors, paper/rock, or scissors/paper.",
    "After excluding a draw and Player 1’s winning cases, the remaining valid pairings belong to Player 2.",
  ],
  try: "Try all three draws, swap the two players, then enter an invalid word such as stone.",
  sampleInput: `rock
scissors`,
  validationNote:
    "Validate the inputs described in the requirements. The playground demonstrates the expected behavior; it does not run your code.",
  mission:
    "Read both players’ choices and determine the result of one round of rock, paper, scissors.",
  tasks: [
    "Accept one lowercase choice from each player: <code>rock</code>, <code>paper</code>, or <code>scissors</code>. An unsupported choice produces <code>Invalid choice</code>.",
    "Rock beats scissors, scissors beats paper, and paper beats rock. Equal choices produce a draw.",
    "Display <code>Player 1 wins</code>, <code>Player 2 wins</code>, or <code>Draw</code> for a valid round.",
  ],
  fields: [
    {
      id: "p1",
      label: "Player 1",
      value: "rock",
    },
    {
      id: "p2",
      label: "Player 2",
      value: "scissors",
    },
  ],
  inputInstructions:
    "Enter each player’s lowercase choice on its own line. In the playground, blanks are invalid. In an interactive terminal, a Scanner token read waits for a token or the end of input.",
  sampleOutput: "Player 1 wins",
  solutionCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner input = new Scanner(System.in);

    if (!input.hasNext()) { System.out.println("Invalid choice"); return; }
    String p1 = input.next();

    if (!input.hasNext()) { System.out.println("Invalid choice"); return; }
    String p2 = input.next();

    boolean valid1 = p1.equals("rock") || p1.equals("paper") || p1.equals("scissors");
    boolean valid2 = p2.equals("rock") || p2.equals("paper") || p2.equals("scissors");

    if (valid1 && valid2) {
      if (p1.equals(p2)) {
        System.out.println("Draw");
      } else if ((p1.equals("rock") && p2.equals("scissors"))
          || (p1.equals("paper") && p2.equals("rock"))
          || (p1.equals("scissors") && p2.equals("paper"))) {
        System.out.println("Player 1 wins");
      } else {
        System.out.println("Player 2 wins");
      }
    } else {
      System.out.println("Invalid choice");
    }
  }
}`,
};
