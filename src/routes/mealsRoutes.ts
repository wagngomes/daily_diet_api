import { FastifyInstance } from "fastify";
import { z } from "zod";
import app from "../server";
import { knex } from "../database";
import { randomUUID } from "node:crypto";
import { checkSessionId } from "../middlewares/check-sessionId";

export function mealsRouter(app: FastifyInstance) {
  app.get("/", { preHandler: [checkSessionId] }, () => {
    return "hello world";
  });

  app.post("/meals", async (request, reply) => {
    const createMealsRegister = z.object({
      //id: z.string().uuid(),
      name: z.string(),
      description: z.string(),
      Within_diet: z.boolean(),
      date: z.string().date(),
      time: z.string().time(),
      //created_at: z.string().optional(),
      //session_id: z.string().uuid(),
    });

    const meal = createMealsRegister.parse(request.body);

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();
      reply.cookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30, //30 dias
      });
    }

    await knex("meals").insert({
      id: randomUUID(),
      ...meal,
      session_id: sessionId,
    });
  });

  app.get("/meals", { preHandler: [checkSessionId] }, async (request) => {
    const { sessionId } = request.cookies;

    const allMeals = await knex("meals")
      .where("session_id", sessionId)
      .select("*");

    return { allMeals };
  });

  app.get("/meals/:id", { preHandler: [checkSessionId] }, async (request) => {
    const getTheIdParam = z.object({
      id: z.string().uuid(),
    });
    const { sessionId } = request.cookies;
    const { id } = getTheIdParam.parse(request.params);

    const allMeals = await knex("meals")
      .where("session_id", sessionId)
      .andWhere("id", id)
      .select("*");

    return { allMeals };
  });
}
