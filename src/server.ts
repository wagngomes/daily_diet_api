import fastify from "fastify";
import { mealsRouter } from "./routes/mealsRoutes";
import cookie from "@fastify/cookie";

const app = fastify();
app.register(cookie);
app.register(mealsRouter);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("servidor no ar");
  });

export default app;
