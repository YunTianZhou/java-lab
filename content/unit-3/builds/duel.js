// Editable course content.
const UNIT_3_BUILD_DUEL = {
  mission:
    "Build one complete charge-and-shield duel against the computer, with an option to replay.",
  tasks: [
    "Both sides start with <strong>3 HP and 0 ammunition</strong>. Each valid turn, both choose an action before either action is resolved.",
    "<code>+</code> charges one ammunition; <code>-</code> fires one; <code>=</code> fires two; <code>|</code> shields a single shot; <code>#</code> shields a double shot.",
    "Shots require enough ammunition and spend it even if blocked. Equal shots cancel; double shot beats single shot. An unblocked shot deals <strong>one damage</strong>. Shields only block their matching shot.",
    "The computer randomly chooses among its legal actions without inspecting the player’s current choice. Charge and both shields are always legal.",
    "Reject unknown or unaffordable actions without changing state or advancing the turn. Accept <code>quit</code> to leave the duel.",
    "Show actions, HP, ammunition, and the winner when HP reaches zero. Ask <code>yes/no</code> to replay; a replay resets everything.",
  ],
  hints: [
    "Validate first, then choose the opponent’s action and update state. Invalid input should never reach those updates.",
    "Separate ammunition cost from damage. A blocked shot still consumes ammunition.",
    "Compare action pairs: equal actions cause no damage; double beats single; each shield blocks only its matching shot.",
    "An outer replay loop can contain the duel loop and input-validation loops. Initialize duel state inside the replay loop.",
  ],
  solutionCode: `import java.util.Scanner;
import java.util.Random;

public class Main {
  public static void main(String[] args) {
    Scanner input = new Scanner(System.in);

    Random random = new Random();
    String replay;
    do {
      int hp = 3, opponentHp = 3;
      int ammo = 0, opponentAmmo = 0, turn = 0;

      while (hp > 0 && opponentHp > 0) {
        System.out.println("HP " + hp + ":" + opponentHp + " | Ammo " + ammo + ":" + opponentAmmo);
        System.out.println("+ charge, - single, = double, | single shield, # double shield, quit");
        String action = input.nextLine();
        if (action.equals("quit")) { System.out.println("Duel ended"); break; }
        if (!action.equals("+") && !action.equals("-") && !action.equals("=")
            && !action.equals("|") && !action.equals("#")) {
          System.out.println("Unknown action");
          continue;
        }
        if ((action.equals("-") && ammo < 1) || (action.equals("=") && ammo < 2)) {
          System.out.println("Not enough ammunition");
          continue;
        }

        String opponent;
        while (true) {
          opponent = switch (random.nextInt(5)) {
            case 0 -> "+";
            case 1 -> "-";
            case 2 -> "=";
            case 3 -> "|";
            default -> "#";
          };
          if (opponent.equals("-") && opponentAmmo < 1) continue;
          if (opponent.equals("=") && opponentAmmo < 2) continue;
          break;
        }

        if (action.equals("+")) ammo++;
        else if (action.equals("-")) ammo--;
        else if (action.equals("=")) ammo -= 2;

        if (opponent.equals("+")) opponentAmmo++;
        else if (opponent.equals("-")) opponentAmmo--;
        else if (opponent.equals("=")) opponentAmmo -= 2;

        if (!action.equals(opponent)) {
          boolean playerHit = (action.equals("-") && !opponent.equals("|") && !opponent.equals("="))
              || (action.equals("=") && !opponent.equals("#"));
          boolean opponentHit = (opponent.equals("-") && !action.equals("|") && !action.equals("="))
              || (opponent.equals("=") && !action.equals("#"));
          if (playerHit) opponentHp--;
          if (opponentHit) hp--;
        }

        turn++;
        System.out.println("Turn " + turn + ": " + action + " / " + opponent);
        // A counted loop draws the two health bars.
        System.out.print("You: ");
        for (int i = 0; i < hp; i++) System.out.print("*");
        System.out.print(" | Computer: ");
        for (int i = 0; i < opponentHp; i++) System.out.print("*");
        System.out.println();
        System.out.println("Ammo " + ammo + ":" + opponentAmmo);
      }

      if (hp == 0) System.out.println("Computer wins");
      else if (opponentHp == 0) System.out.println("You win");

      do {
        System.out.println("Play again? yes/no");
        replay = input.nextLine();
      } while (!replay.equals("yes") && !replay.equals("no"));
    } while (replay.equals("yes"));
  }
}`,
  sampleOutput: `One possible turn:
Turn 1: + / +
HP 3:3 | Ammo 1:1`,
  fields: [],
  extension: {
    title: "Optional extension: smarter opponent",
    text: "Use the ammunition visible at the start of the turn to avoid ineffective defenses. Skip single shield when the player has no ammunition, and double shield when the player has fewer than two rounds. Keep choosing randomly among the remaining legal actions without inspecting the player’s current choice. Try Smart opponent in the playground.",
    hint: "Inside the opponent selection loop, reject shields against shots the player cannot afford. Check the player’s ammunition before applying either action.",
    code: `// Add after the opponent ammunition checks:
if (opponent.equals("|") && ammo < 1) continue;
if (opponent.equals("#") && ammo < 2) continue;`,
  },
};
