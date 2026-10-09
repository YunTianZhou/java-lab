// Banner copy, Java preview, and palette for each available unit.
const HOME_CONTENT = {
  title: "Learn Java one concept at a time.",
  subtitle: "Explore concepts, test ideas in playgrounds, and write your own programs.",
  units: {
    1: {
      title: "Build your Java foundations",
      description: "Work with output, variables, input, arithmetic, and text.",
      background: "#edf3e3",
      border: "#d5ddc8",
      accent: "#cdf66b",
      file: "Main.java",
      code: `public class Main {
  public static void main(String[] args) {
    String name = "Tim";
    int score = 7;

    System.out.println(name + ": " + score);
  }
}`,
      output: "Tim: 7",
    },
    2: {
      title: "Make decisions with Java",
      description: "Compare values, validate input, and control which code runs.",
      background: "#eee8fa",
      border: "#d5c7ed",
      accent: "#d4bdf3",
      file: "Main.java",
      code: `public class Main {
  public static void main(String[] args) {
    int age = 18;
    String ticket = age < 18 ? "Junior" : "Adult";

    System.out.println(ticket);
  }
}`,
      output: "Adult",
    },
  },
};

HOME_CONTENT.units[3] = {
  title: "Make your programs repeat",
  description: "Explore loops, validate input, and build interactive games.",
  background: "#faeee4", border: "#e8d3c1", accent: "#ffd1a5", file: "Main.java",
  code: `public class Main {
  public static void main(String[] args) {
    for (int n = 3; n >= 1; n--) {
      System.out.println(n);
    }
    System.out.println("Go!");
  }
}`,
  output: "3 → 2 → 1 → Go!"
};
