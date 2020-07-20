import { mensagemContato } from "./models/contato.model";
import { mensagemTexto } from "./models/mensagem.model";
import { redisClient } from "./redis/redisClient";
import { empresa } from "./models/empresa.model";
import connection from "./database/connection";
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

dbConnection
  .insert(dados)
  .into("empresas")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

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
    redis.get(cliente.numero).then((estado: number) => {
      templates[1].funcao(cliente); //executar o numero do estado @TODO
    });
  }

  console.log(cliente);
  //const stateAtual = redis.get()
  //enviaMensagem(contatoExemplo);
}
