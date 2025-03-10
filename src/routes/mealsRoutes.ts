import { FastifyInstance, request, reply } from "fastify";
import { z } from "zod";
import app from "../server";

export function mealsRouter(app: FastifyInstance) {
  app.get("/", () => {
    return "hello world";
  });

  app.post("/meals", async (request, reply) => {
    const createMealsRegister = z.object({
      name: z.string(),
      description: z.string(),
    });
  });
}
