import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";

interface Calculation {
  first: number;
  second: number;
  operand: string;
}

const app = new Elysia().use(cors());

app.get("/", () => "Hello Elysia");

app.post("/calculate", ({ body }) => {
  const { operand, first, second } = body as Calculation;
  console.log(body);
  const result = performCalculation(operand, first, second);
  return result;
});

app.listen(3000);

function performCalculation(operand: string, first: number, second: number) {
  console.log(operand, first, second);
  switch (operand) {
    case "+":
      return add(first, second);
    case "-":
      return sub(first, second);
    case "*":
      return mul(first, second);
    case "/":
      return div(first, second);
    default:
      return 0;
  }
}

function add(n1: number, n2: number): number {
  return n1 + n2;
}

function sub(n1: number, n2: number): number {
  return n1 - n2;
}

function mul(n1: number, n2: number): number {
  return n1 * n2;
}

function div(n1: number, n2: number): number {
  if (n2 !== 0) {
    return n1 / n2;
  } else {
    return 0;
  }
}

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
