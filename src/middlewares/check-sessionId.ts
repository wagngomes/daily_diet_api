import { FastifyReply, FastifyRequest } from "fastify";
import { error } from "node:console";

export async function checkSessionId(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const sessionId = request.cookies.sessionId;

  if (!sessionId) {
    reply.status(401).send({
      error: "Não autorizado",
    });
  }
}
