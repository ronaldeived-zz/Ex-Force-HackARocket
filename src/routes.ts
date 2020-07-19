import express from "express";
import { processarRequisicao } from "./app";

const routes = express.Router();

routes.post("/capturar_requisicoes", (request, response) => {
  processarRequisicao(request);
});

export default routes;
