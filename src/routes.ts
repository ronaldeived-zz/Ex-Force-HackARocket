import express from "express";
import { processarRequisicao } from "./app";

const routes = express.Router();

routes.post("/capturar_requisicoes", async (request, response) => {
  console.log("name" in request.body)
  console.log("valia" in request.body)
  console.log(request.body.time)
  //await processarRequisicao(request.body);
});

export default routes;
