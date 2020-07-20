import express from "express";
import { processarRequisicao } from "./app";
import { redisClient } from "./redis/redisClient";

const routes = express.Router();

const redis = new redisClient();
redis.set("abobora", 6);
const a = redis.get("abobora");
a.then((valor) => {
  console.log(valor);
}).catch((err) => {
  console.error(err);
});

routes.get("/", (request, response) => {
  response.send("OK");
});

routes.post("/capturar_requisicoes", async (request, response) => {
  //processarRequisicao(request.body);
});

export default routes;
