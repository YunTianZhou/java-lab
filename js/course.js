// Pure playground calculations and validation. Instructional text lives in content/unit-1/.
const javaString = (value) =>
  '"' +
  String(value)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t") +
  '"';
function textValue(value, label, max = 60) {
  if (!String(value).trim()) throw Error(label + " cannot be empty. Try a name or a short phrase.");
  if (String(value).length > max) throw Error(label + " must be " + max + " characters or fewer.");
  return String(value);
}
function numberValue(value, label, { integer = false, min = 0, max = 10000 } = {}) {
  const str = String(value).trim();
  if (!str || !(integer ? /^[+-]?\d+$/ : /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/).test(str))
    throw Error(label + " needs " + (integer ? "a whole number" : "a number") + ".");
  const n = Number(str);
  if (!Number.isFinite(n) || n < min || n > max)
    throw Error(label + " must be between " + min + " and " + max + ".");
  return n;
}

const courseContent = {1: UNIT_1_CONTENT, 2: UNIT_2_CONTENT, 3: UNIT_3_CONTENT};
let activeUnit = 1;
const unitTitles = { 1: "The fundamentals", 2: "Making decisions", 3: "On repeat" };
let steps = UNIT_1_CONTENT.steps;
let lessons = UNIT_1_CONTENT.lessons;
let quizzes = UNIT_1_CONTENT.quizzes;
const buildBehavior = {
  intro: {
    run: (v) =>
      `Name: ${textValue(v.name, "Name")}\nHobby: ${textValue(v.hobby, "Hobby")}\n${textValue(v.signature, "Signature")}`,
  },
  swap: {
    run: (v) =>
      `Left: ${textValue(v.right, "Right item")}\nRight: ${textValue(v.left, "Left item")}`,
  },
  robot: {
    run: (v) => {
      const items = numberValue(v.items, "Item count", { integer: true, max: 100 });
      const battery = numberValue(v.battery, "Battery", { max: 100 });
      if (!["true", "false"].includes(v.ready)) throw Error("Ready must be true or false.");
      if (v.team.length !== 1 || /[\r\n\t]/.test(v.team))
        throw Error("Team initial needs one ordinary character, such as R.");
      return `${items}\n${battery}\n${v.ready}\n${v.team}`;
    },
  },
  spaceport: {
    run: (v) =>
      `=== BOARDING PASS ===\n${textValue(v.name, "Traveler name")}\n${numberValue(v.age, "Age", { integer: true, max: 130 })}\n${numberValue(v.weight, "Luggage weight", { max: 100 })}`,
  },
  pizza: {
    run: (v) => {
      const p = numberValue(v.pizzas, "Pizzas", { integer: true, max: 100 }),
        s = numberValue(v.slices, "Slices per pizza", { integer: true, min: 1, max: 24 }),
        g = numberValue(v.guests, "Guests", { integer: true, min: 1, max: 100 });
      return `Total slices: ${p * s}\nSlices per guest: ${Math.trunc((p * s) / g)}\nLeftover slices: ${(p * s) % g}`;
    },
  },
  story: {
    run: (v) =>
      `${textValue(v.name, "Hero name")} visited ${textValue(v.place, "Place")} with ${numberValue(v.count, "Object count", { integer: true, max: 999 }) + 1} ${textValue(v.object, "Object")}.`,
  },
  money: { run: moneyChangeReport },
};
let builds = Object.fromEntries(
  Object.entries(UNIT_1_CONTENT.builds).map(([key, content]) => [
    key,
    { ...content, ...buildBehavior[key] },
  ]),
);
function evaluateBuild(key, values) {
  const b = builds[key];
  if (!b) throw Error("Unknown build");
  return b.run(values);
}

function moneyChangeReport(v) {
  const name = textValue(v.name, "Customer name");
  const amount = numberValue(v.amount, "Amount", { min: 0, max: 9999.99 });
  if (!/^\d+(?:\.\d{1,2})?$/.test(String(v.amount).trim()))
    throw Error("Enter dollars with at most two decimal places, such as 186.41.");
  const cents = Math.round(amount * 100);
  let remaining = cents;
  const denominations = [10000, 5000, 1000, 500, 100, 25, 10, 5, 1];
  const labels = [
    "$100 bills",
    "$50 bills",
    "$10 bills",
    "$5 bills",
    "$1 bills",
    "25-cent coins",
    "10-cent coins",
    "5-cent coins",
    "1-cent coins",
  ];
  const counts = denominations.map((d) => {
    const n = Math.trunc(remaining / d);
    remaining %= d;
    return n;
  });
  const bills = counts.slice(0, 5).reduce((a, b) => a + b, 0),
    coins = counts.slice(5).reduce((a, b) => a + b, 0);
  const reconstructed = counts.reduce((total, n, i) => total + n * denominations[i], 0);
  return [
    "=== CHANGE REPORT ===",
    "Customer: " + name,
    "Requested: $" + (Number.isInteger(amount) ? amount.toFixed(1) : amount),
    "Total cents: " + cents,
    ...labels.map((label, i) => label + ": " + counts[i]),
    "Bills: " + bills + ", coins: " + coins,
    "Total pieces: " + (bills + coins),
    "Reconstructed cents: " + reconstructed,
    "Balanced: " + (reconstructed === cents),
  ].join("\n");
}

function selectCourse(unit) {
  activeUnit = unit;
  const content = courseContent[unit];
  steps = content.steps;
  lessons = content.lessons;
  quizzes = content.quizzes;
  const behavior = unit === 3 ? {} : unit === 2 ? unit2BuildBehavior : buildBehavior;
  builds = Object.fromEntries(
    Object.entries(content.builds).map(([key, value]) => [key, { ...value, ...behavior[key] }]),
  );
}
function lessonHref(index, unit = activeUnit) {
  return unit === 1 ? "#lesson/" + index : "#unit/" + unit + "/lesson/" + index;
}
