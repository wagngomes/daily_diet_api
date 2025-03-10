import fastify from "fastify";
import { mealsRouter } from "./routes/mealsRoutes";

const app = fastify();
app.register(mealsRouter);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("servidor no ar");
  });

export default app;
