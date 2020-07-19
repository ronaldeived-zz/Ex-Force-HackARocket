import express from "express";
import { redisClient } from "./redis/redisClient";
import connection from "./database/connection";
import { empresa } from "./models/empresa.model";

var dbConnection = connection;

const dados: empresa = {
  descricao: "Pastelaria",
  numero: "5515997332831",
  cep: "18195000",
  nome: "Ex-Force Pasteis",
};

dbConnection
  .insert(dados)
  .into("empresas")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

const routes = express.Router();

const redis = new redisClient();

routes.get("/", (request, response) => {
  return response.send("Home");
});

routes.get("/redis-set", (request, response) => {
  console.log("\nCache command: SET Message with EXPIRE seconds");
  redis.set("Message", "Salvo");

  return response.send("REDIS SET");
});

routes.get("/redis-get", (request, response) => {
  console.log("\nCache command: GET Message");
  redis.get("Message");

  return response.send("REDIS GET");
});

export default routes;
