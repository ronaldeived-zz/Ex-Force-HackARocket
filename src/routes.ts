import express from "express";
import { processarRequisicao } from "./app";
import { redisClient } from "./redis/redisClient";

const routes = express.Router();

routes.get("/", (request, response) => {
  response.send("OK");
});

routes.post("/capturar_requisicoes", async (request, response) => {
  //processarRequisicao(request.body);
});

export default routes;
