// Function To Solve A Quadratic Equation
function Quadratic(a, b, c) {
  const DISCRIMINANT = b ** 2 - 4 * a * c;

  // Check for real roots
  if (DISCRIMINANT < 0) {
    return { root1: null, root2: null }; // No real roots
  }

  let root1 = (-b + Math.sqrt(DISCRIMINANT)) / (2 * a);
  let root2 = (-b - Math.sqrt(DISCRIMINANT)) / (2 * a);

  return { root1, root2 };
}

let result = Quadratic(1, -3, 2);
console.log(result); // -> root1 is 2, root2 is 1
