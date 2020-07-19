import { mensagemContato } from "./models/contato.model";
import { mensagemTexto } from "./models/mensagem.model";
import { redisClient } from "./redis/redisClient";
import { empresa } from "./models/empresa.model";
import connection from "./database/connection";
import request from "request";
import { extrairCliente } from "./utils";
import { templates } from "./messageTemplates";

const redis = new redisClient();
var dbConnection = connection;

const dados: empresa = {
  descricao: "Pastelaria",
  numero: "5515997332831",
  cep: "18195000",
  nome: "Ex-Force Pasteis",
};

// dbConnection
//   .insert(dados)
//   .into("empresas")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

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
              phone: "5515988287152",
              type: "CELL",
              waId: "5515988287152",
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
      text: "Testando a mensagem",
    },
  ],
};

export function processarRequisicao(requisicao: any) {
  const cliente = extrairCliente(requisicao);

  if (cliente.numero != "") {
    const clienteEstado = redis.get(cliente.numero);
    //templates[clienteEstado]
  }

  console.log(cliente);
  //const stateAtual = redis.get()
  //enviaMensagem(contatoExemplo);
}

function enviaMensagem(mensagem: mensagemContato | mensagemTexto) {
  request.post(
    {
      url: "https://api.zenvia.com/v1/channels/whatsapp/messages",
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
        "X-API-TOKEN": "ztr6CSDMXJXri6NhNwQnqyvxlVW1XPdbwMDu",
      },
      body: mensagem,
    },
    function (error, response, body) {
      console.log(response);
    }
  );
}
