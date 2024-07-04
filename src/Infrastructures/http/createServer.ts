import { serve } from "@hono/node-server";
import { Hono } from "hono";
import authRoutes from "../../Interfaces/http/api/auth/routes";
require("dotenv").config();

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/auth", authRoutes);

const port = 3000;
console.log(`Server is running on port ${port}`);

export function initServer() {
  serve({
    fetch: app.fetch,
    port,
  });
}
