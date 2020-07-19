import { mensagemContato } from "./models/contato.model";
import { mensagemTexto } from "./models/mensagem.model";
import { redisClient } from "./redis/redisClient";
import { empresa } from "./models/empresa.model";
import connection from "./database/connection";

var request = require("request");

const redis = new redisClient();
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

const contatoExemplo: mensagemContato = {
  from: "tall-leader",
  to: "5515997332834",
  contents: [
    {
      type: "contacts",
      contacts: [
        {
          name: {
            firstName: "Nome da Empresa",
            formattedName: "Nome da Empresa",
          },
          phones: [
            {
              phone: "5515997332834 (numero da empresa)",
              type: "CELL",
              waId: "5515997332834 (numero da empresa)",
            },
          ],
        },
      ],
    },
  ],
};

const textoExemplo: mensagemTexto = {
  from: "tall-leader",
  to: "5515997332834",
  contents: [
    {
      type: "text",
      texto: "Texto da mensagem",
    },
  ],
};

export function processarRequisicao(requisicao: any) {}

function enviaMensagem(mensagem: mensagemContato | mensagemTexto) {
  request(
    "https://api.zenvia.com/v1/channels/whatsapp/messages",
    (error: any, response: any, body: any) => {
      console.log("error:", error); // Print the error if one occurred
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      console.log("body:", body); // Print the HTML for the Google homepage.
    }
  );
}
