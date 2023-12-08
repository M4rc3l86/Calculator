import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

const app = new Elysia().use(cors());

app.get("/", () => "Hello Elysia");

app.post("/calculate", ({ body, set }) => {
  console.log("Body", body);
  console.log("Set", set);
});

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
