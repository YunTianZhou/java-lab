// Editable build requirements, hints, and solution.
const UNIT_2_BUILD_BOARD = {
  hints: [
    "Integer division and remainder can recover each row’s digits, including leading zero cells. The optional snippet shows one approach.",
    "With 1 for X and 0 for O, the sum of three cells is 3 for an X line or 0 for an O line. This avoids lenthy separate checks and logic combinations.",
    "A column uses one cell from each row. The diagonals both include the center.",
    "Named booleans can organize the eight line checks. Combine them with <code>||</code> if that suits your solution.",
  ],
  try: "Click cells to switch X and O. Compare a row win, a diagonal win, and the tie board 101 / 100 / 011.",
  sampleInput: `111
001
010`,
  validationNote:
    "Your program may assume a valid full board with at most one winning side. The playground rejects malformed rows and boards with both winners.",
  mission:
    "Determine the winner of a completed tic-tac-toe board, using <code>1 = X</code> and <code>0 = O</code>.",
  tasks: [
    "Accept three rows of three binary digits. Assume valid full boards with at most one winning side.",
    "Three matching cells across any row, column, or diagonal form a winning line.",
    "Display <code>X wins</code>, <code>O wins</code>, or <code>Tie</code> when neither side has a winning line.",
  ],
  fields: [
    {
      id: "row1",
      label: "Top row (1 = X, 0 = O)",
      value: "111",
    },
    {
      id: "row2",
      label: "Middle row",
      value: "001",
    },
    {
      id: "row3",
      label: "Bottom row",
      value: "010",
    },
  ],
  inputInstructions:
    "Enter one row per line. A row such as 010 still represents O–X–O if it is stored numerically as 10. You do not need to verify the history of moves.",
  sampleOutput: "X wins",
  starterDescription:
    "One optional way to read a row and extract its cells.",
  starterCode: `int row = input.nextInt();
int first = row / 100;
int second = row / 10 % 10;
int third = row % 10;`,
  solutionCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner input = new Scanner(System.in);
    int row1 = input.nextInt();
    int row2 = input.nextInt();
    int row3 = input.nextInt();

    int c0 = row1 / 100;
    int c1 = row1 / 10 % 10;
    int c2 = row1 % 10;
    int c3 = row2 / 100;
    int c4 = row2 / 10 % 10;
    int c5 = row2 % 10;
    int c6 = row3 / 100;
    int c7 = row3 / 10 % 10;
    int c8 = row3 % 10;

    boolean xWins =
      (c0 + c1 + c2 == 3) ||
      (c3 + c4 + c5 == 3) ||
      (c6 + c7 + c8 == 3) ||
      (c0 + c3 + c6 == 3) ||
      (c1 + c4 + c7 == 3) ||
      (c2 + c5 + c8 == 3) ||
      (c0 + c4 + c8 == 3) ||
      (c2 + c4 + c6 == 3);

    boolean oWins =
      (c0 + c1 + c2 == 0) ||
      (c3 + c4 + c5 == 0) ||
      (c6 + c7 + c8 == 0) ||
      (c0 + c3 + c6 == 0) ||
      (c1 + c4 + c7 == 0) ||
      (c2 + c5 + c8 == 0) ||
      (c0 + c4 + c8 == 0) ||
      (c2 + c4 + c6 == 0);

    if (xWins) {
      System.out.println("X wins");
    } else if (oWins) {
      System.out.println("O wins");
    } else {
      System.out.println("Tie");
    }
  }
}`,
};
