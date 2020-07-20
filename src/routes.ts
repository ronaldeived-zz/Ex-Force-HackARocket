import express from "express";
import { processarRequisicao } from "./app";
import connection from "./database/connection";

var dbConnection = connection;
const routes = express.Router();

routes.get("/", (request, response) => {
  response.send("OK");
});

routes.post("/capturar_requisicoes", async (request, response) => {
  //processarRequisicao(request.body);
});

export default routes;
