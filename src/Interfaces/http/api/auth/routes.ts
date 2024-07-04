import { Hono } from "hono";
import { handlers } from "./controller";

const authRoutes = new Hono();

authRoutes.post("/session", ...handlers);

export default authRoutes;
