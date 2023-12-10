export function add(n1: number, n2: number): number {
  return n1 + n2;
}

export function sub(n1: number, n2: number): number {
  return n1 - n2;
}

export function mul(n1: number, n2: number): number {
  return n1 * n2;
}

export function div(n1: number, n2: number): number {
  if (n2 === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return n1 / n2;
}
