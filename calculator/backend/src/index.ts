// Main server setup and endpoint definition

import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { add, sub, mul, div } from "./arithmeticOperations";

// Define types for calculation
interface Calculation {
  first: number;
  second: number;
  operand: string;
}

type Operand = "+" | "-" | "*" | "/";

// Map operands to their corresponding functions
const operations: Record<Operand, (n1: number, n2: number) => number> = {
  "+": add,
  "-": sub,
  "*": mul,
  "/": div,
};

// Function to perform calculation based on the operand
function performCalculation(
  operand: Operand,
  first: number,
  second: number
): number {
  const operation = operations[operand];
  return operation(first, second);
}

// Initialize the server and define routes
const app = new Elysia().use(cors());

app.post("/calculate", ({ body }) => {
  const { operand, first, second } = body as Calculation;
  try {
    const result = performCalculation(operand as Operand, first, second);
    return result;
  } catch (error) {
    return { error: error.message };
  }
});

// Start the server
app.listen(3000, () => console.log("Server running on port 3000"));
