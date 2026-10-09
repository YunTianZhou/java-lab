// Editable course content.
const UNIT_3_BUILD_TARGET = {
  mission: "Generate a square target using its row and column positions.",
  tasks: [
    "Read an odd integer size from <code>5</code> to <code>15</code>. Retry invalid input.",
    "Print exactly size rows of size characters. Use <code>#</code> on the border, <code>+</code> on the middle row/column inside the border, <code>X</code> at the center, and <code>.</code> elsewhere.",
    "The center takes priority; the border takes priority over the crosshairs.",
  ],
  hints: [
    "With zero-based coordinates, the center is <code>size / 2</code>. Decide what each position prints from its row and column.",
  ],
  solutionCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner input = new Scanner(System.in);

    int size;
    while (true) {
      System.out.println("Odd size (5–15):");
      if (!input.hasNextInt()) { input.next(); continue; }
      size = input.nextInt();
      if (size >= 5 && size <= 15 && size % 2 == 1) break;
    }

    int center = size / 2;
    for (int row = 0; row < size; row++) {
      for (int col = 0; col < size; col++) {
        if (row == center && col == center) System.out.print("X");
        else if (row == 0 || col == 0 || row == size - 1 || col == size - 1) System.out.print("#");
        else if (row == center || col == center) System.out.print("+");
        else System.out.print(".");
      }
      System.out.println();
    }
  }
}`,
  sampleOutput: `Size: 5
#####
#.+.#
#+X+#
#.+.#
#####`,
  fields: [],
};
