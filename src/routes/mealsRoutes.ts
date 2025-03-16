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
      name: z.string(),
      description: z.string(),
      Within_diet: z.boolean(),
      date: z.string().date(),
      time: z.string().time(),
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

  app.delete("/meals/:id",{preHandler: [checkSessionId]}, async(request, reply) => {

    const { sessionId } = request.cookies
    const getTheIdParam = z.object({
      id: z.string().uuid(),
    });
    const { id } = getTheIdParam.parse(request.params);

    await knex('meals')
    .where("session_id", sessionId)
    .andWhere("id", id)
    .del()

    return reply.status(204)

  })

  app.patch("/meals/:id",{preHandler: [checkSessionId]}, async(request, reply) => {
    const { sessionId } = request.cookies;

    const getTheIdParam = z.object({
      id: z.string().uuid(),
    });

    const updatedMealsRegister = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      Within_diet: z.boolean().optional(),
      date: z.string().date().optional(),
      time: z.string().time().optional(),
    });
    const { id } = getTheIdParam.parse(request.params);
    
    const data = updatedMealsRegister.parse(request.body) 

    const updated_record = await knex('meals')
    .where("session_id", sessionId)
    .andWhere("id", id)
    .update({...data})

  })
}
