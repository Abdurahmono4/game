// N(0 ≤ N ≤ 1018)

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n;

rl.question("Enter the value of N: ", (input) => {
  n = parseInt(input);
  if (Number.isInteger(n) && n >= 0 && n <= 10 ** 18) {
    calculateSeries(n);
  } else {
    console.log(
      "Invalid input. Please enter a positive integer less than or equal to 10^18."
    );
  }
  rl.close();
});
